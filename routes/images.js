const router = require('express').Router();
let Image = require('../models/image.model');
const multer = require('multer');
const imageModel = require('../models/image.model');
const fs = require('fs');

router.route('/').get((req, res) => {
  // console.log("Grabbing all images")
  Image.find()
    .then(images => res.json(images))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:name').get((req, res) => {
  // console.log("Grabbing image: " + req.params.name)
  Image.find({ name: req.params.name })
    .then(image => res.json(image))
    .catch(err => res.status(400).json('Error: ' + err));
});

// setting up multer to upload files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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


// router.route('/add').post((req, res) => {
//   const title = req.body.title;
//   const body = req.body.body;

//   const newBlog = new Blog({
//     title,
//     body
//   });

//   newBlog.save()
//   .then(() => res.json('Blog added!'))
//   .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').get((req, res) => {
//   Blog.findById(req.params.id)
//     .then(blog => res.json(blog))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').delete((req, res) => {
//   Blog.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Blog deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;