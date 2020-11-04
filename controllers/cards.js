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
    return res.status(200).send({ data: card });
  } catch (error) {
    res.status(400).send({ message: 'Ошибка на сервере, повторите попытку' });
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id,
      { $addToSet: { likes: req.user._id } }, { new: true });
    return res.status(200).send({ data: card });
  } catch (error) {
    res.status(400).send({ message: 'Ошибка на сервере, повторите попытку' });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id,
      { $pull: { likes: req.user._id } }, { new: true });
    return res.status(200).send({ data: card });
  } catch (error) {
    res.status(400).send({ message: 'Ошибка на сервере, повторите попытку' });
  }
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
