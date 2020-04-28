const express = require('express');

const feedsCtlr = require('../controllers/feeds');

const router = express.Router();

router.get('/feed',feedsCtlr.getPosts);  

router.post('/feed',feedsCtlr.createPost);

module.exports = router;