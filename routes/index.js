var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

function redirect() {
  /*
    Between the quotes it should be a url, that redirects the user to another web page, which contains the text that has been pasted in the 
    initial text area.
    However, I am not sure if I should create another separate html page for this, my guess is that I would have to create one.
  */
    let txt = document.getElementById("text").value;
    //window.location.href="D:/Web_Projects_WellCode/Clona_Pastebin/public/html/redirect.html";
    document.write(txt);
}