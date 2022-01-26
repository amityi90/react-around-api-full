function InfoTooltip(props) {


    return (
        <div className="popup">
            <section className="registration-info">
                <button
                    className="registration-info__close-button popup__close-button"
                    type="button"
                    aria-label="close-form"
                    onClick={() => {
                        props.setRegInfoController({ popup: false })
                    }}
                ></button>
                <div className={`registration-info__image ${props.regInfoController.img ? "registration-info__image_content_v" : "registration-info__image_content_x"}`} />
                <h1 className="regisreation-info__title">{props.regInfoController.text}</h1>
            </section>
        </div>
    );
}

export default InfoTooltip;