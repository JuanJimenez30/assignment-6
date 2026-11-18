const express = require('express');
const triviaController = require('../controllers/triviaController');

const router = express.Router();

router.get('/topics', triviaController.getTopics);
router.get('/topic/:topic', triviaController.getQuestionsByTopic);
router.get('/random', triviaController.getRandomQuestion);
router.post('/answer', triviaController.checkAnswer);

module.exports = router;