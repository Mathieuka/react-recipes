import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';

const handleSignout = (client, history) => {
  localStorage.setItem('token', '');
  client.resetStore();
  history.push('/');
};

const Signout = ({ history }) => {
  return (
    <ApolloConsumer>
      {(client) => {
        console.log(client.localState.cache.data.data.getAllRecipes);
        
        return (
          <button onClick={() => handleSignout(client, history)}>
            Signout
          </button>
        );
      }}
    </ApolloConsumer>
  );
};

export default withRouter(Signout);


