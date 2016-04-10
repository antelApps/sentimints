import React from 'react'
import ReactDOM from 'react-dom'
import DatePicker from 'react-date-picker'
import BusinessSelect from './businessSelect.jsx'
import StarSelect from './starSelect.jsx'
// import 'react-date-picker.css'
// require('react-date-picker/index.css'); //once css loader works should be fine.


var businessNames = ["test", "test2", "test3"];

export default class Menu extends React.Component{

	constructor() {
		super();
    this.state = {
    	startDate: null,
    	endDate: null,
    	business: businessNames[0],
    	star: 1
    };
  }

	handleDateChange(dateString, moment){
		console.log('stuff changed', arguments);
	}

	handleBusinessChange(newState){
		var component = this;
		this.setState({business: newState}, function(){
			console.log("new business value: ", component.state.business, newState);		
		})
	}

	handleStarChange(newState){
		var component = this;
		this.setState({star: newState}, function(){
			console.log("new star value: ", component.state.star, newState);		
		})
	}

	handleButtonClick(){
		this.props.onSearch(this.state.startDate, this.state.endDate, this.state.business, this.state.star);
	}

	render(){
		return (
			<div>
				Start Date:
				<DatePicker
				  minDate='2006-04-04'
				  maxDate='2006-10-10'
				  date={Date.now()}
				  onChange={this.handleDateChange.bind(this, "start")}
				/>

				End Date:
				<DatePicker
				  minDate='2014-04-04'
				  maxDate='2015-10-10'
				  date={Date.now()}
				  onChange={this.handleDateChange.bind(this, "end")}
				/>

				<BusinessSelect businessNames={businessNames} onChange={this.handleBusinessChange.bind(this)}/>

				<StarSelect onChange={this.handleStarChange.bind(this)}/>

				<button onClick={this.handleButtonClick.bind(this)}> Go </button>
			</div>
		)
	}
}
