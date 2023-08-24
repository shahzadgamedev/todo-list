const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

let TodoList;
let WorkList;





// get list of items from database
InitializeDatabase();

// GET Method of Root Route
app.get('/', (req, res) => {

    //get current day
    var day = date.getDay();
    var listOfItems;
    TodoList.findOne({ name: "TodoList" }).then(foundList => {
        if (!foundList) {
            // create new list
            const todoList = new TodoList({
                name: "TodoList",
                items: ['New Item']
            });
            todoList.save();
            listOfItems = todoList.items;
        } else {
            listOfItems = foundList.items;
        }
        res.render('list', { listTitle: "TodoList", dateText: day, newListItems: listOfItems });
    }).catch(err => {
        console.log(err);
    });


});


app.get('/work', (req, res) => {
    //get current day
    var day = date.getDay();
    var workItems;
    // get list of items from database
    WorkList.findOne({ name: "WorkList" }).then(foundList => {
        if (!foundList) {
            // create new list
            const workList = new WorkList({
                name: "WorkList",
                items: ['New Item']
            });
            workList.save();
            workItems = workList.items;
        } else {
            workItems = foundList.items;
        }
        res.render('list', { listTitle: "WorkList", dateText: day, newListItems: workItems });
    }).catch(err => {
        console.log(err);
    });

});

app.get('/about', (req, res) => {
    res.render('about');
});


app.post('/work', function (req, res) {

    var item = req.body.newItem;

    workItems.push(item);
    res.redirect("/work");

});

app.post('/add', function (req, res) {

    //save 'item' form data
    var item = req.body.newItem;
    //push 'item' data to 'items' array

    if (req.body.list === "Work") {
        res.redirect("/work");
        // add item to database
        WorkList.findOne({ name: "WorkList" }).then(foundList => {
            foundList.items.push(item);
            foundList.save();
        }).catch(err => {
            console.log(err);
        });

    }
  
    //reload to root
    res.redirect("/");
    // add item to database
    TodoList.findOne({ name: "TodoList" }).then(foundList => {
        foundList.items.push(item);
        foundList.save();
    }).catch(err => {
        console.log(err);
    });

});

app.post('/remove/:listName', function (req, res) {

    var post = req.body.delete;

    // remove item from database
    TodoList.findOne({ name: req.params.listName }).then(foundList => {
        var postIndex = foundList.items.indexOf(post);
        foundList.items.splice(postIndex, 1);
        foundList.save();
    }).catch(err => {
        console.log(err);
    });

    // remove item from array
    listOfItems.splice(postIndex, 1);
    //reload to root
    res.redirect("/");

    console.log("Removed : " + req.body.newItem);
});


app.post('/home', function (req, res) {
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



function InitializeDatabase() {
    var uri = "mongodb://127.0.0.1:27017/todolistDB";
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const todoSchema = new mongoose.Schema({
        name: String,
        items: [String]
    });
    TodoList = mongoose.model("TodoList", todoSchema);
    WorkList = mongoose.model("WorkList", todoSchema);
}