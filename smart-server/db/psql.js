const path = require('path');
// path:'D:/NODE-CORE/Full-Stack-Dev/webDev-2021/Smart-Brain/smart-server/config/.env'
const cnnfigPath = path.join(__dirname, '../config/.env');
require('dotenv').config({path:cnnfigPath});
const knex = require('knex');

const psql = knex({
    client:'pg',
    connection:{
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASS,
        database: process.env.DB_DATABASE
    }
})

module.exports = psql

