const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

//Gets all todo
router.get('/', async (req, res) => {
    try{
        const todo = await Todo.find();
        res.status(200).json(todo);
    } catch(err){
        res.status(400).json({ message : err });
    }
});

//Submits a todo
router.post('/', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    });

    try{
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch(err){
        res.status(400).json({ message : err });
    }
});

//Gets a specific todo
router.get('/:id', async (req, res) => {
    try{
        const todo = await Todo.findById(req.params.id);
        res.status(200).json(todo);
    } catch(err){
        res.status(404).json({ message : err });
    }
});

//Deletes a specific todo
router.delete('/:id', async (req, res) => {
    try{
        const removedTodo = await Todo.remove({_id: req.params.id});
        res.status(200).json(removedTodo);
    } catch(err){
        res.status(400).json({ message : err });
    }
});

//Update a todo
router.patch('/:id', async (req, res) => {
    try{
        const updatededTodo = await Todo.updateOne({_id: req.params.id}, { $set: {title: req.body.title} });
        res.status(200).json(updatededTodo);
    } catch(err){
        res.status(400).json({ message : err });
    }
});

module.exports = router;