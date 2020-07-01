const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser-graphql');

require('dotenv').config({ path: 'variables.env' });
const Recipe = require('./models/Recipe');
const User = require('./models/User');

// Bring in Graphql-Express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Connects to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('db connected'))
  .catch((err) => console.log('Error :: ', err));

// Initializes app
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credential: true,
};

// Authorizes cross domain request.
app.use(cors(corsOptions));

// Set up JWT authentication middleware
app.use(async (req, resp, next) => {
  const token = req.headers['authorization'];

  if (token !== 'null') {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (error) {
      console.log('Error :: ', error);
    }
  }
  next();
});

// Create GraphiQl application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Connect schemas with GraphQl
app.use(
  '/graphql',
  bodyParser.graphql(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Recipe,
      User,
      currentUser,
    },
  }))
);

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on PORT:: ${PORT}`);
});
