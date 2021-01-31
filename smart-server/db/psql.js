const knex = require('knex');
const path = require('path');
const cnnfigPath = path.join(__dirname, '../config/.env');
require('dotenv').config({path:cnnfigPath});

const psql = knex({
    client:'pg',
    connection:{
        connectionString: process.env.DATABASE_URL,
        ssl:{
            rejectUnauthorized:false
        },
    }
})

// const psql = knex({
//     client:'pg',
//     connection:{
//         host:process.env.DB_HOST,
//         user:process.env.DB_USER,
//         password:process.env.DB_PASS,
//         database: process.env.DB_DATABASE
//     }
// })


module.exports = psql

