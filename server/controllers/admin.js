const { Admin } = require('../models/admin');

exports.signupAdmin = (req,res) => {
    const admin = new Admin(req.body);
    admin.save((err,doc) => {
        if(err) return res.json({success:false});
       // console.log(doc)
        res.status(200).json({
            success : true,
            admin : doc
        })
    })
}

exports.loginAdmin = (req,res) => {
    const email = req.body.email;
    const pass = req.body.password;
   // console.log(email + " " + pass)
    Admin.findOne({ 'email' : email },(err,admin)=> {
    
    if(err) return res.json({success:false});

    if(!admin)  return res.json({
        isAuth : false,
        message : 'Auth Faild , admin not found.'
    })

    admin.comparePassword(pass,(err,isMatch) => {
       
        admin.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({
                isAuth : false,
                message : 'Wrong Password'
            });
    
            admin.generateToken((err,admin) => {
            if(err) return res.status(400).send(err);
            res.cookie('auth',admin.token,{ httpOnly : false }).json({
                isAuth : true,
                id : admin._id,
                email : admin.email,
                message : 'Login Successfully.'
            })
        })            

    })
        
})
})

}


exports.adminAuth = (req,res) => { 
    res.json({
        isAuth : true,
        id : req.admin._id,
        email : req.admin.email,
    })
}

exports.adminLogout = (req,res)=>{
    req.admin.deleteToken(req.token,(err,admin)=>{
        if(err) return res.status(400).json({
            isLogout : false
        });
        res.status(200).json({
            isLogout : true
        });
    })
  
}
