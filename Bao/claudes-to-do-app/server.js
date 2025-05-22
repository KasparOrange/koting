const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDB Connection String - replace with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017';
const dbName = 'todoapp';
const collectionName = 'tasks';

let db;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
async function connectToMongo() {
    try {
        const client = new MongoClient(mongoURI);
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db(dbName);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

// Routes

// Get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await db.collection(collectionName).find({}).toArray();
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
    try {
        const { text, completed } = req.body;
        const result = await db.collection(collectionName).insertOne({ 
            text, 
            completed 
        });
        
        // Return the newly created task with its ID
        res.status(201).json({ 
            _id: result.insertedId, 
            text, 
            completed 
        });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Error creating task' });
    }
});

// Update a task
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { text, completed } = req.body;
        
        const updateData = {};
        if (text !== undefined) updateData.text = text;
        if (completed !== undefined) updateData.completed = completed;
        
        await db.collection(collectionName).updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );
        
        // Get and return the updated task
        const updatedTask = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Error updating task' });
    }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Error deleting task' });
    }
});

// Start the server
async function startServer() {
    await connectToMongo();
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

startServer();
