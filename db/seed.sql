INSERT INTO topics (name)
VALUES
    ('science'),
    ('geography');

INSERT INTO questions (topic_id, question, answer, difficulty)
VALUES
    (
        (SELECT id FROM topics WHERE name = 'science'),
        'What planet is known as the Red Planet?',
        'Mars',
        'easy'
    ),
    (
        (SELECT id FROM topics WHERE name = 'science'),
        'What is the chemical symbol for gold?',
        'Au',
        'medium'
    ),
    (
        (SELECT id FROM topics WHERE name = 'science'),
        'What is the powerhouse of the cell?',
        'Mitochondria',
        'easy'
    ),
    (
        (SELECT id FROM topics WHERE name = 'geography'),
        'What is the capital of Australia?',
        'Canberra',
        'medium'
    ),
    (
        (SELECT id FROM topics WHERE name = 'geography'),
        'Which river flows through Cairo?',
        'The Nile',
        'easy'
    );