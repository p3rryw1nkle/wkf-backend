// This file contains the routes for the images. It is responsible for handling the requests for the images.

const router = require('express').Router();
let Image = require('../models/image.model');
const multer = require('multer');
const imageModel = require('../models/image.model');
const fs = require('fs');

// this route is for getting all the images
router.route('/').get((req, res) => {
  // console.log("Grabbing all images")
  Image.find()
    .then(images => res.json(images))
    .catch(err => res.status(400).json('Error: ' + err));
});

// this route is for getting a specific image
router.route('/:name').get((req, res) => {
  // console.log("Grabbing image: " + req.params.name)
  Image.find({ name: req.params.name })
    .then(image => res.json(image))
    .catch(err => res.status(400).json('Error: ' + err));
});

// setting up multer to upload files
// multer is a middleware for handling multipart/form-data, which is primarily used for uploading files.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// this route is for adding a new image
router.route('/add').post(upload.single("newImage"), (req, res) => {
  console.log("Uploading image")
  const saveImage =  imageModel({
    name: req.body.name,
    image: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    },
  });
  saveImage
    .save()
    .then((res) => {
      console.log("image is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
    res.send('image is saved')
});

module.exports = router;