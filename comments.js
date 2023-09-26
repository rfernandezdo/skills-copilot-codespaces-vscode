// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

// Create web server
const app = express();

// Add body parser middleware
app.use(bodyParser.json());

// Create comments object
const commentsByPostId = {};

// Create route to get comments by post id
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Create route to post a comment
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    // Get comments for post id
    const comments = commentsByPostId[req.params.id] || [];

    // Add new comment to comments object
    comments.push({ id: commentId, content });

    // Update comments object
    commentsByPostId[req.params.id] = comments;

    // Send response
    res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
    console.log('Listening on 4001');
});



