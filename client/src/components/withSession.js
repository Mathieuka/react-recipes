import React from 'react';
import { useQuery } from 'react-apollo';
import { GET_CURRENT_USER } from '../queries/index';

const withSession = (Component) => (props) => {
  const { data, loading } = useQuery(GET_CURRENT_USER);

  console.log('withSession data => ', data)

  if (loading) {
    return null;
  }

  return <Component {...props} />;
};

export default withSession;
