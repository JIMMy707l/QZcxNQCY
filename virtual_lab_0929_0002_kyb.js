// 代码生成时间: 2025-09-29 00:02:55
 * It is designed to be extensible and maintainable, with clear code structure and error handling.
 */

// Import necessary Node.js modules
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

// Initialize the Express application
const app = express();
const PORT = 3000;

// Middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Virtual lab experiment data storage (in-memory for simplicity)
const experiments = {};

// Function to create a new experiment
function createExperiment(name) {
    if (!name) {
        throw new Error('Experiment name is required.');
    }
    const id = Date.now().toString(); // Simple ID generation
    experiments[id] = { name, status: 'pending' };
    return id;
}

// Function to update an experiment status
function updateExperimentStatus(experimentId, status) {
    if (!experiments[experimentId]) {
        throw new Error('Experiment not found.');
    }
    experiments[experimentId].status = status;
}

// API endpoint to create a new experiment
app.post('/api/experiments', (req, res) => {
    try {
        const experimentId = createExperiment(req.body.name);
        res.status(201).json({ id: experimentId, message: 'Experiment created successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// API endpoint to update an experiment status
app.put('/api/experiments/:id', (req, res) => {
    try {
        const experimentId = req.params.id;
        updateExperimentStatus(experimentId, req.body.status);
        res.json({ message: 'Experiment status updated successfully.' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// API endpoint to get an experiment details
app.get('/api/experiments/:id', (req, res) => {
    try {
        const experimentId = req.params.id;
        if (!experiments[experimentId]) {
            throw new Error('Experiment not found.');
        }
        res.json(experiments[experimentId]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// API endpoint to list all experiments
app.get('/api/experiments', (req, res) => {
    res.json(Object.values(experiments));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Virtual Lab server running on port ${PORT}`);
});
