const Card = require('../models/card');
const { switchErrToNum, throwErrWhenFail } = require('../helpers/errHelpers');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(err => next(err));
};

module.exports.getCardById = (req, res) => {
  Card.find({ _id: req.params.id })
    .orFail(throwErrWhenFail)
    .then(card => res.send({ data: card }))
    .catch(err => next(err));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(throwErrWhenFail)
    .then(() => res.send({ message: 'deleted' }))
    .catch(err => next(err));
};

module.exports.createCard = (req, res) => {
  const { name, link, owner } = req.body;
  Card.create({ name, link, owner })
    .then(card => {
      res.send({ message: 'Posted' });
    })
    .catch(err => next(err));
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(throwErrWhenFail)
  .then(card => {
    res.send({ card: card });
  })
  .catch(err => next(err));

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(throwErrWhenFail)
  .then(card => {
    res.send({ card: card });
  })
  .catch(err => next(err));