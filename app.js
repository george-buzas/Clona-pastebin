//Importing packages
const express = require('express');
//Execute express on top of the app
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//Using  dotenv package
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());



//Definig the port
const PORT = 3000;

//Import Routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);


//Routes
// This executes when we go to: http://localhost:3000/
app.get('/', (req, res) => {
  res.send('We are on home');
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Database connection is Ready "
        + "and Server is Listening on Port ", PORT);
    })
})
.catch((err)=>{
    console.log("A error has been occurred while"
        + " connecting to database.");   
})

//Listening to the server
//app.listen(PORT);

function redirect() {
    let txt = document.getElementById("text").value;
    document.write(txt);
}