/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send(cards);
  } catch (error) {
    res.status(400).send(error);
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const card = await Card.create({ name, link, owner });
    return res.status(200).send(card);
  } catch (error) {
    res.status(400).send({ message: 'Ошибка на сервере, повторите попытку' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.id);
    if (card === null) {
      res.status(404).send({ message: 'Данная карточка отсутствует на сервере и не может быть удалена' });
    } else {
      res.status(200).send({ data: card, message: 'Ваша карточка была успешно удалена с сервера' });
    }
  } catch (error) {
    res.status(400).send({ message: 'Ошибка на сервере, повторите попытку' });
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id,
      { $addToSet: { likes: req.user._id } }, { new: true });
    if (card === null) {
      res.status(404).send({ message: 'Лайк не может быть поставлен, поскольку выбранная карточка отсутствует на сервере' });
    } else {
      return res.status(200).send({ data: card, message: 'Лайк был успешно поставлен на выбранную карточку' });
    }
  } catch (error) {
    res.status(400).send({ message: 'Ошибка на сервере, повторите попытку' });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id,
      { $pull: { likes: req.user._id } }, { new: true });
    if (card === null) {
      res.status(404).send({ message: 'Лайк не может быть удален, поскольку выбранная карточка отсутствует на сервере' });
    } else {
      res.status(200).send({ data: card, message: 'Лайк был успешно удален с выбранной карточки' });
    }
  } catch (error) {
    res.status(400).send({ message: 'Ошибка на сервере, повторите попытку' });
  }
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
