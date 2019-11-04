const { User } = require('../models/user');
const path = require('path')
const hogan = require('hogan.js');
const fs = require('fs');

exports.sendMail = (req,res)=>{
    const id = req.query.id;
    const email = req.query.email;
   
     //1.get user data : 
     User.findById(id,(err,doc)=>{
         if(err) return res.status(400).send(err);
       // console.log(doc)
    
     
             //nodemailer for sending mail
             const nodemailer = require('nodemailer');
             const smtpTransport = require('nodemailer-smtp-transport');

             //account from which we have to send email make sure use have allow permisions in account https://myaccount.google.com/lesssecureapps
             const transporter = nodemailer.createTransport(smtpTransport({
                 service: 'gmail',
                 host: 'smtp.gmail.com',
                 auth: {
                 user:  "prakash.raoinfotech@gmail.com", //config.email 
                 pass:  "70462071"              //config.pass //password
                 }
             }));
             console.log(path.join(__dirname,'../emails','email_template2.hjs'))
           //template location
            const template = fs.readFileSync(path.join(__dirname,'../emails','email_template2.hjs'),'utf-8');
          
            //compile template
            const compiledTemplate = hogan.compile(template)

            // const mailOptions = req.body;   
            const mailOptions =  {
            from: 'prakash.raoinfotech@gmail.com',
            to: email,
            subject: 'Rao Information Technology',
            html : compiledTemplate.render(doc)
            }

            // console.log('mail options ' + mailOptions.text)



             //transporter which send our mail                     
             transporter.sendMail(mailOptions, function(error, info){

                 if(error) return res.json({
                     post : false,
                     info : error
                 })
             
                 res.status(200).json({
                     post : true,
                     info : info.response
                 })
             });
      })
  }

