const express = require('express');
const { body } = require('express-validator/check');

const feedsCtlr = require('../controllers/feeds');

const router = express.Router();

router.get('/post',feedsCtlr.getPosts);  

router.post(
    '/post',
    [
        body('title')
        .trim()
        .isLength({min:5}),
        body('content')
        .trim()
        .isLength({min:5})      
    ],
    feedsCtlr.createPost);

module.exports = router;

router.get('/post/:postId',feedsCtlr.getPost); 

router
    .put('/post/:postId',
    [
        body('title')
        .trim()
        .isLength({min:5}),
        body('content')
        .trim()
        .isLength({min:5})      
    ],    
    feedsCtlr.updatePost); 

router.delete('/post/:postId',feedsCtlr.deletePost); 
