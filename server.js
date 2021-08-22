// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = process.env.PORT || 3000;
// Spin up the server
const server = app.listen(port, listening)
// Callback to debug
function listening() {
  console.log(`The server is running on localhost ${port}`);
};

// Initialize '/all' route with a callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData(req, res) {
  console.log('GET request');
  res.send(projectData);
};

// Post Route
app.post('/add', postReceived);

function postReceived(req, res) {
  res.send('POST received');
};

const data = [];
app.post('/addData', addData);

function addData(req, res) {
  console.log(req.body);
  const newEntry = {
    date: req.body.date,
    temperature: req.body.temp,
    feelings: req.body.feelings
  }

  // data.push(req.body);
  data.push(newEntry);
  console.log(data);
};