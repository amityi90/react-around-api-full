import React from 'react';
import { Link } from 'react-router-dom';


function Login(props) {

    React.useEffect(
        () => {
          props.setRegistrationLink({
              text: 'Sign up',
              path: '/signup'
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
        props.onLoginSubmit({
            email: email,
            password: password
        });
    }

    return (
        <form className='sign-up' onSubmit={handleSubmit}>
            <h1 className='sign-up__title'>Log in</h1>
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
            <button className='sign-up__submit'>Log in</button>
            <Link to="/signup" className='sign-up__login-link'>Not a member yet? Sign up here!</Link>
        </form>
    );
}

export default Login;