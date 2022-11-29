const fs = require('fs').promises;

async function readFile() {
    try {
      const data = await fs.readFile('./src/movies.json', 'utf-8');
      const movies = JSON.parse(data);
      return movies;
    } catch (err) {
      console.error(`Erro ao ler o arquivo: ${err.message}`);
    }
  }

  async function addMovie(newMovie) {
    try {
      const movies = await readFile();
    //   const index = movies.findIndex((movie) => movie.id === movie.length - 1);
      const newMovieWithId = { id: 8, ...newMovie };
      const allMovies = JSON.stringify([...movies, newMovieWithId]);
      return allMovies;
    } catch (err) {
      console.error(`Erro ao ler o arquivo: ${err.message}`);
    }
  }

  async function updateMovies(id, movieToUpdate) {
    const oldMovies = await readFile();
    const updatedMovie = { id, ...movieToUpdate };
    const index = oldMovies.findIndex((movie) => movie.id === id);
    const listDeleted = oldMovies.splice(index, 1);
    const updatedMovies = JSON.stringify([...listDeleted, updatedMovie]);
    return updatedMovies;    
  }

module.exports = {
    readFile,
    addMovie,
    updateMovies,
};