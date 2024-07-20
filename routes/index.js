const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');


router.get('/', (req, res) => res.render('index'));

module.exports = router;
