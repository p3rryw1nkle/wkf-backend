const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    name: String,
    image:{
        data: Buffer,
        contentType: String
    }
})

const Image = mongoose.model('Image', imageSchema)
module.exports = Image;