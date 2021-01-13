const db = require('../db/psql');

exports.imageEntries = (req,res) => {
    const {id} = req.body;
    db('users').where('id','=',id).increment('entries',1)
    .returning('entries').then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(400).json(`Image Entries Error`);
    }) 
}