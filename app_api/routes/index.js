const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user');


router.route('/user').post(ctrlUser.userCreate);

router.route('/user/:email').get(ctrlUser.userReadOne);
// const ctrlMovies = require('../controllers/movies');
// const strlWebSeries = require('../controllers/webseries');
// const ctrlReviews = require('../controllers/reviews');
// Movies
// router.route('/movies').get(ctrlMovies.moviesList).post(ctrlMovies.moviesCreate);
// router.route('/movies/:movieid').get(ctrlMovies.moviesReadOne).put(ctrlMovies.moviesUpdateOne).delete(ctrlMovies.moviesDeleteOne);
//WebSeries
// router.route('/webseries').get(strlWebSeries.webSeriesList).post(strlWebSeries.webSeriesCreate);
// router.route('/webseries/:webseriesid').get(strlWebSeries.webSeriesReadOne).put(strlWebSeries.webSeriesUpdateOne).delete(strlWebSeries.webSeriesDeleteOne);
// reviews
// router.route('/movies/:movieid/reviews').post(ctrlReviews.reviewsCreate);
// router.route('/movies/:movieid/reviews/:reviewid').get(ctrlReviews.reviewsReadOne).put(ctrlReviews.reviewsUpdateOne).delete(ctrlReviews.reviewsDeleteOne);

module.exports = router;