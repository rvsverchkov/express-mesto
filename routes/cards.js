const router = require('express').Router();
const path = require('path');
const readFile = require('../utils/read');

const jsonDataPath = path.join(__dirname, '..', 'data', 'cards.json');

router.get('/cards', (req, res) => {
  readFile(jsonDataPath)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ error: `Ошибка на сервере: ${err.message}` });
    });
});

module.exports = router;
