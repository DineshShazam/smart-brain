const db = require('../db/psql');
const {hash,verify} = require('../utils/encrypt');
const Joi = require('joi');


exports.Register = async (req,res) => {

    const schema = Joi.object().keys({
        username:Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    const {error} = schema.validate(req.body);

    if(error) {
        res.status(400).send('Invalid Params');
        return;
    }
 
    const {username,email,password} = req.body;

    const {encryptedPass,key} = await hash(password);

    // frts store the value in login then store in register 

    db.transaction((trx) => {
        trx.insert({
           email,
           hash:encryptedPass,
           key 
        }).into('login').returning(['email','hash','key'])
          .then((loginData) => {
              const loginValue = loginData[0]
              const regValue = {name:username,joined:new Date(),...loginValue}
            trx('users').insert(regValue).returning('*')
            .then((user) => {
                 res.status(200).json(user[0]);
            })
            .then(trx.commit)
            .catch(trx.rollback)
            .catch((err) => {
                console.log(err);
                res.status(400).json(`Unable to register`);
            })
          })
    })
}

exports.login = (req,res) => {
   
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const {error} = schema.validate(req.body);

    if(error) {
        console.log(error);
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

        db.select('name','email').from('users').where('email','=',data[0].email)
           .then((data) => {
               res.status(200).send(data[0]);
           }).catch((err) => {
               res.status(400).send('Users Fetch Error');
           })

    }).catch((err) => {
        res.status(400).send('Login validation error');
    })


}