const express = require('express');
const triviaController = require('../controllers/triviaController');

const router = express.Router();

router.get('/topics', triviaController.getTopics);

module.exports = router;