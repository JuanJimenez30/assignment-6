const triviaModel = require('../models/triviamodel');

async function getTopics(req, res) {
    try {
        const topics = await triviaModel.getAllTopics();

        res.json(topics);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Failed to retrieve topics'
        });
    }
}

async function getQuestionsByTopic(req, res) {
    try {
        const { topic } = req.params;
        const { difficulty, limit } = req.query;

        const validDifficulties = ['easy', 'medium', 'hard'];

        if (difficulty && !validDifficulties.includes(difficulty.toLowerCase())) {
            return res.status(400).json({
                error: 'Difficulty must be easy, medium, or hard'
            });
        }

        const topicExists = await triviaModel.topicExists(topic);

        if (!topicExists) {
            return res.status(404).json({
                error: `Topic '${topic}' not found`
            });
        }

        let parsedLimit;

        if (limit !== undefined) {
            parsedLimit = Number(limit);

            if (!Number.isInteger(parsedLimit) || parsedLimit <= 0) {
                return res.status(400).json({
                    error: 'Limit must be a positive integer'
                });
            }
        }

        const questions = await triviaModel.getQuestionsByTopic(
            topic,
            difficulty ? difficulty.toLowerCase() : undefined,
            parsedLimit
        );

        res.json(questions);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Failed to retrieve questions'
        });
    }
}

async function getRandomQuestion(req, res) {
    try {
        const question = await triviaModel.getRandomQuestion();

        if (!question) {
            return res.status(404).json({
                error: 'No questions found'
            });
        }

        res.json(question);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Failed to retrieve random question'
        });
    }
}

async function checkAnswer(req, res) {
    try {
        const { id, guess } = req.body;

        if (id === undefined || guess === undefined) {
            return res.status(400).json({
                error: 'Question id and guess are required'
            });
        }

        const question = await triviaModel.getQuestionAnswer(id);

        if (!question) {
            return res.status(404).json({
                error: `Question with id ${id} not found`
            });
        }

        const correctAnswer = question.answer.trim();
        const userGuess = String(guess).trim();

        const correct =
            userGuess.toLowerCase() === correctAnswer.toLowerCase();

        res.json({
            correct,
            answer: correctAnswer
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Failed to check answer'
        });
    }
}

async function addQuestion(req, res) {
    try {
        const { topic, question, answer, difficulty } = req.body;

        // Check for missing fields
        if (!topic || !question || !answer || !difficulty) {
            return res.status(400).json({
                error: 'Topic, question, answer, and difficulty are required'
            });
        }

        // Check that difficulty is valid
        const validDifficulties = ['easy', 'medium', 'hard'];

        if (!validDifficulties.includes(difficulty.toLowerCase())) {
            return res.status(400).json({
                error: 'Difficulty must be easy, medium, or hard'
            });
        }

        // Add the question
        await triviaModel.addQuestion(
            topic,
            question,
            answer,
            difficulty.toLowerCase()
        );

        // Get the updated list of questions for this topic
        const questions = await triviaModel.getQuestionsByTopic(topic);

        res.status(201).json(questions);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Failed to add question'
        });
    }
}

module.exports = {
    getTopics,
    getQuestionsByTopic,
    getRandomQuestion,
    checkAnswer,
    addQuestion
};