const Post = require('../models/Post');
const Like = require('../models/Like');
const User = require('../models/User');
const nodemailer = require('nodemailer');

exports.likePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.id)) {
        post.likes.push(req.user.id);
        await post.save();

        const postOwner = await User.findById(post.user);
        const liker = await User.findById(req.user.id);

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        let mailOptions = {
            from: process.env.EMAIL,
            to: postOwner.email,
            subject: 'Your post was liked!',
            text: `Hello ${postOwner.username},\n\nYour post on Social Media Platform was liked by ${liker.username}. Check it out!\n\nBest regards,\nThe Social Media Platform Team`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
            }
        });

        res.redirect('/profile');
    } else {
        res.status(400).send('Post already liked');
    }
};
