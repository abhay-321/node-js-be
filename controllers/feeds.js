const {validationResult} = require('express-validator/check');

const Post = require('../models/post'); 

exports.getPosts = (req,res,next)=>{
    res.status(200).json({
        id:"1234566",
        title:"First Post"
    })

}

exports.createPost = (req,res,next)=>{

    const title = req.body.title;
    const content = req.body.content;

    const post = new Post({
        title:title,
        content:content,
        imageUrl:"images/dummy.jpg",
        creator:{ name:"AAA"}
    })

    post
      .save()
      .then(result=>{
        res
            .status(201)
            .json({
            message:"Post created successfully",
            post:result
        })
      })
      .catch(err=>{
          console.log("err while saving ",err);
      })
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res
            .status(422)
            .json({
                message:"Validation failed",
                errors:errors.array()
            })
    }


}