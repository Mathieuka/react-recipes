import { gql } from 'apollo-boost';

export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      category
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
    }
  }
`;

export const GET_RECIPE = gql`
  query getRecipe($_id: ID!) {
    getRecipe(_id: $_id) {
      name
      category
      description
      instructions
      createdDate
      likes
      username
    }
  }
`;
