const db = require('../../db/psql');
const {hash,verify} = require('../../utils/encrypt');
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
    }
 
    const {username,email,password} = req.body;

    const {encryptedPass,key} = await hash(password);

    db('users').insert({
        name:username,
        email,
        hash:encryptedPass,
        key,
        joined:new Date()
    }).returning('*')
    .then((user) => {
         res.status(200).json(user[0]);
    }).catch((err) => {
        res.status(400).json(`Unable to register, ${err}`);
    })

}