# Running the project

You need MongoDB and Node.js installed on your machine.
To check if you have them installed and to otherwise install them with brew (assuming you have
that), run:

```bash
brew install node
brew install mongodb-community
```

Then, navigate to the backend folder and run:

```bash
brew services start mongodb-community
node server.js
```