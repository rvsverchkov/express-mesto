/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'Пользователь с таким id не зарегистрирован' });
    }
    return res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: 'Ошибка на сервере, повторите попытку' });
  }
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(err));
};

const updateProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findOneAndUpdate(req.user._id,
      { name, about }, { new: true, runValidators: true });
    return res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: 'Ошибка на сервере, повторите попытку' });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findOneAndUpdate(req.user._id,
      { avatar }, { new: true, runValidators: true });
    return res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: 'Ошибка на сервере, повторите попытку' });
  }
};

module.exports = {
  getUsers, getProfile, createUser, updateProfile, updateAvatar,
};
