import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import ReactFauxDom from 'react-faux-dom';


export default class AggregateChart extends React.Component{

  render() {
  	let faux = ReactFauxDom.createElement('svg');
    // let svg = d3.select(faux).append('svg');

    var getData = function getData(){
        // returns dummy data
        return [
            [
                { 
                    value: -100 + Math.random() * 200,
                    name: 'a1',
                    group: 'a'
                },
                { 
                    value: -100 + Math.random() * 200,
                    name: 'a2',
                    group: 'a'
                },
                { 
                    value: -100 + Math.random() * 200,
                    name: 'a3',
                    group: 'a'
                }
            ], [
                { 
                    value: -100 + Math.random() * 200,
                    name: 'b1',
                    group: 'b'
                },
                { 
                    value: -100 + Math.random() * 200,
                    name: 'b2',
                    group: 'b'
                }
            ], [
                { 
                    value: -100 + Math.random() * 200,
                    name: 'c1',
                    group: 'c'
                },
                { 
                    value: -100 + Math.random() * 200,
                    name: 'c2',
                    group: 'c'
                }
            ]
        ];
    };

    var setupStack = function setupStack(origData){
        // setup some variables
        var len = origData.length;
        var i=0; j=0, d=null;
        var basePositive=0, baseNegative=0;

        for(i=0;i<len;i++){ // loop through each stacked group
            // reset bases for each new group
            basePositive = 0;
            baseNegative = 0;

            for(j=0; j<origData[i].length; j++){ // loop through each stack
                stackItem = origData[i][j];
                stackItem.size = Math.abs(stackItem.value);

                // If the value is negative, we want to place the bar under
                // the 0 line
                if (stackItem.value < 0)  {
                    stackItem.y0 = baseNegative;
                    baseNegative -= stackItem.size;
                } else { 
                    basePositive += stackItem.size;
                    stackItem.y0 = basePositive;
                } 
            }
        }

        return origData;
    };

    // Setup SVG
    // --------------------------------------
    var width = 500;
    var height = 500;
    var margin = 10;

    var svg = d3.select('svg').attr({
        width: width,
        height: height
    });
    var data;

    // Setup groups
    var chartGroup = svg.append('g');
    var xAxisGroup = svg.append('g').attr('class','axis x');
    var yAxisGroup = svg.append('g').attr('class','axis y');


    // Setup scales and axes
    // --------------------------------------
    var xScale;
    var yScale;

    var updateScales = function updateScales(){
        // setup an ordinal scale for the x axis. The input domain will be an
        // array of group names (from the data)
        xScale = d3.scale.ordinal().domain(data.map(function(datum,i){
                // We'll always have at least element in the datum array
                return datum[0].group;
            }))
            .rangeRoundBands([margin, width - margin], 0.1);

        // Setup a linear scale for the y axis 
        var merged = d3.merge(data);
        yScale = d3.scale.linear().domain([
                // the min data should be the base y minus the size
                d3.min(merged, function(d){ return d.y0-d.size; }),
                // y0 will contain the highest value
                d3.max(merged, function(d){ return d.y0; })
            ])
            .range([height - margin, margin])
            // nice it so we get nice round values
            .nice();
    };

    var updateAxis = function(){
        // Update the x and y axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .tickSize(6, 0);

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

        // use the axes group defined above
        xAxisGroup.transition().attr("transform","translate (" + [
            0, yScale(0) ] + ")").call(xAxis);
        yAxisGroup.transition().attr("transform","translate (" + [
            xScale(margin), 0 ] + ")").call(yAxis);
    };

    // Update bars
    // --------------------------------------
    var updateBars = function(){
        // This function is called to:
        // 1. initially create the stacked bars
        // 2. update stacked bars on all subsequent calls
        
        var color = d3.scale.category20c();

        // Setup groups
        var barGroups = chartGroup.selectAll('.barGroup').data(data);

        // create groups
        barGroups.enter().append('svg:g').attr({
            'class': 'barGroup'   
        });

        // secondly, setup the stacked groups
        var bars = barGroups.selectAll('.bar').data(function(d){ 
            return d;
        });

        // ** Enter **
        bars.enter().append('svg:rect').attr({
            'class': 'bar',
            width: xScale.rangeBand(),
            x: function(d,i){
                // Pass in the index to the xScale
                return xScale(d.group);
            },
            y: function(d,i){
                return yScale(d.y0);
            },
            height: function(d,i){
                return (yScale(0) - yScale(d.size)) / 2;
            }
        }).style({
            fill: function(d,i){
                return color(i);
            }
        }).on('mouseenter', function(d){
            console.log(d);  
        });

        // ** Update **
        bars.transition().attr({
            width: xScale.rangeBand(),
            x: function(d,i){
                // Pass in the index to the xScale
                return xScale(d.group);
            },
            y: function(d,i){
                return yScale(d.y0);
            },
            height: function(d,i){
                return yScale(0) - yScale(d.size);
            }
        });


        return bars;
    };

    // --------------------------------------
    // Update / Draw Chart
    // --------------------------------------
    var updateChart = function updateChart(){
        // This will draw (first time called) or update the chart (all calls after)
        
        // get some random data
        data = getData();
        //format it for the stacked chart
        data = setupStack(data);

        // Update all parts of the chart
        updateScales();

        updateAxis();

        // Update bars
        updateBars();
        
    };

    // Kick it off
    updateChart();

    // further calls will update it
    setInterval(function(){ updateChart(); }, 2000);



  	return faux.toReact();
  }

}