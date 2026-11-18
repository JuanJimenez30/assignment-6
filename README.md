# Triviabook API

A Node.js and Express REST API for managing trivia questions using a PostgreSQL database hosted on Neon.

## Database Schema

The database contains two tables:

### `1:topics`

- `id` - Primary key
- `name` - Topic name

### `2:questions`

- `id` - Primary key
- `topic_id` - Foreign key referencing `topics(id)`
- `question` - Trivia question
- `answer` - Correct answer
- `difficulty` - `easy`, `medium`, or `hard`

### Relationship

- One topic can have many questions.
- Each question belongs to one topic.

## Project Structure

```text
assignment-6-triviabook/
├── src/
│   ├── controllers/
│   │   └── triviaController.js
│   ├── models/
│   │   └── triviaModel.js
│   ├── routes/
│   │   └── triviaRoutes.js
│   └── db.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/JuanJimenez30/assignment-6.git
cd assignment-6
```

### 2. Install dependencies

```bash
npm install express pg
```

### 3. Configure the database

Create a `.env` file in the project root:

```env
DATABASE_URL=your_neon_connection_string
```

### 4. Set up the PostgreSQL database

Run the SQL in `db/schema.sql` to create the database tables.

Then run `db/seed.sql` to insert the initial trivia topics and questions.

### 5. Start the server

```bash
npm start
```

The API runs locally at:

```text
http://localhost:3000
```

## API Endpoints

### 1. Get All Topics

**Method:** `GET`

```text
/triviabook/topics
```

Example:

```text
GET http://localhost:3000/triviabook/topics
```

Returns all trivia topics.

### 2. Get Questions by Topic

**Method:** `GET`

```text
/triviabook/topic/:topic
```

Optional query parameters:

- `difficulty=easy`
- `difficulty=medium`
- `difficulty=hard`
- `limit=number`

Example:

```text
GET http://localhost:3000/triviabook/topic/science
```

With filters:

```text
GET http://localhost:3000/triviabook/topic/science?difficulty=easy&limit=1
```

Returns the questions for the requested topic.

### 3. Get a Random Question

**Method:** `GET`

```text
/triviabook/random
```

Example:

```text
GET http://localhost:3000/triviabook/random
```

Returns one random trivia question without revealing the answer.

### 4. Check an Answer

**Method:** `POST`

```text
/triviabook/answer
```

Example request body:

```json
{
  "id": 1,
  "guess": "Mars"
}
```

Example:

```text
POST http://localhost:3000/triviabook/answer
```

The answer comparison:

- Is case-insensitive.
- Ignores leading and trailing whitespace.
- Returns whether the guess is correct.
- Returns the correct answer.

### 5. Add a Question

**Method:** `POST`

```text
/triviabook/question/add
```

Example request body:

```json
{
  "topic": "science",
  "question": "What is the largest planet?",
  "answer": "Jupiter",
  "difficulty": "easy"
}
```

Example:

```text
POST http://localhost:3000/triviabook/question/add
```

If the topic does not already exist, the API creates it automatically.

The endpoint returns the updated list of questions for that topic.

## Error Handling

The API returns appropriate HTTP status codes for common errors:

- `400 Bad Request` - Missing or invalid request parameters.
- `404 Not Found` - Requested topic or question does not exist.
- `500 Internal Server Error` - Unexpected server or database error.

## Technologies

- Node.js
- Express
- PostgreSQL
- Neon PostgreSQL
- `pg`

## Architecture

The application uses a model-controller-router architecture:

- **Routes** - Define the API endpoints.
- **Controllers** - Handle HTTP requests, validation, and responses.
- **Models** - Handle PostgreSQL database operations.
- **Database** - Neon PostgreSQL stores topics and questions.

## Deployment

The application will be deployed using Render.

### Render Configuration

**Build command:**

```text
npm install
```

**Start command:**

```text
npm start
```

The `DATABASE_URL` environment variable must be configured in Render using the Neon PostgreSQL connection string.

### Deployed API URL

Add the Render deployment URL here after deployment:

```text
YOUR_RENDER_DEPLOYED_API_URL
```

## Testing

All five required API endpoints were tested using Thunder Client:

1. `GET /triviabook/topics`
2. `GET /triviabook/topic/:topic`
3. `GET /triviabook/random`
4. `POST /triviabook/answer`
5. `POST /triviabook/question/add`

The tests included valid requests, invalid parameters, missing parameters, answer checking, and creating a new topic through the question-add endpoint.