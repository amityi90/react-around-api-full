import PopupWithForm from './PopupWithForm.js';
import React, { useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState(currentUser.userName);
    const [description, setDescription] = React.useState(currentUser.userDescription);

    React.useEffect(() => {
        setName(currentUser.userName);
        setDescription(currentUser.userDescription);
    }, [currentUser, props.isClose]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            profession: description,
        });
    }



    return (
        <PopupWithForm
            isClose={props.isClose}
            onSubmit={handleSubmit}
            name="profile-edit"
            title="Edit profile"
            submit="Save"
            onClose={props.onClose}>
            <input
                className="popup__text-input popup__text-input_content_name"
                id="input-name"
                value={name || ''}
                onChange={handleNameChange}
                type="text"
                placeholder="Name"
                name="name"
                minLength="2"
                maxLength="40"
                required />
            <span className="popup__text-input-error" id="input-name-error" />
            <input
                className="popup__text-input popup__text-input_content_profession"
                id="input-profession"
                value={description || ''}
                onChange={handleDescriptionChange}
                type="text"
                placeholder="About me"
                name="profession"
                minLength="2"
                maxLength="200"
                required />
            <span className="popup__text-input-error" id="input-profession-error" />
        </PopupWithForm>
    );
}

export default EditProfilePopup;