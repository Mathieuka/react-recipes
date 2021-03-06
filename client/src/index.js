import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import AddRecipe from './components/Recipe/AddRecipe';
import Profile from './components/Profile/profile';
import App from './components/App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Search from './components/Recipe/Search';
import withSession from './components/withSession';
import RecipePage from './components/Recipe/RecipePage';

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
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network Error :: ', networkError);
    }
  },
});

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/search" component={Search} />
        <Route path="/recipe/add" component={AddRecipe} />
        <Route path="/recipes/:_id" component={RecipePage} />
        <Route path="/signin" render={() => <Signin refetch={refetch}/>} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Route path="/profile" component={Profile} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
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
