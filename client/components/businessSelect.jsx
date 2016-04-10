import React from "react"
import ReactDOM from "react-dom"

export default class BusinessSelect extends React.Component{

  handleChange(e){
    this.props.onChange(e.target.value);
  }

<<<<<<< cbd0624fe73cf244f0980d6fd1b837a49e2a0ae2
	render(){
		return (
			<div>
			  <select className="form-control" onChange={this.handleChange.bind(this)}>
			  	{this.props.businessNames.map(function(cur, index){
			  		return (<option key={index} value={cur}> {cur} </option>)
			  	})}
			  </select>
			</div>
		)
	}
}
=======
  render(){
    return (
      <div className="selectContainer businessSelect">
        <select className="form-control" onChange={this.handleChange.bind(this)}>
          {this.props.businessNames.map(function(cur, index){
            console.log('inside', cur, index)
            return (<option key={index} value={cur}> {cur} </option>)
          })}
        </select>
      </div>  
    )
  }
}
>>>>>>> basic styling started
