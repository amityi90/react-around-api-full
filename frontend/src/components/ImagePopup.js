
function ImagePopup({ isClose, onClose, selectedCard }) {

    return (
        <section className={`popup ${isClose && 'popup_disable'} popup_content_big-screen-image`}>
            <div className="big-screen-image">
                <button className="popup__close-button" onClick={onClose} type="button" aria-label="close-form" />
                <img className="big-screen-image__image" alt={`photo of ${selectedCard.name}`} src={selectedCard.src} />
                <p className="big-screen-image__name">{selectedCard.name}</p>
            </div>
        </section>
    );
}

export default ImagePopup;