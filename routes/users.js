const router = require('express').Router();
const readFile = require('../utils/read');
const path = require('path');
const jsonDataPath = path.join(__dirname, '..', 'data', 'users.json');

router.get('/users', (req, res) => {
  readFile(jsonDataPath)
    .then(data => {
      res.send(data);
    })
})

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  readFile(jsonDataPath)
    .then(data => {
      const user = data.users.find(currentUser => currentUser._id === id);
      return user;
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: `Нет пользователя с таким id, как ${id}`});
      }
      res.send(user);
    })
})

module.exports = router;