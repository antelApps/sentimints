import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import ReactFauxDom from 'react-faux-dom';


export default class AggregateChart extends React.Component{

  render() {
  	let elem = ReactFauxDom.createElement('div');

  	d3.select(elem)
  	  .selectAll('p')
  	  .data(['hi', 'hello'])
  	  .enter()
  	  .append('p')
  	  .text( txt => txt);

  	return elem.toReact();
  }

}