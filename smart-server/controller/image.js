const db = require('../db/psql');
const Joi = require('joi');

exports.imageEntries = (req,res) => {
    
    // 1 = yes // 0 = no
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        update: Joi.number().required(),
    })

    const {error} = schema.validate(req.body);

    if(error) {
        res.status(404).send('Invalid Params');
        return;
    }
    const {email,update} = req.body;
 
    if(update === 1) {
        db('users').where('email','=',email).increment('entries',1)
        .returning('entries').then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            console.log(err);
            res.status(400).json(`Update Image Entries Error`);
        })
    } else if(update === 0) {
        db.select('entries').from('users').where('email','=',email)
        .then((result) => {
            res.status(200).send(result[0]);
        }).catch((err) => {
            res.status(400).json(`Image Entries Error`);

        })
    }
    
}

exports.clarifaiType = (req,res) => {
    db.select('*').from('clarifai_type').then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send('Clarifai Dropdown Data Error');
    })
}