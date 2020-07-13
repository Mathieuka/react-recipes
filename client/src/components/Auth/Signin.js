import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-apollo';
import { SIGNIN_USER } from '../../mutations/index';
import { withRouter } from 'react-router-dom';
import Error from '../Error/Error';

const Signin = ({ history, refetch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [signinMutation, { data }] = useMutation(SIGNIN_USER);

  function clearState() {
    setUsername(() => '');
    setPassword(() => '');
  }

  const handleSignin = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        const { data } = await signinMutation({
          variables: {
            username: username,
            password: password,
          },
        });
        localStorage.setItem('token', data.signinUser.token);
        await refetch();
        clearState();
        history.push('/');
      } catch (error) {
        setError(() => error);
      }
    } else {
      alert('Missing field ');
    }
  };

  return (
    <div className="App">
      <h2 className="App">Signin</h2>
      <form className="form" onSubmit={(e) => handleSignin(e)}>
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

export default withRouter(Signin);
