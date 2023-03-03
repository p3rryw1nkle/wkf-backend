const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
  
app.set("view engine", "ejs");

const dbURI = process.env.ATLAS_URI
const port = process.env.PORT || 5000

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen((port), function () {
    console.log(`Now listening on port ${port}!`);
  }))
  .catch((err) => {console.log(err)})

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB connection established successfully")
})

const imagesRouter = require('./routes/images')

app.use('/images', imagesRouter);

app.get('/', async (req,res)=>{
  res.send("backend is working")
})