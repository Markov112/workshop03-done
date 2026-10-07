const express = require('express');
const path = require('path');

// Task 1: Create the Express application.
const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Bonus: Log incoming requests.
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Task 2: Serve static assets. Let the home route serve index.html.
app.use(express.static(PUBLIC_DIR, { index: false }));

// Task 3: Serve the main HTML pages.
app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'contact.html'));
});

// Task 4 and bonus: Organize the JSON endpoints with Express Router.
const apiRouter = express.Router();

apiRouter.get('/time', (req, res) => {
    const now = new Date();
    res.json({
        datetime: now.toISOString(),
        timestamp: now.getTime()
    });
});

apiRouter.get('/info', (req, res) => {
    res.json({
        name: 'Workshop03 Express Server',
        version: '1.0.0',
        nodeVersion: process.version
    });
});

app.use('/api', apiRouter);

// Task 5: Handle unmatched routes after all other routes.
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(PUBLIC_DIR, '404.html'), (err) => {
        if (err) {
            if (res.headersSent) return next(err);
            res.status(404).type('text').send('404 - Page Not Found');
        }
    });
});

// Error middleware must have four parameters and come last.
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    if (res.headersSent) return next(err);

    res.status(500).sendFile(path.join(PUBLIC_DIR, '500.html'), (fileError) => {
        if (fileError) {
            if (res.headersSent) return next(fileError);
            res.status(500).type('text').send('500 - Internal Server Error');
        }
    });
});

// Start the server when run directly; exporting app also allows testing.
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log('Available routes:');
        console.log('  GET /              -> Home page');
        console.log('  GET /about         -> About page');
        console.log('  GET /contact       -> Contact page');
        console.log('  GET /api/time      -> Current date/time API');
        console.log('  GET /api/info      -> Server information');
        console.log('Press Ctrl+C to stop the server.');
    });
}

module.exports = app;
