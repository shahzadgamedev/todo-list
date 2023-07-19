const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(express.static('public'));

// GET Method of Root Route
app.get('/', (req, res) => {


var today = new Date();
var currentDay = today.getDay();
var day = ""; currentDay = 0;

if (currentDay === 6 || currentDay === 0) {
    res.render('list', {KindofDay: 'WeekEnd'});
} else {
    res.render('list', {KindofDay: 'WeekDay'});
}

    






});



// listen To Port 80
app.listen('80','192.168.29.131', () => {
    console.log('server started');
});