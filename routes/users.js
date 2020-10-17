const router = require('express').Router();
const path = require('path');
const readFile = require('../utils/read');

const jsonDataPath = path.join(__dirname, '..', 'data', 'users.json');

router.get('/users', (req, res) => {
  readFile(jsonDataPath)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ error: `Ошибка на сервере: ${err.message}` });
    });
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  readFile(jsonDataPath)
    .then((data) => {
      const user = data.users.find((currentUser) => currentUser._id === id);
      return user;
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: `Нет пользователя с таким id, как ${id}` });
      }
      return res.send(user);
    })
    .catch((err) => {
      res.status(500).send({ error: `Ошибка на сервере: ${err.message}` });
    });
});

module.exports = router;
