const router = require('express').Router();
const Card = require('../models/card');

router.get('/users', (req, res) => {
  Card.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ error: `Ошибка на сервере: ${err.message}` });
    });
});



module.exports = router;
