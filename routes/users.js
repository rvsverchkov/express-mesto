const router = require('express').Router();
const User = require('../models/user');

router.get('/users', (req, res) => {
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ error: `Ошибка на сервере: ${err.message}` });
    });
});

router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err, user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь с таким id не найден, повторите попытку' });
      } else {
        res.status(500).send({ error: `Ошибка на сервере: ${err.message}` });
      }
    });
});

router.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Ошибка сервера' });
    })
});

module.exports = router;
