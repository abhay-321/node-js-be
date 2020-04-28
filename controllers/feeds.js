const {validationResult} = require('express-validator/check')

exports.getPosts = (req,res,next)=>{
    res.status(200).json({
        id:"1234566",
        title:"First Post"
    })

}

exports.createPost = (req,res,next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res
            .status(422)
            .json({
                message:"Validation failed",
                errors:errors.array()
            })
    }

    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
        message:"Post created successfully",
        id:new Date().toISOString(),
        title:title,
        content:content
    })

}