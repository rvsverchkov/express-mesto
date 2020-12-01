const router = require('express').Router();
const auth = require('../middlewares/auth.js');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', auth, createCard);
router.delete('/cards/:id', auth, deleteCard);
router.put('/cards/:id/likes', auth, likeCard);
router.delete('/cards/:id/likes', auth, dislikeCard);

module.exports = router;
