const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Use PORT from .env or default to 3000
const port = process.env.PORT || 3000;

// Home route
app.get('/', (req, res) => {
    res.send('Environment Variables Demo!');
});

// Config route (for demo only)
app.get('/config', (req, res) => {
    const dbHost = process.env.DB_HOST;
    const dbUser = process.env.DB_USER;
    const apiKey = process.env.API_KEY;

    res.json({
        dbHost,
        dbUser,
        apiKey
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});