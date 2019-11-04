    /**
     * Node Server 
     */
    const express = require('express');
    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');
    const config = require('./config/config').get(process.env.NODE_ENV);
   
    /**
     * Express 
     */
    const app = express();
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(express.static('frontend/build'))

    //CORS error solution 
    app.use((req,res,next)=>{
        res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,PATCH');
        res.setHeader('Access-Control-Allow-Headers','Content-Type ,Origin, X-Requested-With, Accept, Authorization');
        next();
    })
     /**
     * Mongoose 
     */
    const mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.DATABASE);

   
      /*----------- Route Start -----------*/
     const userRouter = require('./routes/user');
     const adminRouter = require('./routes/admin');
     const mailRouter = require('./routes/mail');

      /*----------- Route End -----------*/

      app.use('/admin/',adminRouter);
      app.use('/user/',userRouter);
      app.use(mailRouter);
    
     

    if(process.env.NODE_ENV === 'production'){
        const path  =  require('path');
        app.get('/*',(req,res)=>{
            res.sendfile(path.resolve(__dirname,'frontend','build','index.html'))
        })
    }

  
    const port = process.env.PORT || 3003;
    app.listen(port,()=>{
        console.log('SERVER RUNNING.')
    })


