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
const collectionName = 'tasks';

// Connect to MongoDB
client.connect().then(() => {
  // Select the database to use (it will be created if it doesn't exist yet)
  db = client.db(dbName);
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection failed:', err);
});

// ======== ROUTES (API Endpoints) ======== //

// GET all documents from the "items" collection
app.get('/api/items', async (req, res) => {
  try {
    const items = await db.collection(collectionName).find().toArray(); // Fetch everything

    res.json(items); // Send as JSON response
  } catch (err) {
    console.error('Error fetching items:', err);

    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// GET a single document by ID
app.get('/api/items/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const item = await db.collection(collectionName).findOne({ _id: new ObjectId(id) }); // get an item by id

    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
    
    res.json(item); // Send as JSON response
  } catch (err) {
    console.error('Error fetching items:', err);

    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// POST a new document to the "items" collection
app.post('/api/items', async (req, res) => {
  try {
    const newItem = req.body; // The new item comes from the request's JSON body

    const result = await db.collection(collectionName).insertOne(newItem); // Insert into MongoDB
    res.json({ insertedId: result.insertedId }); // Send back the new item's ID
  } catch (err) {
    console.error('Error adding item:', err);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// PUT (update) a document by ID
app.put('/api/items/:id', async (req, res) => {
  try {
    const id = req.params.id; // ID from the URL (e.g. /api/items/64ab...)

    const updates = req.body; // The new data to update

    const result = await db.collection(collectionName).updateOne(
      { _id: new ObjectId(id) },    // Find by MongoDB's special _id type
      { $set: updates }             // Only update the specified fields
    );

    res.json({ modifiedCount: result.modifiedCount }); // How many documents were updated
  } catch (err) {
    console.error('Error updating item:', err);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// DELETE a document by ID
app.delete('/api/items/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const result = await db.collection(collectionName).deleteOne(
      { _id: new ObjectId(id) }  // Delete by MongoDB _id
    );

    res.json({ deletedCount: result.deletedCount }); // How many documents were deleted
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