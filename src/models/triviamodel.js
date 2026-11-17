const pool = require('../db');

async function getAllTopics() {
    const result = await pool.query(
        'SELECT id, name FROM topics ORDER BY id'
    );

    return result.rows;
}

module.exports = {
    getAllTopics
};