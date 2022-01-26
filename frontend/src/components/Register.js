import React from 'react';
import InfoTooltip from './InfoTooltip';
import { Link } from 'react-router-dom';

function Register(props) {

    React.useEffect(
        () => {
            props.setRegistrationLink({
                text: 'Log in',
                path: '/signin'
            })
        },
        []
    );

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegisterSubmit({
            email: email,
            password: password
        });
    }

    return (
        <div>
            <form className='sign-up' onSubmit={handleSubmit}>
                <h1 className='sign-up__title'>{`Sign up`}</h1>
                <input
                    className='sign-up__email sign-up__input'
                    placeholder='Email'
                    value={email || ''}
                    onChange={handleEmailChange}
                    type="email"
                    required
                />
                <input
                    className='sign-up__password sign-up__input'
                    placeholder='Password'
                    value={password || ''}
                    onChange={handlePasswordChange}
                    type="password"
                    required
                />
                <button className='sign-up__submit'>Sign up</button>
                <Link to="/signin" className='sign-up__login-link'>Already a member? Log in here!</Link>
            </form>
            {props.regInfoController.popup ? <InfoTooltip
                setRegInfoController={props.setRegInfoController}
                regInfoController={props.regInfoController}
            /> : ""}
        </div>
    );
}

export default Register;