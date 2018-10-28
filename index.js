let express = require("express");
let users = require('./state').users;
let bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.use(express.static('public'));
//remembeer to restart server once files are updated.
//express needs to use this function to request data
//req=request, res= response, next=?
//no more .send use .json when returning response



//part 2
app.get('/users', function(req,res,next){
    res.json(users);
});

app.get('/users/1', function(req,res,next) {
    res.json(users[0]);
})

app.post("/users",function(req,res,next)
{
 users.push({
    "_id": 3,
    "name": "Cynthia Williams",
    "occupation": "Cool Chic",
    "avatar": "http://vignette4.wikia.nocookie.net/deadliestfiction/images/d/de/Spike_Spiegel_by_aleztron.jpg/revision/latest?cb=20130920231337"
},);
return res.json(users);
});

app.put("/users",function(req,res,next)
{
 users[0].name = "Cole Dawg"
return res.json(users);
});

app.delete("/users/1",function(req,res,next) //:userID colon says this is a variable for dynamic info See slide 53 for info
{
 users.shift();
return res.json(users);
});
//part 4
app.get("/users/:userId",function(req,res,next) {
   
    res.json(users[req.params.userId-1]);  
});

app.put('/users/:userId', function(req, res, next) {
    users[req.params.userId-1].name = "Nate Cool"
    res.json(users[req.params.userId-1])
});

app.delete('/users/:userId', function(req,res,next){
    users[req.params.userId-1].isActive = false;
    console.log(users);
    res.send("deleted");
});

//this takes care of any outlier cases
app.use(function(req,res,) {
    res.send('not found');
});


app.listen(3002, (err) => { //3002 is the port number, err is callback to check for err
    //how many ports are there?  look it up!
if (err) {
  return console.log("Error", err);
}
console.log("Web server is now living in apartment 3002");
});

//run by node index
