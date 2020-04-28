const express  = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const feedRoutes = require('./routes/feeds');

const app = express();

app.use(bodyParser.json());  // To parse req body

app.use((req,res,next)=>{
    // req.setHeader('Access-Control-Allow-Origin','*');  //Handle CORS 
    // req.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE'); // Allowing methods
    // req.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization'); // Allowing headers
    next();
})

app.use('/feed',feedRoutes);

mongoose
    .connect(
    'mongodb+srv://root:DruVTnjHxmvtdReJ@mycluster-fdxao.mongodb.net/feeds?retryWrites=true&w=majority')
    .then(res =>{
        console.log("connection res",res);
        app.listen(8080);
    })
    .catch(err => {
        console.log("err connecting to db",err);
})

    
