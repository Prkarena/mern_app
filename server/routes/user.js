const express = require('express');
const router = express.Router();

const {
    addUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
} = require('../controllers/user');
/**
 * 
 *  User ---------------------------------------------  
 * 
 */

//addUser
router.post("/add_user",addUser);

 //getUser
 router.get("/getUser",getUser);

//getUsers
router.get("/getUsers",getUsers);

//update_user
router.post("/update_user",updateUser);


//delete_user
router.delete("/delete_user",deleteUser);

module.exports = router;

