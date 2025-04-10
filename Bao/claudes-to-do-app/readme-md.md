# Simple To-Do List with MongoDB

This is a basic to-do list application that demonstrates CRUD operations with MongoDB.

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running on your machine

### Installation Steps

1. Create a new folder for your project:
   ```
   mkdir todo-mongodb
   cd todo-mongodb
   ```

2. Save the provided files in your project folder:
   - `index.html` (the front-end)
   - `server.js` (the back-end)
   - `package.json` (dependencies)

3. Install the required dependencies:
   ```
   npm install
   ```

4. Make sure MongoDB is running on your machine:
   ```
   # On most systems, you can start MongoDB with:
   mongod
   ```

5. Start the server:
   ```
   npm start
   ```

6. Open your browser and go to:
   ```
   http://localhost:3000
   ```
   
   OR simply open the `index.html` file in your browser.

## Basic CRUD Operations Demonstrated

This application implements the following basic CRUD operations:

- **Create**: Add a new task to the database
- **Read**: Fetch and display tasks from the database
- **Update**: Mark tasks as completed or uncompleted
- **Delete**: Remove tasks from the database

## Code Structure

- **index.html**: Contains the user interface and front-end JavaScript
- **server.js**: Express.js server that handles API requests and MongoDB operations
- **package.json**: Project metadata and dependencies

## Learning Resources

If you want to learn more about MongoDB, here are some recommended resources:

- [MongoDB Official Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/) - Free online courses
- [Express.js Documentation](https://expressjs.com/)
