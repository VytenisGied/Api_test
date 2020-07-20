const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

//Gets all posts
router.get('/', async (req, res) => {
    try{
        const post = await Post.find();
        res.status(200).json(post);
    } catch(err){
        res.status(400).json({ message : err });
    }
});

//Submits a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try{
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch(err){
        res.status(400).json({ message : err });
    }
});

//Gets a specific post
router.get('/:id', async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch(err){
        res.status(404).json({ message : err });
    }
});

//Deletes a specific post
router.delete('/:id', async (req, res) => {
    try{
        const removedPost = await Post.remove({_id: req.params.id});
        res.status(200).json(removedPost);
    } catch(err){
        res.status(400).json({ message : err });
    }
});

//Update a post
router.patch('/:id', async (req, res) => {
    try{
        const updatededPost = await Post.updateOne({_id: req.params.id}, { $set: {title: req.body.title} });
        res.status(200).json(updatededPost);
    } catch(err){
        res.status(400).json({ message : err });
    }
});

module.exports = router;