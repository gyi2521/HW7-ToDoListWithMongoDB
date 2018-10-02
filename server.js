
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Set the port to 3000 OR let the process set the port (if deployed to Heroku)
const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();


// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static('public'));

// Routes
// -----------------
require('./routes/api-routes.js')(app);
// var ToDoList = require('./models/toDoList.js');

// Connect to the Mongo DB using the inventorymaster database (will be created if it doesn't exist)
mongoose.connect('mongodb://gyi:NamJee01@ds119273.mlab.com:19273/heroku_8g25qchc', { useNewUrlParser: true });

// var data = {
//   itemId: 1,
// task: "test",
// done: true
// };
// ToDoList.create(data)
//   .then(function(dbExample){
//     console.log(dbExample);
//   })
//   .catch(function(err){
//     Console.log("error");
//   })
// Starts our server on the predefined PORT
app.listen(PORT, function(){
  console.log(`App is now listening on PORT ${PORT}`);
})

