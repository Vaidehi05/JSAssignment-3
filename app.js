const express = require('express');
const ejs = require('ejs');
const path = require('path');
const moment = require('moment');
const dotenv = require('dotenv').config();
const gallery = require('./gallery');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const Image = require('./models/Image.js');

app.use(function (req, res, next) {
    res.locals.year = moment().format('YYYY')
    res.locals.gallery = gallery;
    next();
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: false
}));

const dbURI = process.env.MONGODB_URL;
mongoose.connect(dbURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Connect to database. Mongoose handles the asynchronous aspects internally so we don't have to.
var db = mongoose.connection;

// Set a callback in case there's an error.
db.on('error', function(error){
  console.log(`Connection Error: ${error.message}`)
});
// Set a callback to let us know we're successfully connected
db.once('open', function() {
  console.log('Connected to DB...');
});

corsOptions = {
    origin: "https://mongoosesite.herokuapp.com/gallery",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app.use(cors(corsOptions));
  
app.get('/', function (req, res) {
    res.render("index", {
        title: 'Home'
    });
});
app.get('/contact', function (req, res) {
    res.render("contact", {
        title: 'Contact'
    });
});
app.get('/card', function (req, res) {
    res.render("card", {
        title: 'Cards'
    });
});
app.get('/about', function (req, res) {
    res.render("about", {
        title: 'About'
    });
});
app.get('/gallery', function (req, res) {
    Image.find(function(error, result) { 
        res.locals.gallery=result;
        res.render("gallery", { title: 'Gallery'});
        })
});
app.get('/gallery/:id', function (req, res, next) {
    Image.findOne({id: req.params.id},function(error, result) { 
        if(error){
          return console.log(error);
        }
        res.locals.gallery=result;
        res.render("idofgallery", {title: `${req.params.id}`})
    });
});
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.status(404);
    res.send('404: File Not Found');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`Listening on port ${port}`)
});