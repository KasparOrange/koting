
// #region boilerplate
// Import required modules
const express = require('express'); // Express is the web server framework
const { MongoClient, ObjectId } = require('mongodb'); // MongoDB client and ObjectId for working with MongoDB
const cors = require('cors');
require('dotenv').config(); // Loads environment variables from .env file
const multer = require('multer'); // Import multer for handling file uploads

// Create an Express app
const app = express();

// Port where your backend will run
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to automatically parse incoming JSON bodies
app.use(express.json());

// This tells Express to serve static files (like index.html) from the frontend folder
app.use(express.static('../frontend'));

// MongoDB connection URI (e.g., mongodb://localhost:27017), stored in .env file
const mongoUri = process.env.MONGO_URI;

// Create a MongoDB client instance using the URI
const client = new MongoClient(mongoUri);

// We'll store our connected database instance in this variable
let db;

const dbName = 'todoapp';

// Connect to MongoDB
client.connect().then(() => {
  db = client.db(dbName);
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection failed:', err);
});

// Configure multer to store the file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// #endregion

// #region ======== TASKS ROUTES ======== //

// GET all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await db.collection('tasks').find().toArray();
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// POST a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const { text, completed, user } = req.body;
    const result = await db.collection('tasks').insertOne({ text, completed, user });
    res.json({ _id: result.insertedId, text, completed, user });
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).json({ error: 'Failed to add task' });
  }
});

// PUT (update) a task by ID
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await db.collection('tasks').updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    res.json({ modifiedCount: result.modifiedCount });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE a task by ID
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});
// #endregion

// #region ======== USERS ROUTES ======== //

// GET all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await db.collection('users').find().toArray();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST a new user
app.post('/api/users', async (req, res) => {
  try {
    const { text } = req.body;
    const result = await db.collection('users').insertOne({ text });
    res.json({ _id: result.insertedId, text });
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// DELETE a user by ID
app.delete('/api/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});
// #endregion

// #region ======== IMAGES ROUTES ======== //

// GET all images
app.get('/api/images', async (req, res) => {
  try {
    const images = await db.collection('images').find().toArray();
    res.json(images);
  } catch (err) {
    console.error('Error fetching images:', err);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// GET a single image by ID
app.get('/api/images/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const image = await db.collection('images').findOne({ _id: new ObjectId(id) });

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Set the appropriate content type for the image
    res.set('Content-Type', 'image/png'); // Change to 'image/jpeg' or other types if needed
    res.send(image.file.buffer); // Send the binary data as the response
  } catch (err) {
    console.error('Error fetching image:', err);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
});

// POST route to upload an image
app.post('/api/images', upload.single('image'), async (req, res) => {
  try {
    const { user } = req.body;
    const { originalname, buffer } = req.file;

    if (!user || !req.file) {
      return res.status(400).json({ error: 'User or image file is missing' });
    }

    const result = await db.collection('images').insertOne({
      name: originalname,
      user,
      file: buffer,
      uploadedAt: new Date()
    });

    res.json({
      _id: result.insertedId,
      name: originalname,
      user,
      uploadedAt: new Date()
    });
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// DELETE an image by ID
app.delete('/api/images/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.collection('images').deleteOne({ _id: new ObjectId(id) });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    console.error('Error deleting image:', err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});
// #endregion

// ======== START THE SERVER ======== //

// Start listening for incoming HTTP requests
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});