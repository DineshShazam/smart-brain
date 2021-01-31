const db = require('../db/psql');
const {hash,verify} = require('../utils/encrypt');
const Joi = require('joi');
const { tokenGen } = require('../Handler/jwtAuth');


exports.Register = async (req,res) => {

    const schema = Joi.object().keys({
        name:Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    const {error} = schema.validate(req.body);

    if(error) {
        res.status(400).send('Invalid Params');
        return;
    }
 
    const {name,email,password} = req.body; 

    const {encryptedPass,key} = await hash(password);

    // frts store the value in login then store in register 
    try {
        
    db.select('*').from('users').where('email','=',email).returning('email')
                .then((result) => {
                    console.log(result);
                    if(result.length === 0) {
                        db.transaction((trx) => {
                            trx.insert({
                               email,
                               hash:encryptedPass,
                               key 
                            }).into('login').returning(['email','hash','key'])
                              .then((loginData) => {
                                  const loginValue = loginData[0]
                                  const regValue = {name,joined:new Date(),...loginValue}
                                trx('users').insert(regValue).returning(['name','email','entries'])
                                .then((user) => {
                                     res.status(200).json(user[0]);
                                })
                                .then(trx.commit) 
                                .catch(trx.rollback)
                                .catch((err) => {
                                    res.status(400).json(`Unable to register`); 
                                })
                            })
                        })
                    } else {
                        res.status(404).send('User Already Registered');
                    }
                }).catch((err) => {
                    console.log(err);
                    res.status(400).send('User Already Registered');
                })
            } catch (error) {
                console.log(error);
                res.status(400).send('User Validation Error, Contact Admin');
            }
 
}

exports.login = (req,res) => {
   
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const {error} = schema.validate(req.body);

    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const {email,password} = req.body;

    db.select('*').from('login').where('email','=',email)
    .then(async (data) => {
        if(data[0].length === 0) {
            res.status(404).send('User Not Found');
            return;
        }
        const {hash,key} = data[0];
        const value = await verify(password,key,hash);
        if(!value) {
            res.status(404).send('Inavalid Credentials');
            return;
        }

        db.select('name','email','entries').from('users').where('email','=',data[0].email)
           .then(async (data) => {
                const token = await tokenGen(data[0]);
                if(!token && !data[0]) {
                    res.status(404).send('User not found');
                    return;
                }
                const value = data[0]
                value['token'] = token
               res.status(200).send(value);
           }).catch((err) => {
               console.log(err);
               res.status(400).send('Users Fetch Error');
           })

    }).catch((err) => {
        res.status(400).send('Login validation error');
    })
}