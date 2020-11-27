/* eslint-disable linebreak-style */
const router = require('express').Router();
const {
  getUsers, getProfile, createUser, updateProfile, updateAvatar, login,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getProfile);
router.post('/signup', createUser);
router.post('/signin', login);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
