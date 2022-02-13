const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();
const { NODE_ENV, JWT_SECRET } = process.env;



module.exports.getCurrentUser = (req, res, next) => {
  User.find({ _id: req.user._id })
    .then(user => res.send({ data: user }))
    .catch(err => next(err));
};

module.exports.login = (req, res, next) => {
  let userId = "";
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect password or email'));
      }

      userId = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Incorrect password or email'));
      }
      console.log(NODE_ENV);
      const token = jwt.sign(
        { _id: userId },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }
      );
      console.log(token);
      res.send({ token });
    })
    .then(users => res.send({ data: users }))
    .catch(err => next(err));
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => next(err));
};

module.exports.getUserById = (req, res, next) => {
  User.find({ _id: req.params.id })
    .then(user => res.send({ data: user }))
    .catch(err => next(err));
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, password, email } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => User.create({
      name,
      about,
      avatar,
      password: hash,
      email
    }))
    .then(user => {
      res.send({ message: 'Posted' });
    })
    .catch(err => next(err));
};

module.exports.updateProfile = (req, res) =>
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true, runValidators: true },
  )
    .then(user => {
      res.send({ user: user });
    })
    .catch(err => next(err));

module.exports.updateAvatar = (req, res) => User.findByIdAndUpdate(
  req.user._id,
  { avatar: req.body.avatar },
  { new: true, runValidators: true },
)
  .then(user => {
    res.send({ user: user });
  })
  .catch(err => next(err));