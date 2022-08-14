//Importing packages
const express = require('express');
const app = express(); //Execute express on top of the app
const mongoose = require('mongoose');
require('dotenv/config'); //Using  dotenv package
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/stylesheets/style'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.urlencoded({extended: false}));

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('Successfully connected to DB');
});


app.get('/login', (req, res) => {
    res.render('login.ejs');
})

app.post('/login', (req, res) => {
    
})

app.get('/register', (req, res) => {
    res.render('register.ejs');
})

const users = [];

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users)
})
//The html file will be loaded when we go to: http://localhost:3000/
/*app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/html/authorization.html');
});*/

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html');
});

const userRouter = require('./routes/pastes');
const { MongoUnexpectedServerResponseError } = require('mongodb');
app.use('/pastes', userRouter);


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

app.listen(process.env.PORT, () => {
    console.log('Server listening on port:' + process.env.PORT);
});
