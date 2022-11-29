const express = require('express');
const { readFile, addMovie, updateMovies } = require('./readFile');

const app = express();

app.use(express.json());

app.get('/movies', async (req, res) => {
    const dataGet = await readFile();
    console.log(dataGet);
    res.status(200).json({ dataGet });
});

app.get('/movies/:id', async (req, res) => {
    const { id } = req.params;
    const dataGet = await readFile();
    const filtered = await dataGet.filter((movie) => movie.id === Number(id));
    console.log(dataGet);
    res.status(200).json({ filtered });
});

app.post('/movies', async (req, res) => {
    const newMovie = req.body;
    const dataGet = await addMovie(newMovie);
    const dataGetStr = JSON.parse(dataGet);
    res.status(201).json({ dataGetStr });
});

app.put('/movies/:id', async (req, res) => {
    const { id } = req.params;
    const { movieToUpdate } = req.body;
    const newList = updateMovies(Number(id), movieToUpdate);
    res.status(201).json({ newList });
});

module.exports = app;