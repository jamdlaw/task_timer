const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Define the path to the HTML files
const INDEX_PATH = path.join(__dirname, 'index.html');
const ADMIN_PATH = path.join(__dirname, 'admin.html');

app.use(express.static('public')); // Serve files from the 'public' directory
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this line to parse JSON request bodies

// Route for index.html
app.get('/', (req, res) => {
  res.sendFile(INDEX_PATH);
});

// Route for admin.html
app.get('/admin', (req, res) => {
  res.sendFile(ADMIN_PATH);
});

app.post('/admin', (req, res) => {
   // Accessing the data from the request body
   const requestData = req.body;
   const pomodoro = requestData.sessionTime;
   const breakTime = requestData.breakTime;
   const longBreakInterval = requestData.sessionsBeforeLongBreak;
   console.log(pomodoro,breakTime,longBreakInterval);
   // Responding to the client
   res.sendFile(INDEX_PATH,JSON.stringify(requestData));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
