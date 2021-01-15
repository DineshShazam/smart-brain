const router = require('express').Router();
const {Register,login} = require('../controller/auth');
const {imageEntries,clarifaiType} = require('../controller/image');

router.post('/register',Register);
router.post('/login',login);
router.post('/imageEntries',imageEntries);
router.post('/clarifaiDropdown',clarifaiType);

module.exports = router