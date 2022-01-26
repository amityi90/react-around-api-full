import React from 'react';
import logo from '../images/around-the-us-logo.svg';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';



function Header(props) {

    const currentUser = React.useContext(CurrentUserContext);


    function Logout() {
        if (props.registrationLink.text === "Log out") {
            props.handleLogout();
        }
    }

    return (
        <header className="header">
            <img className="header__image" src={logo} id="around-the-us-logo"
                alt="around the u.s. logo" />
            <nav className='header__navigator'>
                <Link className='header__navigator-item' to="/">{props.userEmail ? props.userEmail : " "}</Link>
                <Link
                    className='header__navigator-item'
                    to={props.registrationLink.path ? props.registrationLink.path : "/"}
                    onClick={Logout}
                >
                    {props.registrationLink.text}
                </Link>
            </nav>
        </header>
    );
}

export default Header;