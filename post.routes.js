const express = require('express');
const { setPosts, getPosts, editPost, deletePost, likePost, dislikePost } = require('../controllers/post.controller');
const router = express.Router();

//partie post

router.get('/', getPosts);

router.post('/', setPosts);

router.put('/:id', editPost);

router.delete('/:id', deletePost);

router.patch('/like-post/:id', likePost);

router.patch('/dislike-post/:id', dislikePost);

//partie orders

//router.post('/add-order', addOrder);


module.exports = router;
