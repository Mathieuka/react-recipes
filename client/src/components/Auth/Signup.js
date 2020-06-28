import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-apollo';
import { SIGNUP_USER } from '../../mutations/index';
import Error from '../Error/Error';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  const [signupMutation, { data }] = useMutation(SIGNUP_USER);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      username &&
      email &&
      password.length > 0 &&
      password.localeCompare(passwordConfirmation) === 0
    ) {
      try {
        const response = await signupMutation({
          variables: {
            username: username,
            email: email,
            password: password,
          },
        });
        const token = response.data.signupUser.token;
        localStorage.setItem('token', token);
        setUsername(() => '');
        setEmail(() => '');
        setPassword(() => '');
        setPasswordConfirmation(() => '');
      } catch (error) {
        setError(() => error);
      }
    } else {
      alert(
        'Missing field in the form or Password is not identical to ConfirmPassword'
      );
    }
  };

  return (
    <div className="App">
      <h2 className="App">Signup</h2>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Password"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          value={passwordConfirmation}
        />
        <button type="submit" className="button-primary">
          Submit
        </button>
      </form>
      {error && <Error error={error.message} />}

    </div>
  );
};

export default Signup;
