import React from "react"
import ReactDOM from "react-dom";
import Promise from "bluebird";

import Menu from "./menu.jsx"
import Navbar from "./navbar.jsx"
import Chartbucket from './chartbucket.jsx'

import UserActions from '../actions/userActions.jsx'


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      selectValue: null,
      data_aggregate: null,
      data_topical: null,
      data_label: 'All Reviews',
    };
  }


  handleSearch(startDate, endDate, business, star1, star2){
    console.log("handleSearch args", arguments)

    //Package the dates into the object the requests are expecting
    let dateRange = startDate && endDate ? [startDate, endDate] : undefined;
    let starRange = star1 && star2 ? [star1, star2] : undefined;

    //Format text for label
    let getDateRangeText = function() {
      return dateRange ? ' from ' + startDate + ' to ' + endDate : ''
    }
    let getStarText = function() {
      if (starRange) {
        return star1 === star2 ? ' with ' + star1 + ' Stars' : ' with ' + star1 + '-' + star2 + ' Stars';
      } else {
        return '';
      }
    }
    let getlabelText = function() {
      let dateRangeText = getDateRangeText();
      let starText = getStarText();
      return (dateRangeText.length === 0 && starText.length === 0 ? 'All Reviews' : 'Reviews' + dateRangeText + starText)
    }

    //Make the request and update the state
    return new Promise( (resolve, reject) => {
      if (dateRange && starRange) {
        console.log('will call get all reviews');
        return UserActions.getAllReviews(business, starRange, dateRange)
          .then( (data) => {
            // console.log('got data', data);
            resolve(data);
          })
      } else if (dateRange) {
        console.log('get reviews by date');
        return UserActions.getReviewsByDate(business, dateRange)
          .then( (data) => {
            resolve(data);
          })
      } else if (starRange) {
        console.log('getting reviews by stars');
        return UserActions.getReviewsByStars(business, starRange)
          .then( (data) => {
            resolve(data);
          })
      } else {
        console.log('will call get all reviews');
        return UserActions.getAllReviews(business)
        .then( (data) => {
          resolve(data);
        })
      }
    })
    .then( (data) => {
      let newStateData = {
        data_label: getlabelText(),
        data_aggregate: data.aggregate,
        data_topical: data.topical
      }
      this.setState(newStateData);
    })
    .catch( function(err) {
      console.log('Error handling search', err);
    })

  }

	render() {
		return (
			<div>
			  <Navbar/>
				<Menu onSearch={this.handleSearch.bind(this)}/>
        <Chartbucket title={this.state.data_label} data_aggregate={this.state.data_aggregate} data_topical={this.state.data_topical}/>
        {/* Footer with powered by __ */}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
