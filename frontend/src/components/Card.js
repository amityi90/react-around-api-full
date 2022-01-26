import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.ownerId === currentUser.userId;
    const isLiked = props.card.likesArray.some(like => like._id === currentUser.userId) ? true : false;


    function handleClick() {
        props.handleCardClick({ src: props.card.link, name: props.card.name });
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card.cardId);
    }


    return (
        <article className="card" >
            {isOwn && <button className="card__delete" type="button" aria-label="delete" onClick={handleDeleteClick} />}
            <div className="card__image-container">
                <img className="card__image" src={props.card.link} alt={`photo of ${props.card.name}`} onClick={handleClick} />
            </div>
            <div className="card__details">
                <h2 className="card__name">{props.card.name}</h2>
                <div>
                    <button className={`card__heart ${isLiked && "card__heart_active"}`} onClick={handleLikeClick} type="button" aria-label="like" />
                    <p className="card__like-number">{props.card.likesArray.length}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;