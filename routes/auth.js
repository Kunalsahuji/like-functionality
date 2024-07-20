const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');

// Register
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);


// Login
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// Logout
router.get('/logout', authController.logoutUser);


router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/profile');
    }
);

module.exports = router;
