import React from "react";
import ReactDOM from "react-dom";

import AggChart from './aggChart.jsx';
import PosChart from './posChart.jsx';
import NegChart from './negChart.jsx';
import TopChart from './topChart.jsx';


export default class Chartbucket extends React.Component {

	constructor() {
		super();
		this.state = {
			aggregate_active: 'active',
			positive_active: 'inactive',
			negative_active: 'inactive',
			hot_active: 'inactive'
		}
	}

  	handleClick(type) {
		let relevantStates = ['aggregate_active', 'positive_active', 'negative_active', 'hot_active'];
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
	}

  render() {
  	return ( 
  	<div className="chartbucket"> 
	  	<div className="view-options">
	  	  <button className="view-btn" onClick={this.handleClick.bind(this, 'aggregate')}>Aggregate</button>
	  	  <button className="view-btn" onClick={this.handleClick.bind(this, 'positive')}>Consumers Love These</button>
	  	  <button className="view-btn" onClick={this.handleClick.bind(this, 'negative')}>Consumers Hate These</button>
	  	  <button className="view-btn" onClick={this.handleClick.bind(this, 'hot')}>Most Mentioned</button>
	  	</div>
  		<h4>{this.props.title}</h4>

	  	<div className="view-frame">
	  	  <AggChart className={this.state.aggregate_active} width={180} height={60} data={[10, 16, 5, 22, 3, 11]} />
	  	  <PosChart className={this.state.positive_active} />
	  	  <NegChart className={this.state.negative_active} />
	  	  <TopChart className={this.state.hot_active} />
	  	</div>
  	</div>
    )
  }


  //toggles which chart is visible


}