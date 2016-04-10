var express = require('express')

var Promise = require('bluebird')
var db = require('./db-helpers')
var sentiments = require('./sentiment.js');

console.log('we are in review-api')

var MintAPI = module.exports = express.Router()
//{ mergeParams: true }

MintAPI.get('/', function(req, res) {
<<<<<<< HEAD
  console.log('inside / endpoint')
  console.log('req query', req.query);
=======
  console.log('reqQuery', req.query);
>>>>>>> promises are a bitch sometimes
  var business_name = req.query.business_name + ''
  business_name = business_name.replace('%20', ' ');
  var stars = req.query.business_stars.split('_')
  var dates = req.query.business_dates.split('_')
<<<<<<< HEAD
=======
  console.log('name', business_name);
>>>>>>> promises are a bitch sometimes
  return db.selectAllReviews(business_name, stars, dates)
  .then(function(reviews){
    // console.log('mah reviews are', reviews);
    if (reviews.length === 0) {
      res.status(400).send('No results for this query');
    } else {
      return sentiments.getAllFromReviews(reviews);
    }
  })
  .then(function(sentiments){
    res.send(sentiments)
  })
  .catch(function(err){
    console.error('OH NO. SENTIMENT ERROR', err);
    res.status(500).send(err);
  })
})

MintAPI.get('/stars', function(req, res) {
  console.log('inside /stars endpoint');
  var business_name = req.query.business_name + ''
  var stars = req.query.business_stars.split('_')
  return db.selectByStars(business_name, stars)
  .then(function(reviews){
    if (reviews.length === 0) {
      console.log('no reviews')
      res.status(400).send('No results for this query');
    } else {
      return sentiments.getAllFromReviews(reviews);
    }
  })
  .then(function(sentiments){
    res.send(sentiments)
  })
  .catch(function(err){
    console.error('OH NO. SENTIMENT ERROR', err);
    res.status(500).send(err);
  })
})

MintAPI.get('/date', function(req, res) {
  console.log('inside /date endpoint')
  var business_name = req.query.business_name + ''
  var dates = req.query.business_dates.split('_')
  return db.selectByDate(business_name, dates)
  .then(function(reviews){
    if (reviews.length === 0) {
      res.status(400).send('No results for this query');
    } else {
      return sentiments.getAllFromReviews(reviews);
    }
  })
  .then(function(sentiments){
    res.send(sentiments)
  })
  .catch(function(err){
    console.error('OH NO. SENTIMENT ERROR', err);
    res.status(500).send(err);
  })
})
