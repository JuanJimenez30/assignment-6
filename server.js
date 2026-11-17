const express = require('express');
const cors = require('cors');

const triviaRoutes = require('./src/routes/triviaroutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/triviabook', triviaRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Triviabook API is running'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});