const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const userRoutes = require('./routes/users.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})