const express = require('express');
const router = express.Router();
const {
    sendMail
} = require('../controllers/mail');

/**
 * 
 *  Mail ---------------------------------------------  
 * 
 */
    //send email
    router.post("/sendMail",sendMail);

module.exports = router;
 