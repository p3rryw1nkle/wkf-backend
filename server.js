// This file is the entry point for the backend server. It connects to the MongoDB database and listens on port 5000. 
// It also sets up the express app and uses the imagesRouter to handle requests to the /images endpoint.

const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

// cors is a middleware that allows for cross-origin resource sharing. It enables the server to accept requests from other domains.
app.use(cors());
app.use(express.json());

// bodyParser is a middleware that parses incoming request bodies in a middleware before the handlers, available under the req.body property.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
  
// ejs is a templating engine that allows for dynamic content in the views.
app.set("view engine", "ejs");

// dbURI and port are set using environment variables. If these variables are not set, the default values are used.
const dbURI = process.env.ATLAS_URI
const port = process.env.PORT || 5000

// connect to the MongoDB database using mongoose
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen((port), function () {
    console.log(`Now listening on port ${port}!`);
  }))
  .catch((err) => {console.log(err)})
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB connection established successfully")
})

// add the imagesRouter to the app
const imagesRouter = require('./routes/images')

// use the imagesRouter to handle requests to the /images endpoint
app.use('/images', imagesRouter);

// This route is for the root of the server. It sends a response to the client with the message "backend is working".
app.get('/', async (req,res)=>{
  res.send("backend is working")
})