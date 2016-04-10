import React from "react"
import ReactDOM from "react-dom"

export default class BusinessSelect extends React.Component{

  handleChange(e){
    this.props.onChange(e.target.value);
  }

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