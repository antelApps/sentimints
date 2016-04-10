import React from 'react';
import ReactFauxDom from 'react-faux-dom';
import d3 from 'd3';

export default class AggregateChart extends React.Component{

  render () {


var data =  { topic: 'bed', stats: 
    [ { name: 'bed_num', value: 2, group: 'best' },
      { name: 'bed_sum', value: 0.10598629929273662, group: 'best' },
      { name: 'bed_avg', value: 0.05299314964636831, group: 'best' },
      { name: 'bed_min', value: -0.7176687736973063, group: 'best' },
      { name: 'bed_q1', value: -0.7176687736973063, group: 'best' },
      { name: 'bed_median', value: 0.05299314964636831, group: 'best' },
      { name: 'bed_q3', value: 0.8236550729900429, group: 'best' },
      { name: 'bed_max', value: 0.8236550729900429, group: 'best' } 
    ] 
   };

var sampleSize = data.stats.shift();
var topic = data.topic;
//first forEach topic subarray stats
//this is just the for each on render


//then each dot is a name and Value pair thing sorted by group


    // var data = [[5,3], [10,17], [15,4], [2,8]];
    var margin = {top: 20, right: 15, bottom: 60, left: 7},
      width = 800 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;
    
    var x = d3.scale.linear()
              .domain([-100, 100])
              .range([ 0, width ]);
    

    //and ordinal scale that is by name

    // d3.max(data, function(d) { return d[0]; })
    var y = d3.scale.ordinal()
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
    .orient('left')
    .append('text')
    .text(topic);

  main.append('g')
    .attr('transform', 'translate(0,0)')
    .classed('main axis date', true)
    .call(yAxis);

    var g = main.append("svg:g"); 
    console.log('i am a console.log')
    g.selectAll("scatter-dots")
      .data(data.stats)
      .enter().append("svg:circle")
        .attr("cx", function (d,i) { 
          console.log('cx', x(d.value))
          return x(d.value * 100); } )
        .attr("cy", function (d) { 
          console.log('cy', y(d.name))
          return y(d.name); } )
        .attr("r", 8);

    return chart.node().toReact();
  }
}