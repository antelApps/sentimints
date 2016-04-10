import React from 'react'
import ReactDOM from 'react-dom'
import DatePicker from 'react-date-picker'
import BusinessSelect from './businessSelect.jsx'
// import 'react-date-picker.css'
// require('react-date-picker/index.css'); //once css loader works should be fine.


var businessNames = ["test", "test2", "test3"];

export default class Menu extends React.Component{

	constructor() {
		super();
    this.state = {
    	selectValue: businessNames[0],
    	startDate: null,
    	endDate: null
    };
  }

	handleDateChange(dateString, moment){
		console.log('stuff changed', arguments);
	}

	handleSelectChange(newState){
		var component = this;
		this.setState({selectValue: newState}, function(){
			console.log("new select value: ", component.state.selectValue, newState);		
		})
	}

	handleButtonClick(){
		this.props.onSearch(this.state.startDate, this.state.endDate, this.state.selectValue);
	}

	render(){
		return (
			<div>
				Start Date:
				<DatePicker
				  minDate='2014-04-04'
				  maxDate='2015-10-10'
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
				<BusinessSelect businessNames={businessNames} onChange={this.handleSelectChange.bind(this)}/>

				<button onClick={this.handleButtonClick.bind(this)}> Go </button>
			</div>
		)
	}
}
