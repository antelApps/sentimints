import React from 'react'
import ReactDOM from 'react-dom'
import BusinessSelect from './businessSelect.jsx'
import StarSelect from './starSelect.jsx'
import UserActions from '../actions/userActions.jsx'
import DatePicker from 'react-date-picker'
require('react-date-picker/base.css'); //once css loader works should be fine.
require('react-date-picker/theme/hackerone.css'); //once css loader works should be fine.

var businessNames = ["Pitsburgh Steelers", "Tom's Diner", "Cain's Saloon", "The Westin Charlotte", "Rock Bottom", "Mitchell's Fish Market", "Pino's Contemporary Italian Restaurant & Wine Bar", "Tazza D'oro Cafe & Espresso Bar"];

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
				this.setState({startStar: newState}, function(){
				console.log("start star value: ", component.state.startStar, newState);
				})
			} else if (minOrMax === 'max') {
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
			<div>
				Start Date:
				<DatePicker
				  minDate='2006-04-04'
				  maxDate='2016-10-10'
				  date={Date.now()}
				  onChange={this.handleDateChange.bind(this, "start")}
				/>
				<DatePicker
				  minDate='2006-04-04'
				  maxDate='2016-10-10'
				  date={Date.now()}
				  onChange={this.handleDateChange.bind(this, "end")}
				/>

				<BusinessSelect businessNames={businessNames} onChange={this.handleBusinessChange.bind(this)}/>

				Min Star:
				<StarSelect onChange={this.handleStarChange.bind(this, 'min')}/>
				Max Star
				<StarSelect onChange={this.handleStarChange.bind(this, 'max')}/>

				<button onClick={this.handleButtonClick.bind(this)}> Go </button>
			</div>
		)
	}
}
