const express = require('express');
const path = require('path');
const app = express();

// Serve static files from React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (res, req) => {
  console.log('Server connected? I hope?')
  res.sendfile(path.join(__dirname, '../client/build', 'index.html'))
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
