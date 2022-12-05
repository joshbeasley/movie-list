const express = require('express');
const knex = require('knex')(require('../knexfile.js')["development"]);
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors())
app.use(express.json());

app.get('/movies', async (req, res) => {
  try {
    const movies = await knex('movie');
    res.status(200).send(movies); 
  } catch (err) {
    res.sendStatus(404);
    console.log(err);
  }
  
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})