/* eslint-disable linebreak-style */
const router = require('express').Router();
const auth = require('../middlewares/auth.js');
const {
  getUsers, createUser, updateProfile, updateAvatar, login, getUserInfo,
} = require('../controllers/users');

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getUserInfo);
router.post('/signup', createUser);
router.post('/signin', login);
router.patch('/users/me', auth, updateProfile);
router.patch('/users/me/avatar', auth, updateAvatar);

module.exports = router;
