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

const baseUrls = 'https://api.themoviedb.org/3'; // Base request url


/* ----- API ENTRYPOINTS ----- */


// get 5 most popular movies
app.get('/get-populars', (req, res) =>
    axios.get(`${baseUrl}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`)
      .then(function(data) {
        let results = data.data.results;
        let pouplar_films  = {
          pop_1: results[0].original_title,
          pop_2: results[1].original_title,
          pop_3: results[2].original_title,
          pop_4: results[3].original_title,
          pop_5: results[4].original_title
        };
        res.status(200).send(pouplar_films);
      })
      .catch(error => res.status(500).send(error))
    );

    app.listen(PORT, () => {
        console.log('Application listening on port: ' + PORT);
    })