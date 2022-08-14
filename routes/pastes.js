const express = require('express');
const router = express.Router();
const paste = require('../models/schema');

// Save the current paste to the database and print it on the user's screen 
router.post('/save', (req, res) => {
  const currentPaste = new paste(req.body);
  currentPaste.save().then(item => {
      res.send('The text has been successfully saved to database. The text that you pasted is the following:<br/><br/>' + JSON.stringify(req.body));
  }).catch(error => {
      res.status(400).send("unable to save to database");
  });
});

// Retrieve all the pastes that are stored in the database
router.get('/get-pastes', async (req, res) => {
  try {
      const allPastes = await paste.find();
      res.send(allPastes);
  } catch (error) {
      res.send(error);
  }
});

module.exports = router;
