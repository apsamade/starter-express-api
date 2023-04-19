const express = require('express')
const router =  express.Router();
const adminController = require('../controller/admin')
const nodemailer = require('nodemailer');


router.get('/', adminController.getHome)
router.post('/', adminController.postHome)

module.exports = router;