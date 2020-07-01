import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import App from './components/App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import withSession  from './components/withSession';

import './index.css';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: { credentials: 'include' },
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
  onError: ({networkError}) =>{
    if (networkError) {
      console.log('Network Error :: ', networkError);
    }
  }
});

const Root = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

const RooWithSession = withSession(Root);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RooWithSession />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
