import $ from 'jquery';
import Promise from 'bluebird';

let UserActions = {

  getAllReviews: function(name, stars = ['0', '5'], dateRange = ['1900-01-01', '2100-01-01']) {
    console.log('inside getAllReviews')
    return new Promise(resolve, reject){
      
    let URIname = encodeURIComponent(name);
    let uri = '/api/mint/?business_name=' + URIname + '&business_stars=' + stars[0] + '_' + stars[1] + '&business_dates=' + dateRange[0] + '_' + dateRange[1];
    $.ajax({ url: uri })
      .done((data) => {
        console.log('GOT DATA!', data);

        return resolve(data);
      })
      .fail((err) => {
        if (err.status === 400) {
          alert(err.responseText);
        }
        console.error("Didn't get data :(", err);

        return reject(err);
      });
    }
  },

  getReviewsByStars: function(name, stars) {
    let URIname = encodeURIComponent(name);
    let uri = '/api/mint/stars?business_name=' + URIname + '&business_stars=' + stars[0] + '_' + stars[1];
    $.ajax({url: uri})
      .done((data) => {
        console.log('GOT DATA!', data);
        resolve(data);
      })
      .fail((err) => {
        if (err.status === 400) {
          alert(err.responseText);
        }
        console.error("Didn't get data :(", err);
        throw err;
      });
  },

  getReviewsByDate: function(name, dateRange) {
    let URIname = encodeURIComponent(name);
    let uri = '/api/mint/date?business_name=' + URIname + '&business_dates=' + dateRange[0] + '_' + dateRange[1];
    $.ajax({url: uri})
      .done((data) => {
        console.log('GOT DATA!', data);
        resolve(data);
      })
      .fail((err) => {
        if (err.status === 400) {
          alert(err.responseText);
        }
        console.error("Didn't get data :(", err);
        reject(err);
      });      
  })
}

export default UserActions;
