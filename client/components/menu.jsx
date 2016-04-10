import React from 'react'
import ReactDOM from 'react-dom'
import BusinessSelect from './businessSelect.jsx'
import StarSelect from './starSelect.jsx'
import UserActions from '../actions/userActions.jsx'
import DatePicker from 'react-date-picker'
require('react-date-picker/base.css');
require('react-date-picker/theme/hackerone.css');

var businessNames = ["-- Select a Business --", "Pitsburgh Steelers", "Tom's Diner", "Cain's Saloon", "The Westin Charlotte", "Rock Bottom", "Mitchell's Fish Market", "Pino's Contemporary Italian Restaurant & Wine Bar", "Tazza D'oro Cafe & Espresso Bar"];
export default class Menu extends React.Component{

  constructor() {
    super();
    this.state = {
    	startDate: null,
    	endDate: null,
    	business: businessNames[0],
    	startStar: 1,
    	endStar: 1,
    };
  }

	handleDateChange(which, dateString, moment){
		var component = this;
		if (which === 'start') {
				this.setState({startDate: dateString}, function(){
				console.log("start date value: ", component.state.startDate, dateString);
				})
			} else if (which === 'end') {
				this.setState({endDate: dateString}, function(){
				console.log("end Date value: ", component.state.endDate, dateString);
			})
		}
	}

	handleBusinessChange(newState){
		var component = this;
		this.setState({business: newState}, function(){
			console.log("new business value: ", component.state.business, newState);
		})
	}

	handleStarChange(minOrMax, newState){
		var component = this;
			if (minOrMax === 'min') {
				if (component.state.endStar < newState) {
					component.state.endStar = newState
				}
				this.setState({startStar: newState}, function(){
				console.log("start star value: ", component.state.startStar, newState);
				})
			} else if (minOrMax === 'max') {
				console.log('stst', component.state.startStar)
				if (newState < component.state.startStar) {
					newState = component.state.startStar
				}
				this.setState({endStar: newState}, function(){
				console.log("end star value: ", component.state.endStar, newState);
			})
		}
	}

	handleButtonClick(){
		this.props.onSearch(this.state.startDate, this.state.endDate, this.state.business, this.state.startStar, this.state.endStar);
	}

	render(){
		return (
			<div className="sidebar col-md-offset-2 col-md-8 col-sm-offset-0 col-sm-12">
			 <div className="datecontainer">
					Start Date:
					<DatePicker 
					  className="calendar"
					  minDate='2006-04-04'
					  maxDate='2016-10-10'
					  date={Date.now()}
					  onChange={this.handleDateChange.bind(this, "start")}
					/>

					End Date:
					<DatePicker 
					  className="calendar"
					  minDate='2006-04-04'
					  maxDate='2016-10-10'
					  date={Date.now()}
					  onChange={this.handleDateChange.bind(this, "end")}
					/>
				</div>

				<div className="selectors">

					Choose a Business:
					<BusinessSelect businessNames={businessNames} onChange={this.handleBusinessChange.bind(this)}/>

					Min Star:
					<StarSelect onChange={this.handleStarChange.bind(this, 'min')}/>

					Max Star
					<StarSelect onChange={this.handleStarChange.bind(this, 'max')}/>

					<button className="onlyButton btn btn-primary " onClick={this.handleButtonClick.bind(this)}> Go </button>
				</div>
			</div>
		)
	}
}
