const crypto = require('crypto');
const { resolve } = require('path');

exports.hash = (password) => {
    return new Promise((resolve,reject) => {
        const salt = crypto.randomBytes(8).toString('hex');
        crypto.scrypt(password,salt,64,(err,derivedkey) => {
            if(err) {
                reject(`hash key error, ${err}`);
            } else {
                resolve({key:salt,encryptedPass:derivedkey.toString('hex')});
            }
        })
    })
}

exports.verify = (usrPassword,salt,hashPass) => {
   
        return new Promise((resolve,reject) => {
            try {
                crypto.scrypt(usrPassword,salt,64,(err,derivedkey) => {
                    if(err) reject(`password decryption failed`);
                    resolve(hashPass === derivedkey.toString('hex'));
                })
            } catch(err) {
                reject(`password verification failed, ${err}`);
            }

        })
 
}