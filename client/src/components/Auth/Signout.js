import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const handleSignout = (client, history) => {
  localStorage.setItem('token', '');
  client.resetStore();
  history.push('/');
};

const Signout = ({ history }) => (
  <ApolloConsumer>
    {(client) => {
      // console.log('CLIENT CACHE => ', client.localState.cache.data.data.ROOT_QUERY);
      return (
        <button onClick={() => handleSignout(client, history)}>
          Signout
        </button>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(Signout);