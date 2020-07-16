import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { ADD_RECIPE } from '../../mutations/index';
import { GET_ALL_RECIPES } from '../../queries/index';
import Error from '../Error/Error';
import './AddRecipe.css';

const AddRecipe = ({ history }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Breakfast');
  const [instructions, setInstructions] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const updateCache = (cache, { data: { addRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
    console.log('[AddRecipe] allRecipesCache => ', getAllRecipes);
    console.log('[AddRecipe] addRecipe => ', addRecipe);

    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes],
      },
    });
  };

  const [addRecipeMutation, { data }] = useMutation(ADD_RECIPE, {
    update: updateCache,
  });

  function clearState() {
    setName(() => '');
    setDescription(() => '');
    setCategory(() => '');
    setInstructions(() => '');
    setUsername(() => '');
    setCategory(() => 'Breakfast');
  }

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    if (name && description && category && instructions) {
      try {
        const { data } = await addRecipeMutation({
          variables: {
            name: name,
            description: description,
            category: category,
            instruction: instructions,
            username: username,
            likes: 0,
          },
        });
        console.log('data => ', data);
        clearState();
        history.push('/');
      } catch (error) {
        setError(() => error);
      }
    } else {
      alert('Missing field');
    }
  };

  return (
    <div className="App">
      <h2>Add Recipe</h2>
      <form className="form" onSubmit={(e) => handleAddRecipe(e)}>
        <input
          type="text"
          name="name"
          placeholder="Recipe name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          name="description"
          placeholder="Add description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
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
        <textarea
          name="instruction"
          placeholder="instructions"
          onChange={(e) => setInstructions(e.target.value)}
          value={instructions}
        ></textarea>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button type="submit">Add Recipe</button>
      </form>
      {error && <Error error={error.message} />}
    </div>
  );
};

export default withRouter(AddRecipe);
