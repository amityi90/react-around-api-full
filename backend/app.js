const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const { PORT = 3000 } = process.env;
const helmet = require('helmet');
const { login, createUser } = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const { validateURL, validateEmail } = require('./helpers/validationScheme');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors');
const rateLimit = require('express-rate-limit')




const app = express();
mongoose.connect('mongodb://localhost:27017/aroundb');
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
const bodyParser = require('body-parser');
const { handleErrors } = require('./helpers/errHelpers');
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors());
app.options('*', cors());
app.use(limiter)

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
  }).unknown(true),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
  }).unknown(true),
}), createUser);

app.use('/users', auth, require('./routes/users'));

app.use('/cards', auth, require('./routes/cards'));

app.get('*', (req, res) => {
  const err = new Error('Requested resource not found');
  err.statusCode = 404;
  throw err;
});

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
})



