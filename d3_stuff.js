var d3 = require('d3');
var data;

var getData = function getData(){
    // returns dummy data
    //Go off and make new request normally 
    //for now dummy data
    return [
            {
              "group": "all",
              "num": 10,
              "sum": 2.3608252052960546,
              "avg": 0.23608252052960546,
              "min": -0.13203716163463514,
              "q1": 0.01601556915768002,
              "median": 0.17497405446439265,
              "q3": 0.4594126335653443,
              "max": 0.7176687736973063
            },
            { 
              "group": "positive",
              "num": 6,
              "sum": 2.4448491027100676,
              "avg": 0.4074748504516779,
              "min": 0.11573410495074422,
              "q1": 0.23421400397804107,
              "median": 0.4080505646407296,
              "q3": 0.5611310908025166,
              "max": 0.7176687736973063
            },
            {
              "group": "negative",
              "num": 1,
              "sum": -0.13203716163463514,
              "avg": -0.13203716163463514,
              "min": -0.13203716163463514,
              "q1": -0.13203716163463514,
              "median": -0.13203716163463514,
              "q3": -0.13203716163463514,
              "max": -0.13203716163463514
            }
          ]
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

        origData.forEach(function(stackItem){
            console.log('stackItem', stackItem)
            stackItem.size = Math.abs(stackItem.median);

            // If the value is negative, we want to place the bar under
            // the 0 line
            if (stackItem.median < 0)  {
                stackItem.y0 = baseNegative + 15;
                baseNegative -= stackItem.size;
                console.log('its neg', stackItem.y0)
            } else { 
                basePositive += stackItem.size;
                stackItem.y0 = basePositive;
            } 
        }) // loop through each stack
    }
    console.log('data', origData)
    return origData;
};

// Setup SVG
// --------------------------------------
var width = 500;
var height = 500;
var margin = 10;

var svg = d3.select('.otherGraph')
            .append('svg')
            .attr({
              width: width,
              height: height
            });


// Setup groups
var chartGroup = svg.append('g');
var xAxisGroup = svg.append('g').attr('class','axis x');
var yAxisGroup = svg.append('g').attr('class','axis y');


// Setup scales and axes
// --------------------------------------
var xScale;
var yScale;

var updateScales = function updateScales(){
    console.log(data);
    data.map(function(item){
        console.log(item);
    });
    // setup an ordinal scale for the x axis. The input domain will be the
    // types from the data (from the data)
    xScale = d3.scale.ordinal().domain(data.map(function(datum,i){
            // We'll always have at least element in the datum array
            console.log('datum', datum);
            return datum.group;
        }))
        .rangeRoundBands([margin, width - margin], 0.1);


    console.log(xScale('negative'))
    // Setup a linear scale for the y axis 
    yScale = d3.scale.linear().domain([
            // the min data should be the base y minus the size
            d3.min(data, function(d){ return d.min; }),
            // y0 will contain the highest value
            d3.max(data, function(d){ return d.max; })
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
        xScale('all'), 0 ] + ")").call(yAxis);
};

// Update bars
// --------------------------------------
var updateBars = function(){
    // This function is called to:
    // 1. initially create the stacked bars
    // 2. update stacked bars on all subsequent calls
    
    var color = d3.scale.category20c();

    // Setup groups
    var barGroups = chartGroup.selectAll('.barGroup').data(data, function(d){
        return d;
    });

    // create groups
    barGroups.enter().append('svg:g').attr({
        'class': 'barGroup'   
    });

    // secondly, setup the stacked groups
    var bars = barGroups.selectAll('.bar').data(data);

    // ** Enter **
    bars.enter().append('svg:rect')
        .classed('bar', true)
        .attr('width', xScale.rangeBand())
        .attr('x', function(d,i){
            // Pass in the index to the xScale
            console.log('x', xScale(d.group))
            return xScale(d.group);
        })
        .attr('y', function(d,i){
            console.log('y', yScale(d.y0));
            return yScale(d.y0);
        })
        .attr('height', function(d,i){
            console.log('height', (yScale(0) - yScale(d.y0)))
            return (yScale(0) - yScale(d.y0)) / 2;
        })
        .style('fill', function(d,i){
            return color(i);
        })
        .on('mouseenter', function(d){
        console.log('mouse', d);  
    });

    // ** Update **
    bars.transition().attr({
        width: xScale.rangeBand(),
        x: function(d,i){
            // Pass in the index to the xScale
            console.log(xScale(d.group))
            return xScale(d.group);
        },
        y: function(d,i){
            return yScale(d.y0);
        },
        height: function(d,i){
            return yScale(0) - yScale(d.y0);
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
