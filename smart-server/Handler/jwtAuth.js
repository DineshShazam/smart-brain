const jwt = require('jsonwebtoken');
const Joi = require('joi')

exports.tokenGen = (payload) => {
    return new Promise((resolve, reject) => {

        jwt.sign(payload,'3147838d061a173c',{expiresIn:"1hr"},(err,token) => {
            if(err) {
                reject('Token Generation Error');
            } else {
                resolve(token);
            }
        })
    })
}

exports.tokenVerify = async (req,res,next) => {

    try {

        const token = req.headers.authorization.split(" ")[1];
        if(!token) {
            res.status(401).send('Missing authorization');
            return;
        }
       
        jwt.verify(token,'3147838d061a173c',(err,decoded) => {
            if(err) {
                res.status(403).send('Invalid Token');
                return;
            }
            // username and email
            req.userData = {username: decoded.name, email: decoded.email};
            next();
        })
        
    } catch (error) {
        res.status(500).send('Token Validation Error');
    }
    
}