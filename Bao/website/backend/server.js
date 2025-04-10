// Import required modules
const express = require('express');              // Express is the web server framework
const { MongoClient, ObjectId } = require('mongodb'); // MongoDB client and ObjectId for working with MongoDB
const cors = require('cors');
require('dotenv').config();                      // Loads environment variables from .env file

// Create an Express app
const app = express();

// Port where your backend will run
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to automatically parse incoming JSON bodies
app.use(express.json());

// This tells Express to serve static files (like index.html) from the frontend folder
// When someone visits localhost:3000, they will see the frontend's index.html
app.use(express.static('../frontend'));

// MongoDB connection URI (e.g. mongodb://localhost:27017), stored in .env file
const mongoUri = process.env.MONGO_URI;

// Create a MongoDB client instance using the URI
const client = new MongoClient(mongoUri);

// We'll store our connected database instance in this variable
let db;

const dbName = 'todoapp';

// Connect to MongoDB
client.connect().then(() => {
  // Select the database to use (it will be created if it doesn't exist yet)
  db = client.db(dbName);
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection failed:', err);
});

// ======== ROUTES (API Endpoints) ======== //

// Update the collection name to be dynamic
app.use('/api/:collectionName', async (req, res, next) => {
  req.collection = db.collection(req.params.collectionName);
  next();
});

// GET all documents from the specified collection
app.get('/api/:collectionName', async (req, res) => {
  try {
    const items = await req.collection.find().toArray();
    res.json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// GET a single document by ID from the specified collection
app.get('/api/:collectionName/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const item = await req.collection.findOne({ _id: new ObjectId(id) });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    console.error('Error fetching item:', err);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

// POST a new document to the specified collection
app.post('/api/:collectionName', async (req, res) => {
  try {
    const { text, completed, user } = req.body;
    const result = await req.collection.insertOne({ text, completed, user });
    res.json({ _id: result.insertedId, text, completed, user });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// PUT (update) a document by ID in the specified collection
app.put('/api/:collectionName/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await req.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    res.json({ modifiedCount: result.modifiedCount });
  } catch (err) {
    console.error('Error updating item:', err);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// DELETE a document by ID from the specified collection
app.delete('/api/:collectionName/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await req.collection.deleteOne({ _id: new ObjectId(id) });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// ======== START THE SERVER ======== //

// Start listening for incoming HTTP requests
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});