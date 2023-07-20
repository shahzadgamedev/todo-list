const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static('public'));

//list of items added by user
if (fs.existsSync('listOfItems.txt')) {
    var file_string = fs.readFileSync('listOfItems.txt', 'utf8');

    try {
        var listOfItems = JSON.parse(file_string);
    } catch (err) {
        console.log("Error in parsing file");
        var listOfItems = [];
    }
    
} else {
    var listOfItems = [];
}

// GET Method of Root Route
app.get('/', (req, res) => {

    //get current day
    var day = date.getDay();
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


app.post('/home', function(req, res){
    //reload to root
    res.redirect("/");
});


// This route will handle all the requests that are 
// not handled by any other route handler. In 
// this handler we will redirect the user to 
// an error page with NOT FOUND message and status
// code as 404 (HTTP status code for NOT found)
app.all('*', (req, res) => {
    res.status(404).sendFile(__dirname + '/public/404.html');
  });




// listen To Port 80
app.listen('80', '192.168.29.131', () => {
    console.log('server started at http://192.168.29.131');
});