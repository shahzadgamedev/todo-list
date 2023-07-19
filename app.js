const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static('public'));

//list of items added by user
if (fs.existsSync('listOfItems.txt')) {
    var file_string = fs.readFileSync('listOfItems.txt', 'utf8');
    //convert string to json and then to array
    var listOfItems = JSON.parse(file_string);
} else {
    var listOfItems = [];
}

// GET Method of Root Route
app.get('/', (req, res) => {


    var today = new Date();
    var currentDay = today.getDay();
    var day = "";

    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    var day = today.toLocaleDateString("en-US", options);

    

    res.render('list', { KindofDay: day, newListItems: listOfItems });

});

 

app.post('/add', function(req, res){
    //save 'item' form data
    var item = req.body.newItem;
    //push 'item' data to 'items' array
    listOfItems.push(item);
    //reload to root
    res.redirect("/");

    console.log("Added" + req.body.newItem);
    fs.writeFileSync('listOfItems.txt', JSON.stringify(listOfItems));
});

app.post('/remove', function(req, res){
    
    //remove last item from array
    listOfItems.pop();
    //reload to root
    res.redirect("/");

    console.log("Removed : " + req.body.newItem);
    fs.writeFileSync('listOfItems.txt', JSON.stringify(listOfItems));
});






// listen To Port 80
app.listen('80', '192.168.29.131', () => {
    console.log('server started');
});