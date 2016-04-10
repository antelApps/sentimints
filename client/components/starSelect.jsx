import React from "react"
import ReactDOM from "react-dom"

export default class StarSelect extends React.Component{

	handleChange(e){
		this.props.onChange(e.target.value);
	}

	render(){
		return (
      <div className="selectContainer starSelect">
			  <select className="form-control" onChange={this.handleChange.bind(this)}>
			  	{['-- Select a Rating --', 1,2,3,4,5].map(function(cur, index){
			  		return (<option key={index} value={cur}> {cur} </option>)
			  	})}
			  </select>
			</div>	
		)
	}
}