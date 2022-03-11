var express = require('express');
var router = express.Router();
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password1!',
  database: 'sakila'
});

connection.connect(function (err) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Yay! you got yourself connected');
});
/* GET home page. */
const filmList = `SELECT * from film`;

router.get('/film', function (req, res, next) {
  connection.query(filmList, function (err, result) {
    res.render('film', {
      films: result
    });
  });
});

router.get('/film', function (req, res, next) {
  connection.query(filmList, function (err, result) {
    res.render('film', {
      films: result
    });
  });
});

router.get('/film/:id', function (req, res, next) {
  let filmId = parseInt(req.params.id);
  console.log(filmId);

  let filmQuery = 
  `SELECT film.title, actor.first_name, actor.last_name 
  FROM film
  INNER JOIN film_actor
  ON film.film_id = film_actor.film_id
  INNER JOIN actor 
  ON film_actor.actor_id = actor.actor_id
  WHERE film.film_id = ${filmId}`;
  console.log(filmQuery);

  connection.query(filmQuery, function(err, result) {
    if (err) {
      res.render('error', { message: err.message });
    } else {
      console.log(result);
      res.render('filmDetails', {
        filmTitle: result[0].title,
        films: result
      });
    }
  });
});

module.exports = router;
