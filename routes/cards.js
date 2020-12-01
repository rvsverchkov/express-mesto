const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth.js');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().required(),
  }),
}), auth, createCard);
router.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), auth, deleteCard);
router.put('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), auth, likeCard);
router.delete('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), auth, dislikeCard);

module.exports = router;
