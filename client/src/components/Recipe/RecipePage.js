import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { GET_RECIPE } from '../../queries/index';
import { ADD_LIKE } from '../../mutations/index';
import './RecipePage.css';

const RecipePage = ({ match }) => {
  const { _id } = match.params;
  const [addLikeMutation] = useMutation(ADD_LIKE);
  
  const { data, loading, error } = useQuery(GET_RECIPE, {
    variables: { _id },
  });

  const handleLike = () => {
    try {
      addLikeMutation({
        variables: {
          _id: _id,
        },
      });
      document.location.reload();
    } catch (error) {
      console.error('ERROR:: ', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const {
    instructions,
    name,
    category,
    description,
    likes,
    username,
  } = data.getRecipe;

  return (
    <div>
      <div className="recipe__title">
        <h3>
          <b>{name}</b>
          <p>Category: {category}</p>
        </h3>
      </div>
      <hr />
      <div className="recipe_content">
        <p>Description: {description}</p>
        <p>Instructions: {instructions}</p>
        <p>Likes: {likes}</p>
        <p>Created by: {username}</p>
      </div>
      <div className="like">
        <button onClick={(e) => handleLike(e)}>Like</button>
      </div>
    </div>
  );
};

export default withRouter(RecipePage);
