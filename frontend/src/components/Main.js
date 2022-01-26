import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Card from './Card.js';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';



function Main(props) {

    

    React.useEffect(
        () => {
            props.setRegistrationLink({
                text: 'Log out',
                path: '/signin'
            })
        },
        []
    );

    const currentUser = React.useContext(CurrentUserContext);



    return (
        <main className="page__main">
            <section className="profile">
                <div className="profile__info-container">
                    <div className="profile__avatar-container">
                        <div className="profile__edit-container" onClick={props.onEditAvatarClick} />
                        <img className="profile__avatar" src={currentUser.userAvatar} alt="profile photo" />
                    </div>
                    <div className="profile__info">
                        <div className="profile__name-container">
                            <h1 className="profile__name">{currentUser.userName}</h1>
                            <button className="profile__edit-button" onClick={props.onEditProfileClick} type="button" aria-label="edit-profile" />
                        </div>
                        <p className="profile__proffesion">{currentUser.userDescription}</p>
                    </div>
                </div>
                <button className="profile__add-button" onClick={props.onAddPlaceClick} type="button" aria-label="add" />
            </section>
            <section className="cards">
                {
                    props.cards.map((card) => {
                        return (
                            <Card
                                onCardDelete={props.onCardDelete}
                                card={card}
                                handleCardClick={props.handleCardClick}
                                onCardLike={props.onCardLike}
                                handleCardDelete={props.handleCardDelete}
                                key={card.cardId ? card.cardId : card._id} />
                        );
                    })
                }
            </section>
        </main>
    );
}

export default Main;