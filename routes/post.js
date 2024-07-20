const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { ensureAuthenticated } = require('../middleware/auth');

router.post('/post', ensureAuthenticated, postController.createPost);

module.exports = router;
