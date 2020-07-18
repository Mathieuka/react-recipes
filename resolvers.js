const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllRecipes: async (root, args, { Recipe }) => {
      const allRecipes = await Recipe.find();
      return allRecipes.reverse();
    },
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }

      const user = await User.findOne({
        username: currentUser.username,
      }).populate({ path: 'favorites', model: 'Recipe' });

      return user;
    },
    getRecipe: async (root, { _id }, { Recipe }) => {
      const recipe = await Recipe.findOne({ _id });

      return recipe;
    },
    searchRecipes: async (root, { searchTerm, category }, { Recipe }) => {
      const recipesFind = await Recipe.find({
        name: { $regex: searchTerm },
        category: { $regex: category },
      });

      return recipesFind;
    },
  },
  Mutation: {
    addRecipe: async (
      root,
      { name, description, category, instructions, username },
      { Recipe }
    ) => {
      const newRecipe = await new Recipe({
        name,
        description,
        category,
        instructions,
        username,
      }).save();

      return newRecipe;
    },
    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });

      if (user) {
        throw new Error('User already exist');
      }

      const newUser = await new User({ username, email, password }).save();

      return { token: createToken(newUser, process.env.SECRET, '1hr') };
    },
    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error('User not found');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error('Invalid Password');
      }

      return { token: createToken(user, process.env.SECRET, '1hr') };
    },
    addLike: async (root, { _id }, { Recipe }) => {
      const recipe = await Recipe.findOne({ _id });
      await Recipe.update(
        { _id: _id, likes: recipe.likes },
        { $set: { _id: _id, likes: recipe.likes + 1 } }
      );

      const recipeUpdate = await Recipe.findOne({ _id });
      return recipeUpdate;
    },
  },
};
