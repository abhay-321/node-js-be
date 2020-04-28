exports.getPosts = (req,res,next)=>{
    res.status(200).json({
        id:"1234566",
        title:"First Post"
    })

}

exports.createPost = (req,res,next)=>{
    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
        message:"Post created successfully",
        id:new Date().toISOString(),
        title:title,
        content:content
    })

}