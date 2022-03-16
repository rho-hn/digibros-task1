const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:
    {
        type: String,
        required: true
    },
    image:
    {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('posts', postSchema);