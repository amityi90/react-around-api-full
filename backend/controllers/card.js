const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(err => next(err));
};

module.exports.getCardById = (req, res, next) => {

  Card.find({ _id: req.params.id })
    .then(card => res.send({ data: card }))
    .catch(err => next(err));
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((data) => res.send({ data: data }))
    .catch(err => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link, owner } = req.body;
  Card.create({ name, link, owner })
    .then(card => {
      res.send({ data: card });
    })
    .catch(err => next(err));
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then(card => {
    res.send({ card: card });
  })
  .catch(err => next(err));

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then(card => {
    res.send({ card: card });
  })
  .catch(err => next(err));