//Importing packages
const express = require('express');
const app = express(); //Execute express on top of the app
const paste = require('./models/schema');
const mongoose = require('mongoose');
const PORT = 3000; //Defining the port the app should listen to
require('dotenv/config'); //Using  dotenv package
const bodyParser = require('body-parser');

//Middlewares
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/stylesheets/style'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('Successfully connected to DB');
});

//The html file will be loaded when we go to: http://localhost:3000/
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html');
});

//Save the current paste to the database
app.post('/savepaste', (req, res) => {
    const currentPaste = new paste(req.body);
    currentPaste.save().then(item => {
        res.send('The text has been successfully saved to database. The text that you pasted is the following:<br/><br/>' + JSON.stringify(req.body));
    }).catch(error => {
        res.status(400).send("unable to save to database");
    });
});

//GET all pastes
app.get('/getpastes', async (req, res) => {
    try {
        const allPastes = await paste.find();
        res.send(allPastes);
    } catch (error) {
        res.send(error);
    }
});

//GET a specific paste
/*
app.get('/:pasteID', async (req, res) => {
    try {
        const paste = await paste.findById(id);
        res.json(paste);
    } catch(error) {
        res.send(error);
    }
});
*/

app.listen(PORT, () => {
    console.log('Server listening on port:' + PORT);
});
