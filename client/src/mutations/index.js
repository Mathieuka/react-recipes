import { gql } from 'apollo-boost';

export const SIGNUP_USER = gql`
  mutation signupUser($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation signinUser($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation addRecipe(
    $name: String!
    $description: String!
    $category: String!
    $instruction: String!
    $username: String
  ) {
    addRecipe(
      name: $name
      description: $description
      category: $category
      instructions: $instruction
      username: $username
    ) {
      name
      description
      category
      instructions
      username
    }
  }
`;

export const ADD_LIKE = gql`
  mutation addLike($_id: String!) {
    addLike(_id: $_id) {
      _id
      likes
    }
  }
`;
