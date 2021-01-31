const router = require('express').Router();
const errorHandler = require('../Handler/errorHandler')
const {Register,login} = require('../controller/auth');
const {imageEntries,clarifaiType} = require('../controller/image');
const { tokenVerify } = require('../Handler/jwtAuth');


router.post('/register',errorHandler(Register));
router.post('/login',errorHandler(login));
router.post('/imageEntries',tokenVerify,errorHandler(imageEntries));
router.post('/clarifaiDropdown',tokenVerify,errorHandler(clarifaiType));

module.exports = router