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
	  	  <button className={this.state.aggregate_active === 'active' ? "view-btn btn-primary" : "view-btn"} onClick={this.handleClick.bind(this, 'aggregate')}>Aggregate</button>
	  	  <button className={this.state.positive_active === 'active' ? "view-btn btn-primary" : "view-btn"} onClick={this.handleClick.bind(this, 'positive')}>Consumers Love These</button>
	  	  <button className={this.state.negative_active === 'active' ? "view-btn btn-primary" : "view-btn"} onClick={this.handleClick.bind(this, 'negative')}>Consumers Hate These</button>
	  	  <button className={this.state.hot_active === 'active' ? "view-btn btn-primary" : "view-btn"} onClick={this.handleClick.bind(this, 'hot')}>Most Mentioned</button>
	  	</div>
  		<h4>{this.props.title}</h4>

	  	<div className="view-frame">
<<<<<<< 81568d08bc961ad6a8434362d21772997c6c7968
        <div className="content">
	  	  {this.state.aggregate_active === 'active' ? <AggChart className={this.state.aggregate_active} width={180} height={60} data={[10, 16, 5, 22, 3, 11]} /> : null}
	  	  {this.state.positive_active === 'active' ? <PosChart className={this.state.positive_active} /> : null}
	  	  {this.state.negative_active === 'active' ? <NegChart className={this.state.negative_active} /> : null}
	  	  {this.state.hot_active === 'active' ? <TopChart className={this.state.hot_active} /> : null}
        </div>
=======
	  	  <AggChart className={this.state.aggregate_active} data={[]} />
	  	  <PosChart className={this.state.positive_active} />
	  	  <NegChart className={this.state.negative_active} />
	  	  <TopChart className={this.state.hot_active} />
>>>>>>> d3 chart works
	  	</div>
  	</div>
    )
  }


  //toggles which chart is visible


}