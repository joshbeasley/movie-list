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

app.post('/movies', async (req, res) => {
  try {
    const maxIdQuery = await knex('movie').max('id as maxId').first();
    let num = maxIdQuery.maxId + 1;
    let newMovie = {
      id: num,
      title: req.body.title
    }
    await knex('movie').insert(newMovie);
    res.status(201).send(newMovie);
  } catch (err) {
    res.sendStatus(400);
    console.log(err);
  }
})

app.delete('/movies/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try{
    await knex('movie').where('id', id).del();
    res.status(202).send(`Movie with id ${id} successfully deleted.`);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})