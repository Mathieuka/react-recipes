import React, { useState, useEffect } from 'react';
import { useQuery, Query } from 'react-apollo';
import RecipeItem from './RecipeItem';
import { SEARCH_RECIPE } from '../../queries/index';
import useDebounce from '../../customsHooks/useDebounce';

const Search = () => {
  const [category, setCategory] = useState('Breakfast');
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 2000);

  const handleTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <div>
        <input
          value={searchTerm}
          onChange={(e) => handleTerm(e)}
          placeholder="Recipe Name"
        ></input>
      </div>
      <div>
        <select
          name="category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>
      </div>
      <ul>
        {!searchTerm
          ? null
          : debouncedSearchTerm && (
              <Query query={SEARCH_RECIPE} variables={{ searchTerm, category }}>
                {({ data, loading, error }) => {
                  console.log('DATA => ', data);
                  if (error) return <div>Error</div>;
                  if (loading) return <div>Loading...</div>;
                  if (data) {
                    return (
                      <ul>
                        {data &&
                          data.searchRecipes.map((recipe) => {
                            return <RecipeItem key={recipe._id} {...recipe} />;
                          })}
                      </ul>
                    );
                  }
                  return <div> boum </div>;
                }}
              </Query>
            )}
      </ul>
    </div>
  );
};

export default Search;
