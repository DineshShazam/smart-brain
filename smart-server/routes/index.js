const router = require('express').Router();
const {Register,login} = require('../controller/auth');
const {imageEntries} = require('../controller/image');

router.post('/register',Register);
router.post('/login',login);
router.post('/imageEntries',imageEntries);


module.exports = router