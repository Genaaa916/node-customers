const bodyParser = require('body-parser');
const express = require('express');
const app = express();  
app.use(bodyParser.json());

const port = 3000;
// movies array
let movies = [
  {id: '1588323375416', title: 'Star Wars: Episode IX - The Rise of Skywalker', year: 2019, director: 'J.J. Abrams'},
  {id: '1588323390624', title: 'The Irishman', year: 2019, director: 'Martin Scorsese'},
  {id: '1588323412643', title: 'Harry Potter and the Sorcerers Stone', year: 2001, director: 'Chris Columbus'}
];

// get all movies
app.get('/api/movies', (req, res) => {
    res.json(movies);
});

// delete movie by id
app.delete('/api/movies/:id', (req, res) => {
    const id = req.params.id;
    movies = movies.filter(movie => movie.id !== id);
    res.status(204).end();
});

//update movie by id
app.put('/api/movies/:id', (req, res) => {
    const id = req.params.id;
    const updatedMovie = {...req.body, id: id};
    const index = movies.findIndex(movie => movie.id === id);
    movies.splice(index, 1, updatedMovie);
    res.json(updatedMovie);
});
// add new movie
app.post('/api/movies', (req, res) => {
    const movie = req.body;
    movies = [...movies, movie];
    res.json(movie);
});

//get movie by id
app.get('/api/movies/:id', (req, res) => {
    const id = req.params.id;
    const movie = movies.filter(movie => movie.id === id);
    if (movie.length > 0) {
        res.json(movie);
    } else {
        res.status(404).end();
}});
// listen on port 3000
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`)
})  
