import $ from 'jquery';


class UserActions {
  getAllReviews(name) {
    let URIname = encodeURIComponent(name);
    let uri = '/api/mint?business_name=' + URIname
    $.ajax({ url: uri })
      .done((data) => {
        console.log('GOT DATA!', data);
        return data;
      })
      .fail((err) => {
        console.error("Didn't get data :(", err);
        throw err;
      });
  }

  getReviewsByStars(name, stars) {
    let URIname = encodeURIComponent(name);
    let uri = '/api/mint/stars?business_name=' + URIname + '&business_stars=' + stars[0] + '_' + stars[1];
    $.ajax({url: uri})
      .done((data) => {
        console.log('GOT DATA!', data);
        return data;
      })
      .fail((err) => {
        console.error("Didn't get data :(", err);
        throw err;
      });
  }

  getReviewsByDate(name, dateRange) {
    let URIname = encodeURIComponent(name);
    let uri = '/api/mint/date?business_name=' + URIname + '&business_dates=' + dateRange[0] + '_' + dateRange[1];
    $.ajax({url: uri})
      .done((data) => {
        console.log('GOT DATA!', data);
        return data;
      })
      .fail((err) => {
        console.error("Didn't get data :(", err);
        throw err;
      });
  }

}

export default UserActions;