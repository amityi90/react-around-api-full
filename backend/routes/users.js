const userRouter = require('express').Router();
const { auth } = require('../middlewares/auth');
const { celebrate, Joi } = require('celebrate');
const { getUsers, getUserById, updateProfile, updateAvatar, getCurrentUser } = require('../controllers/user');
const { validateURL } = require('../helpers/validationScheme');

userRouter.get('/', getUsers);
userRouter.get('/me', auth, getCurrentUser);
userRouter.get('/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().min(8).required(),
    }).unknown(true),
  }), getUserById);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), updateProfile);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }).unknown(true),
}), updateAvatar);

module.exports = userRouter;