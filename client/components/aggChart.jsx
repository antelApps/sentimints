import React from 'react';
import ReactFauxDom from 'react-faux-dom';
import d3 from 'd3';

export default class AggregateChart extends React.Component{

  render () {

    var data = [[5,3], [10,17], [15,4], [2,8]];
   
    var margin = {top: 20, right: 15, bottom: 60, left: 7},
      width = 800 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;
    
    var x = d3.scale.linear()
              .domain([-100, 100])
              .range([ 0, width ]);
    

    // d3.max(data, function(d) { return d[0]; })
    var y = d3.scale.linear()
            .domain([0, 0])
            .range([0, 0 ]);
 
    var chart = d3.select(ReactFauxDom.createElement('svg'))
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .attr('class', 'chart')

      var main = chart.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'main')   
          
      // draw the x axis
      var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

      main.append('g')
    .attr('transform', 'translate(' + margin.left +', 0)')
    .classed('main axis date', true)
    .call(xAxis);

      // draw the y axis
      var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left');

      main.append('g')
    .attr('transform', 'translate(0,0)')
    .classed('main axis date', true)
    .call(yAxis);

    var g = main.append("svg:g"); 
    
    g.selectAll("scatter-dots")
      .data(data)
      .enter().append("svg:circle")
        .attr("cx", function (d,i) { return x(d[0]); } )
        .attr("cy", function (d) { return y(d[1]); } )
        .attr("r", 8);

    return chart.node().toReact();
  }
}