const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('image');

exports.createPost = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            res.status(400).send('Error uploading image');
        } else {
            const newPost = new Post({
                content: req.body.content,
                image: req.file.filename,
                user: req.user.id
            });

            await newPost.save();
            res.redirect('/profile');
        }
    });
};

exports.getPosts = async (req, res) => {
    const posts = await Post.find({}).populate('user', 'username');
    res.render('index', { posts });
};
