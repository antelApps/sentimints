const config = require('../knexfile.js');
const env = process.env.NODE_ENV || 'development';
const knex = require('knex')(config[env]);

// can select by business
exports.selectAllReviews = function (business, stars, dateRange) {
  return exports.selectBusinessID(business)
              .then(busID => {
                return knex.select('*')
                            .from('reviews')
                            .whereBetween('review_date', dateRange)
                            .whereBetween('review_stars', stars)
                            .andWhere('business_id_fk', busID);
              })
              .then(reviews => {
                console.log('reviews', reviews);
                return reviews;
              })
              .catch(err => {
                console.error('OH NO, ERROR in selectAllReviews', err);
                throw err;
              });
};

// can select by both business & date
exports.selectByDate = function (business, dateRange) {
  return exports.selectBusinessID(business)
                .then(busID => {
                  return knex.select('*')
                              .from('reviews')
                              .whereBetween('review_date', dateRange)
                              .andWhere('business_id_fk', busID);
                })
                .then(reviews => {
                  console.log('reviews', reviews);
                  return reviews;
                })
                .catch(err => {
                  console.error('NOPE, ERROR in selectByDate', err);
                  throw err;
                });
};

// stars should be an [] --> [3, 3] || [1, 3] || or whatever
exports.selectByStars = function (business, stars) {
  return exports.selectBusinessID(business)
                .then(busID => {
                  return knex.select('*')
                            .from('reviews')
                            .whereBetween('review_stars', stars)
                            .andWhere('business_id_fk', busID)
                })
                .then(reviews => {
                  console.log('got reviews', reviews);
                  return reviews;
                })
                .catch(err => {
                  console.error('WHOOPS, ERROR in selectByStars', err);
                  throw err;
                });
};

exports.selectBusinessID = function (business) {
  console.log('helpers bix', business)
  return knex.select('business_id')
              .from('business')
              .where('business_name', business)
              .then(busID => {
                console.log('business_id', busID);
                return busID[0].business_id;
              })
              .catch(err => {
                console.error('OH ME OH MY, ERROR in selectBusinessID', err);
                throw err;
              });
};

// business is the business name.
exports.selectBusiness = function (business) {
  return knex.select('*')
              .from('business')
              .where('business_name', business)
              .then(businessInfo => {
                console.log('business info', businessInfo);
                return businessInfo[0];
              })
              .catch(err => {
                console.error('OH NO, ERROR in selectBusiness', err);
                throw err;
              });
};

