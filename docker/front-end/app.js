const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Front-End Microservice!');
});

app.listen(port, () => {
  console.log(`Front-End Microservice listening at http://localhost:${port}`);
});
