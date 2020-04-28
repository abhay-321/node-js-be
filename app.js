const express  = require('express');

const bodyParser = require('body-parser');


const feedRoutes = require('./routes/feeds');

const app = express();

app.use(bodyParser.json());  // To parse req body

app.use((req,res,next)=>{
    req.setHeader('Access-Control-Allow-Origin','*');  //Handle CORS 
    req.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE'); // Allowing methods
    req.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization'); // Allowing headers
    next();
})

app.use('/user',feedRoutes);


app.listen(8080);