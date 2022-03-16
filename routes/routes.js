const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const post = require('../models/post')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './uploads')
    },
    filename: function (request, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fieldsize: 1024 * 1024 * 3
    }
})


// routes 

router.get('/posts', async (req, res) => {
    post.find()
        .then(doc => {
            console.log(doc);
            res.send(doc);
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
})

router.post('/posts', upload.single('image'), (req, res) => {
    console.log(req.file);
    const Post = new post({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        image: req.file.filename,
    });

    Post.save()
        .then(result => {
            console.log(result);
            res.send("Post created");
        })

});

router.get('/posts/:postId', (req, res) => {
    const id = req.params.postId;
    post.findById(id)
        .then(doc => {
            console.log(doc);
            res.send(doc);
        })
        .catch(err => {
            console.log(err)
        });

})

router.patch('/posts/:postId', (req, res) => {
    var conditions = { _id: req.params.postId };
    post.updateOne(conditions, req.body)
        .then(result => {
            console.log(result);
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        })
})

router.delete('/posts/:postId', (req, res) => {
    const id = req.params.postId;
    post.remove({ _id: id })
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        })
})


module.exports = router;