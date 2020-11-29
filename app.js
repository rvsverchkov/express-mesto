/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const path = require('path');
const usersRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestLogger);
app.use('/', usersRoutes);
app.use('/', cardsRoutes);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.use(errorLogger);
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла непредвиденная ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
