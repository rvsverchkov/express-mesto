/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET} = process.env;

const getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(200).send(error);
    });
};

const getProfile = async (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(400).send({
        message: 'Ошибка на сервере, повторите попытку', error: `${error}`,
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
      res.send({ token });
    })
    .catch((error) => {
      res
        .status(401)
        .send({ message: error.message });
    });
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
  const {
    name, about,
  } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(400).send({
        message: 'Ошибка на сервере, повторите попытку', error: `${error}`,
      });
    });
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
  getUsers, getProfile, createUser, updateProfile, updateAvatar, login,
};
