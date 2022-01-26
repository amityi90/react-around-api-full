import React from 'react';
import { useRef, useEffect } from 'react';

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const urlRef = React.useRef(null);

    useEffect(() => {
        urlRef.current.focus();
      }, []);
 

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(urlRef.current.value);
        urlRef.current.value = "";
    }

    return (
        <PopupWithForm
            isClose={props.isClose}
            name="change-profile-picture"
            title="Change profile picture"
            submit="Save"
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input
                className="popup__text-input popup__text-input_content_picture"
                id="input-picture"
                type="url"
                ref={urlRef}
                placeholder="Image link"
                name="picture"
                required />
            <span className="popup__text-input-error" id="input-picture-error" />
        </PopupWithForm>
    );
}

export default EditAvatarPopup;