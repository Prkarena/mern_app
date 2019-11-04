 /**
     * auth : it authenticate admin
     */
    const  { Admin } = require('../models/admin');
   
    let auth = (req,res,next) =>{
       
        let token = req.cookies.auth;
        console.log(`token is ${token}`)
        Admin.findByToken(token,(err,admin)=>{

            if (!admin) return res.json({
               isAuth : false
            })
            
            req.token = token;
            req.admin = admin;
            console.log(`req token is ${req.token}`)
            next();
        })
        
    }

    
    module.exports = { auth }