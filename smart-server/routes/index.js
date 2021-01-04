const router = require('express').Router();
const {Register} = require('../controller/Authentication/auth');

router.post('/register',Register);


module.exports = router