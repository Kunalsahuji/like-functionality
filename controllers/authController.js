const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcryptjs');




exports.getRegister = (req, res) => res.render("register")


exports.postRegister = async (req, res) => {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
        res.status(400).send('User already exists');
    } else {
        const newUser = new User({
            username,
            email,
            password: await bcrypt.hash(password, 10)
        });

        await newUser.save();
        res.redirect('/login');
    }
};


exports.getLogin = (req, res, next) => {
    res.render("login")
}
exports.postLogin =passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
});

exports.logoutUser = (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
};
