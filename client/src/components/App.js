import React, { useMemo } from 'react';
import RecipeItem from './Recipe/RecipeItem';
import './App.css';
import { useQuery } from 'react-apollo';
import { GET_ALL_RECIPES } from '../queries';

const App = () => {
  const { data, loading, error } = useQuery(GET_ALL_RECIPES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  console.log('[App.js] data => ', data);
  return (
    <div className="App">
      <h1>Home</h1>
      <ul>
        {data.getAllRecipes.map((recipe) => (
          <RecipeItem key={recipe._id} {...recipe} />
        ))}
      </ul>
    </div>
  );
};

export default App;
