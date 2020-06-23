const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

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
    resolvers
})

// Connects to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('db connected'))
  .catch((err) => console.log('Error :: ', err));

// Initializes app
const app = express();

// Create GraphiQl application
app.use('./graphiql', graphiqlExpress({ endpointURL: '/graphql'}));

// Connect schemas with GraphQl
app.use('/graphql', graphqlExpress({
    schema,
    context: {
        Recipe,
        User
    }
}))

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on PORT:: ${PORT}`);
});
