import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from './../../contexts/UserContext';

const SignUp = () => {
  const {
    // displayUserInformation, // when we have user information
    setIsLoggedIn,
    onUsernameChange,
    onEmailChange,
    onPasswordChange,
    onRegisterSubmission,
  } = useContext(UserContext);

  return (
    <main className="measure black-80 mv6 center shadow-4 pa5">
      <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <legend className="ph0 mh0 fw6 f4">Sign Up</legend>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="name">
            Username
          </label>
          <input
            className="pa2 w-100 hover-white input-reset hover-bg-black ba bg-transparent f7"
            type="text"
            name="name"
            id="name"
            onChange={onUsernameChange}
          />
        </div>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="email-address">
            Email Address
          </label>
          <input
            className="pa2 w-100 hover-white input-reset hover-bg-black ba bg-transparent f7"
            type="email"
            name="email-address"
            id="email-address"
            onChange={onEmailChange}
          />
        </div>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="password">
            Password
          </label>
          <input
            className="b pa2 w-100 hover-white input-reset hover-bg-black ba bg-transparent f7"
            type="password"
            name="password"
            id="password"
            onChange={onPasswordChange}
          />
        </div>
      </fieldset>
      <div className="mt3">
        <NavLink
          exact
          to="/"
          className="b ph3 pv2 dib input-reset ba b--black bg-transparent grow pointer f6 no-underline"
          onClick={onRegisterSubmission}
        >
          Sign me up
        </NavLink>
      </div>
    </main>
  );
};

export default SignUp;
