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
      current: null,
      best_active: 'active',
      worst_active: 'inactive',
      hot_active: 'inactive'
    }
	}

  	handleClick(type) {
      this.setState({current: this.props.data_topical[type]});
		let relevantStates = ['best_active', 'worst_active', 'hot_active'];
		let active = relevantStates.filter( state => this.state[state] === 'active')[0]
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
    console.log('topical', this.props)
    if (this.state.current === null) {
      this.state.current = this.props.data_topical.best;
    }
  	return ( 
  	<div className="chartbucket"> 
	  	<div className="view-options">
	  	  <button className={this.state.best_active === 'active' ? "view-btn btn-primary" : "view-btn"} onClick={this.handleClick.bind(this, 'best')}>Consumers Love These</button>
	  	  <button className={this.state.worst_active === 'active' ? "view-btn btn-primary" : "view-btn"} onClick={this.handleClick.bind(this, 'worst')}>Consumers Hate These</button>
	  	  <button className={this.state.hot_active === 'active' ? "view-btn btn-primary" : "view-btn"} onClick={this.handleClick.bind(this, 'hot')}>Most Mentioned</button>
	  	</div>
  		<h4>{this.props.title}</h4>

	  	<div className="view-frame">
	  	  <OtherCharts className={'best ' + this.state.positive_active} data={this.state.current}/>
	  	</div>
  	</div>
    )
  }


  //toggles which chart is visible
        // <AggChart className={this.state.aggregate_active} data={this.props.data_aggregate}/>


}

/**/


class OtherCharts extends React.Component {

  render() {
    let mapped = this.props.data.map(function(topic){
      return <AggChart data={topic}/>
    })
    return (
      <div>
        {mapped}
      </div>
    )
  }
}




