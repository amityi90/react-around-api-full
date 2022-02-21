import React, { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlaceSubmit({
            name: name,
            link: link,
        });
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isClose]);

    return (
        <PopupWithForm
            isClose={props.isClose}
            name="add-place"
            title="Add place"
            submit="Save"
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                onChange={handleNameChange}
                value={name}
                className="popup__text-input popup__text-input_content_place-name"
                id="input-place-name"
                type="text"
                placeholder="Title"
                name="place-name"
                minLength="1"
                maxLength="30"
                required />
            <span className="popup__text-input-error" id="input-place-name-error" />
            <input
                onChange={handleLinkChange}
                value={link}
                className="popup__text-input popup__text-input_content_link"
                id="input-link"
                type="url"
                placeholder="Image link"
                name="link"
                required />
            <span className="popup__text-input-error" id="input-link-error" />
        </PopupWithForm>
    );
}

export default AddPlacePopup;