// This file contains the schema for the image model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This schema is for the image model. It contains the name of the image and the image itself.
const imageSchema = new Schema({
    name: String,
    image:{
        data: Buffer,
        contentType: String
    }
})

const Image = mongoose.model('Image', imageSchema)
module.exports = Image;