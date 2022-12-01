/**
 * SERVER SIDE IMPLEMENTATION FOR "THE MOVIE DB"
 * TELEGRAM BOT.
 * 
 * This node server will act as middleware for the communications between 
 * the client (our telegram bot indeed) and "The Movie Database" service.
 * 
 * Author: Francesco Ortolani
 */

/* ----- APP DEFINITIONS ----- */

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8080;

const baseUrl = 'https://api.themoviedb.org/3'; // Base request url


/* ----- API ENTRYPOINTS ----- */


// get 5 most popular movies
app.get('/get-populars', (req, res) => {
    axios.get(`${baseUrl}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`)
      .then(function(data) {
        let results = data.data.results;
        let popular_films  = {
          pop_1: results[0].original_title,
          pop_2: results[1].original_title,
          pop_3: results[2].original_title,
          pop_4: results[3].original_title,
          pop_5: results[4].original_title
        };
        res.status(200).send(popular_films);
      })
      .catch(error => res.status(500).send(error))
});

//  get info of a movie
app.get('/info/:title', (req, res) => {
  let film_title = req.params.title;
  axios.get(`${baseUrl}/search/movie?api_key=${API_KEY}&language=it-IT&query=${film_title}`)
  .then(data => {
    if(data.data.total_results >= 1) {
      let id = data.data.results[0].id;
      axios.get(`${baseUrl}/movie/${id}?api_key=${API_KEY}&language=it-IT`)
        .then(data => {
            let info_film = {
              success:      true,
              title:        data.data.title,
              genres:       data.data.genres,                          
              overview:     data.data.overview,
              vote_average: data.data.vote_average,
              runtime:      data.data.runtime,
              release_date: data.data.release_date,
              poster_path:  data.data.poster_path
            };
            res.status(200).send(info_film);
        })
        .catch(error => res.status(500).send(error));
    } else {
      res.status(501).send(data.data);
    }

  }).catch(error => {
    console.log(error);
    res.status(500).send(error);
  })
});


    app.listen(PORT, () => {
        console.log('Application listening on port: ' + PORT);
    })