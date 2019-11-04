const express = require('express');
const router  = express.Router();
 /*--------  Middleware --------------------------*/
 const { auth } = require('../middleware/auth');
 
const {
        signupAdmin,
        loginAdmin,
        adminAuth,
        adminLogout
      } = require('../controllers/admin');
   
 /**
 * 
 * Admin Router -------------------------------------------
 * 
 */

//SIGNUP : addUser 
router.post("/signup",signupAdmin)

//LOGIN 
router.post("/login",loginAdmin)


//admin auth
router.get("/auth",auth,adminAuth)

//GET ADMIN : API FOR ADMIN LOGOUT
router.get("/logout",auth,adminLogout)

module.exports = router;