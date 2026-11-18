const express = require('express');
const triviaController = require('../controllers/triviaController');

const router = express.Router();

router.get('/topics', triviaController.getTopics);
router.get('/topic/:topic', triviaController.getQuestionsByTopic);
router.get('/random', triviaController.getRandomQuestion);

// post routes
router.post('/answer', triviaController.checkAnswer);
router.post('/question/add', triviaController.addQuestion);

module.exports = router;