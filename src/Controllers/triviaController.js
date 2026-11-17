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

module.exports = {
    getTopics
};