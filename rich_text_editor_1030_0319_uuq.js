// 代码生成时间: 2025-10-30 03:19:27
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create an Express application
const app = express();

// Set the port for the server
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the editor HTML file
# 增强安全性
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handling POST request to save the rich text content
app.post('/save', (req, res) => {
  const { content, filename } = req.body;
  
  // Check if content and filename are provided
  if (!content || !filename) {
    return res.status(400).send('Content and filename are required.');
  }
  
  // Save the content to a file
  try {
    const filePath = path.join(__dirname, 'data', `${filename}.txt`);
    fs.writeFileSync(filePath, content);
    res.send('File saved successfully.');
  } catch (error) {
# FIXME: 处理边界情况
    res.status(500).send('Error saving file.');
  }
});

// Start the server
app.listen(PORT, () => {
# FIXME: 处理边界情况
  console.log(`Server is running on http://localhost:${PORT}`);
});
