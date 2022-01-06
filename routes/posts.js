const express = require('express');
const router = express.Router();
const Schema = require('../models/schema');

//Retrieve all pastes or retrieve a limited number of pastes
//If I would not use the limit() method I could get all the pastes stored in the db
//However, the limit() method allows me to retrieve only 2 pastes
router.get('/', async (req, res) => {
    try {
        const pastes = await Schema.find().limit(10);
        res.json(pastes);
    } catch(err) {
        res.json({message: err})
    }
});

//Create paste
router.post('/', async (req, res) => {
    const paste = new Schema({
        title: req.body.title,
        pastedText: document.getElementById("text").value
    });
    try {
        const savedPaste = await paste.save();
        res.json(savedPaste);
    } catch(err) {
        res.json({message: err})
    }
});

//Retrieve information about a specific paste
router.get('/:pasteID', async (req, res) => {
    try {
        const paste = await Schema.findById(req.params.pasteID);
        res.json(paste);
    } catch(err) {
        res.json({message: err});
    }
});

//Delete a specific paste
router.delete('/:pasteID', async(req, res) => {
    try {
        const deletedPaste = await Schema.remove({_id: req.params.pasteID});
        res.json(deletedPaste);
    } catch(err) {
        res.json({message : err});
    }
});

//Update a specific paste
router.patch('/:pasteID', async (req, res) => {
    try {
        //If I would want to update the description or the pastedText, instead of writing: 
        // title: req.body.title => description: req.body.description
        const updatedPaste = await Schema.updateOne({_id: req.params.pasteID}, {$set: {title: req.body.title}});
        res.json(updatedPaste);
    } catch(err) {
        res.json({message: err})
    }
});

module.exports = router;