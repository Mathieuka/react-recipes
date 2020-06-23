const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });
const Recipe = require('./models/Recipe')
const User = require('./models/User')


// Connects to database
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log('db connected'))
.catch(err => console.log('Error :: ', err))


// Initializes app
const app = express();

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on PORT:: ${PORT}`);
});
