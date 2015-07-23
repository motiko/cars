// set up ========================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var uriUtil = require('mongodb-uri');

// configuration =================
var Schema = mongoose.Schema;


var mongodbUri = 'mongodb://root:root@ds031347.mongolab.com:31347/motiko1'; //'mongodb://root:root@127.0.0.1:27017/test'
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri);

app.use(express.static(__dirname + '/static'));
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json()); // parse application/json
app.use(methodOverride());
app.listen(8080);
// Model


var carSchema = new Schema({
    pos: Number,
    model: String,
    price: Number,
    image: String,
    continent: String
});


var Car = mongoose.model('car', carSchema);

// Routing 

app.get('/cars', function(req, res){
    res.redirect('/');
});

app.get('/api/cars', function(req, res){
    Car.find(function(err, cars) {
        res.json(cars);
    });
});


// Private use

app.post('/car', function(req, res){
    Car.create({
        pos: 1,
        model: req.body.model,
        price: req.body.price,
        image: req.body.image,
        continent: req.body.continent
    }, function(createErr, newCar) {
        console.log(newCar);
        res.send('its a new car');
    });
});
