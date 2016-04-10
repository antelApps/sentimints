import React from "react";
import ReactDOM from "react-dom";

import AggChart from './aggChart.jsx';

export default class Chartbucket extends React.Component {

	constructor() {
		super();
		this.state = {
			aggregate_active: 'active',
			postive_active: 'inactive',
			negative_active: 'inactive',
			hot_active: 'inactive'
		}
	}

  	handleClick(type) {
		let relevantStates = ['aggregate_active', 'postive_active', 'negative_active', 'hot_active'];
		let active = relevantStates.filter( state => this.state[state] === 'active')[0]
		console.log('actiive is', active);
		if (active !== type + '_active') { //need to change which is active
			let inactiveOld = {};
			inactiveOld[active] = 'inactive';
			this.setState(inactiveOld);

			let activateNew = {};
			activateNew[type + '_active'] = 'active';
			this.setState(activateNew);
		}
		// let state
		// this.setState(type + '_active', 'active');
		// console.log('state is', this.state)
	}

  render() {
  	return ( 
  	<div> Chartbucket!!!
	  	<div className="view-options">
	  	  <button onClick={this.handleClick.bind(this, 'aggregate')}>Aggregate</button>
	  	  <button onClick={this.handleClick.bind(this, 'positive')}>Consumers Love These</button>
	  	  <button onClick={this.handleClick.bind(this, 'negative')}>Consumers Hate These</button>
	  	  <button onClick={this.handleClick.bind(this, 'hot')}>Most Mentioned</button>
	  	</div>

	  	<div className="view-frame">
	  	  <AggChart className={this.state.aggregate_active} width={180} height={60} data={[10, 16, 5, 22, 3, 11]} />
	  	  <div className={this.state.positive_active}>Insert positives</div>
	  	  <div className={this.state.negative}>Insert negatives</div>
	  	  <div className={this.state.hot}>Insert most populer</div>

	  	</div>
  	</div>
    )
  }


  //toggles which chart is visible


}