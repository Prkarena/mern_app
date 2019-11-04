const { User } = require('../models/user');

exports.addUser = (req,res) => {
    const user = new User(req.body);
    user.save((err,doc) => {
        if(err) return res.json({success:false});
        res.status(200).json({
            success : true,
                user : doc
            })
        })

 }


exports.getUser = (req,res)=>{
    let id = req.query.id;
    User.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc)
    })

}

exports.getUsers = (req,res)=>{
    // http://localhost:3001/api/getUsers?skip=3&limit=2&order=asc
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const order =  req.query.order;             // ORDER = asc || desc 

    User.find().skip(skip).sort({_id : order}).limit(limit).exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc)
    })  

}


exports.updateUser = (req,res) => {
    const user = new User(req.body);
    console.log(user)

    User.findByIdAndUpdate(user._id,{$set:user},{ new : true },(err,doc)=>{
        if(err) return res.json({
            success : false,
            doc
        });
        res.json({
            success : true,
            doc  
        })
    })
}

exports.deleteUser = (req,res)=>{
    const id =  req.query.id;

    User.findByIdAndRemove(id,(err,doc)=>{
       if(err) return res.status(400).send(err);
       res.json(true)
    })
}