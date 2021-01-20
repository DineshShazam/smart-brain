const router = require('express').Router();
const errorHandler = require('../Handler/errorHandler')
const {Register,login} = require('../controller/auth');
const {imageEntries,clarifaiType} = require('../controller/image');

router.post('/register',errorHandler(Register));
router.post('/login',errorHandler(login));
router.post('/imageEntries',errorHandler(imageEntries));
router.post('/clarifaiDropdown',errorHandler(clarifaiType));

module.exports = router