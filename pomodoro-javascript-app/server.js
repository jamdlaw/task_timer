const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Define the path to the HTML files
const INDEX_PATH = path.join(__dirname, 'index.html');
const ADMIN_PATH = path.join(__dirname, 'admin.html');

// Route for index.html
app.get('/', (req, res) => {
  res.sendFile(INDEX_PATH);
});

// Route for admin.html
app.get('/admin', (req, res) => {
  res.sendFile(ADMIN_PATH);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
