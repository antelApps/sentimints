import React from "react"
import ReactDOM from "react-dom";
import Promise from "bluebird";

import Menu from "./menu.jsx"
import Navbar from "./navbar.jsx"
import AggChart from './aggChart.jsx'
import UserActions from '../actions/userActions.jsx'

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      selectValue: null,
      data_aggregate: null,
      data_topical: null,
      data_label: 'All Reviews'
    };
  }

  handleSearch(startDate, endDate, business, star){
    console.log("handleSearch args", arguments)

    //Package the dates into the object the requests are expecting
    let dateRange = startDate && endDate ? [startDate, endDate] : undefined;

    //Format text for label
    let getDateRangeText = function() {
      return dateRange ? ' from ' + startDate + ' to ' + endDate : ''
    }
    let getStarText = function() {
      if (star) {
        return star[0] === star[1] ? ' with ' + star[0] + ' Stars' : ' with ' + star[0] + '-' + star[1] + ' Stars';
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
    return new Promise( function(resolve, reject) {
      if (dateRange && star) {
        return UserActions.getAllReviews(business, star, dateRange)
          .then( function(data) {
            resolve(data);
          })
      } else if (dateRange) {
        return UserActions.getReviewsByDate(business, dateRange)
          .then( function(data) {
            resolve(data);
          })
      } else if (star) {
        return UserActions.getReviewsByStars(business, star)
          .then( function(data) {
            resolve(data);
          })
      } else {
        return UserActions.getAllReviews(business)
        .then( function(data) {
          resolve(data);
        })
      }
    })
    .then( function(data) {
      this.setState(data_label, getlabelText());
      this.setState(data_aggregate, data.aggregate);
      this.setState(data_topical, data.data_topical);
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
        <AggChart width={180} height={60} data={[10, 16, 5, 22, 3, 11]} />
        {/* Footer with powered by __ */}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
