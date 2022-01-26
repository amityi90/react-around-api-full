
function PopupWithForm(props) {


    return (
        <section className={`popup ${props.isClose ? 'popup_disable' : ''} popup_content_${props.name}`}>
            <div className="popup__conainer">
                <button className="popup__close-button" onClick={props.onClose} type="button" aria-label="close-form"></button>
                <form className="popup__form"
                    name={props.name}
                    onSubmit={props.onSubmit}                  >
                    <h2 className="popup__heading">{props.title}</h2>
                    {props.children}
                    <button className="popup__save-button" type="submit">{props.submit}</button>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;