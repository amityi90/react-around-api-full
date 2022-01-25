const cardRouter = require('express').Router();
const { getCards, getCardById, createCard, deleteCardById, likeCard, dislikeCard } = require('../controllers/card');


cardRouter.get('/', getCards);
cardRouter.get('/:id', getCardById);
cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', deleteCardById);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardRouter;
