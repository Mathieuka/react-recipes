import React from 'react';
import './App.css';
import { useQuery } from 'react-apollo';
import { GET_ALL_RECIPES } from '../queries';

const App = () => {
  const { data, loading, error } = useQuery(GET_ALL_RECIPES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="App">
      <h1>Home</h1>
      <p>Recipes</p>;
    </div>
  );
};

export default App;
