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

const API_KEY = process.env.API_KEY; // API_KEY not defined
const baseUrl = 'https://api.themoviedb.org/3'; // Base request url

app.use(express.json());                            // Support for JSON body
app.use(bodyParser.urlencoded({ extended: true })); // Support for url-encoded body


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


// rate movie
app.post('/request-token', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  axios.get(`${baseUrl}/authentication/token/new?api_key=${API_KEY}`)
    .then(data => {
      if(data.data.success) {
        let request_token = data.data.request_token;
        axios.post(`${baseUrl}/authentication/token/validate_with_login?api_key=${API_KEY}`,{
          username: username,
          password: password,
          request_token: request_token,
        })
        .then(data => res.status(200).json(data.data))
        .catch(error => res.status(500).json(error));
      } else {
        res.status(501).json(data);
      }
    }).catch(error => res.status(500).json(error));
});

app.post('/create-session', (req, res) => {
  let request_token = req.body.request_token;
  let username = req.body.username;
  axios.post(`${baseUrl}/authentication/session/new?api_key=${API_KEY}`,{
    request_token: request_token
  }).then(data => {
    if(data.data.succes) {
      res.status(200).json(data.data);
    } else {
      res.status(501).json(data.data);
    }
  }).catch(error => res.status(500).json(error));
});

app.delete('/delete-session/:session_id', (req, res) => {
  let session_id = req.params.session_id;
  axios.delete(`${baseUrl}/authentication/session?api_key=${API_KEY}`, { data: { session_id: session_id } })
  .then(data => {
    if(data.data.success) {
      res.status(200).json(data.data);
    } else {
      res.status(501).json(data.data);
    }
  }).catch(error => {
    res.status(500).json(error)
  });
});


app.listen(PORT, () => {
    console.log('Application listening on port: ' + PORT);
});