const express = require('express');
const app = express();
const helmet = require('helmet');
const router = require('./routes/index');
const cors = require('cors');

// app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use('/',router);

// error capturing 
// app.use((req,res,next) => {
//     req.on('error',(err) => {
        
//     });

//     next();
// })

// set router


// handle undefined routes 
app.get('*',(req,res) => {
    res.status(500).send('Invalid Request');
})


module.exports = app;