const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const { ensureAuthenticated } = require('../middleware/auth');

router.post('/like/:id', ensureAuthenticated, likeController.likePost);

module.exports = router;
