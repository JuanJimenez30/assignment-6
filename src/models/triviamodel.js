const pool = require('../db');

async function getAllTopics() {
    const result = await pool.query(
        'SELECT id, name FROM topics ORDER BY id'
    );

    return result.rows;
}

async function getQuestionsByTopic(topic, difficulty, limit) {
    let query = `
        SELECT q.id, t.name AS topic, q.question, q.answer, q.difficulty
        FROM questions q
        JOIN topics t ON q.topic_id = t.id
        WHERE t.name = $1
    `;

    const values = [topic];

    if (difficulty) {
        query += ` AND q.difficulty = $${values.length + 1}`;
        values.push(difficulty);
    }

    query += ' ORDER BY q.id';

    if (limit) {
        query += ` LIMIT $${values.length + 1}`;
        values.push(limit);
    }

    const result = await pool.query(query, values);

    return result.rows;
}

async function getRandomQuestion() {
    const result = await pool.query(`
        SELECT
            q.id,
            t.name AS topic,
            q.question,
            q.difficulty
        FROM questions q
        JOIN topics t ON q.topic_id = t.id
        ORDER BY RANDOM()
        LIMIT 1
    `);

    return result.rows[0];
}

async function topicExists(topic) {
    const result = await pool.query(
        'SELECT id FROM topics WHERE name = $1',
        [topic]
    );

    return result.rows.length > 0;
}

async function getQuestionAnswer(id) {
    const result = await pool.query(
        'SELECT answer FROM questions WHERE id = $1',
        [id]
    );

    return result.rows[0];
}

async function getOrCreateTopic(topic) {
    const existingTopic = await pool.query(
        'SELECT id FROM topics WHERE name = $1',
        [topic]
    );

    if (existingTopic.rows.length > 0) {
        return existingTopic.rows[0].id;
    }

    const result = await pool.query(
        'INSERT INTO topics (name) VALUES ($1) RETURNING id',
        [topic]
    );

    return result.rows[0].id;
}

async function addQuestion(topic, question, answer, difficulty) {
    const topicId = await getOrCreateTopic(topic);

    await pool.query(
        `INSERT INTO questions
        (topic_id, question, answer, difficulty)
        VALUES ($1, $2, $3, $4)`,
        [topicId, question, answer, difficulty]
    );
}

module.exports = {
    getAllTopics,
    getQuestionsByTopic,
    getRandomQuestion,
    topicExists,
    getQuestionAnswer,
    getOrCreateTopic,
    addQuestion
};