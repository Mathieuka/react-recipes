import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-apollo';
import { SIGNIN_USER } from '../../mutations/index';
import Error from '../Error/Error';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [signinMutation, { data }] = useMutation(SIGNIN_USER);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (username && password.length > 0) {
      try {
        const response = await signinMutation({
          variables: {
            username: username,
            password: password,
          },
        });
        const token = response.data.signinUser.token;
        localStorage.setItem('token', token);
        setUsername(() => '');
        setPassword(() => '');
      } catch (error) {
        console.log('Error:: ', error);
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
      <h2 className="App">Signin</h2>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit" className="button-primary">
          Submit
        </button>
      </form>
      {error && <Error error={error.message} />}
    </div>
  );
};

export default Signin;
