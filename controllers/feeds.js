const {
    validationResult
} = require('express-validator/check');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalItems; 
    Post
        .find()
        .countDocuments()
        .then(count => {
            totalItems =count;
            return Post
                .find()
                .skip((currentPage -1) * perPage)
                .limit(perPage);
            ;
        })
        .then(posts => {
            res.status(200).json({
                message: "Posts Fetched",
                posts: posts,
                totalItems:totalItems
            })
        })
        .catch(err => {
            console.log("Err while fetching posts", err);

        })

}

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post
        .findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('Could not find post');
                console.log("err while getting post ", err);
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: "Post Fetched",
                post: post
            })
        })
        .catch(err => {
            console.log("Err while fetching post", err);

        })
}

exports.createPost = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({
                message: "Validation failed",
                errors: errors.array()
            })
    }

    const title = req.body.title;
    const content = req.body.content;

    const post = new Post({
        title: title,
        content: content,
        imageUrl: "images/dummy.jpg",
        creator: {
            name: "AAA"
        }
    })

    post
        .save()
        .then(result => {
            res
                .status(201)
                .json({
                    message: "Post created successfully",
                    post: result
                })
        })
        .catch(err => {
            console.log("err while saving ", err);
        })

}

exports.updatePost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({
                message: "Validation failed",
                errors: errors.array()
            })
    }

    const postId = req.params.postId;
    const title = req.body.title;
    const content = req.body.content;
    Post
        .findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('Could not find post');
                console.log("err while getting post ", err);
                error.statusCode = 404;
                throw error;
            }
            post.title = title;
            post.content = content;
            post.save()
                .then(result => {
                    res
                        .status(200)
                        .json({
                            message: "Post udpated successfully",
                            post: result
                        })
                });
        })
        .catch(err => {
            console.log("Err while updating post", err);

        })
}

exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    Post
        .findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('Could not find post');
                console.log("err while getting post ", err);
                error.statusCode = 404;
                throw error;
            }
            return Post.findByIdAndRemove(postId);
        })
        .then(result => {
            console.log("res in delete", res);
            res.status(200)
                .json({
                    message: "Posts Deleted"
                })
        })
        .catch(err => {
            console.log("Err while deleting post", err);

        })

}