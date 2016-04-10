import $ from 'jquery';
import Promise from 'bluebird';


let UserActions = {};

UserActions.getAllReviews = function(name, stars = [0, 5], dateRange = ['1900-01-01', '2100-01-01']) {
  return new Promise( function(resolve, reject) {
    let URIname = encodeURIComponent(name);
    let uri = '/api/mint?business_name=' + URIname + '&business_stars=' + stars[0] + '_' + stars[1] + '&business_dates=' + dateRange[0] + '_' + dateRange[1];
    $.ajax({ url: uri })
      .done((data) => {
        resolve(data);
      })
      .fail((err) => {
        if (err.status === 400) {
          alert(err.responseText);
        }
        reject(err);
      });      
    })
};

UserActions.getReviewsByStars = function(name, stars) {
  return new Promise( function(resolve, reject) {
    let URIname = encodeURIComponent(name);
    let uri = '/api/mint/stars?business_name=' + URIname + '&business_stars=' + stars[0] + '_' + stars[1];
    $.ajax({url: uri})
      .done((data) => {
        resolve(data);
      })
      .fail((err) => {
        if (err.status === 400) {
          alert(err.responseText);
        }
        reject(err);
      });      
    })
};

UserActions.getReviewsByDate = function(name, dateRange) {
  return new Promise( function(resolve, reject) {
    let URIname = encodeURIComponent(name);
    let uri = '/api/mint/date?business_name=' + URIname + '&business_dates=' + dateRange[0] + '_' + dateRange[1];
    $.ajax({url: uri})
      .done((data) => {
        resolve(data);
      })
      .fail((err) => {
        if (err.status === 400) {
          alert(err.responseText);
        }
        reject(err);
      });      
  })
}

export default UserActions;