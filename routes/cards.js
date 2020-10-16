const router = require('express').Router();
const readFile = require('../utils/read');
const path = require('path');
const jsonDataPath = path.join(__dirname, '..', 'data', 'cards.json');

router.get('/cards', (req, res) => {
  readFile(jsonDataPath)
    .then(data => {
      res.send(data);
    })
})

module.exports = router;