import React from 'react';
import ReactFauxDom from 'react-faux-dom';
let d3 = require('d3');

export default class AggregateChart extends React.Component{

  render () {
    const {width, height, data, interpolation} = this.props

    const el = d3.select(ReactFauxDom.createElement('svg'))
      .attr(this.props)
      .attr('data', null)

    const x = d3.scale.linear()
      .range([0, width])
      .domain(d3.extent(data, (d, i) => i))

    const y = d3.scale.linear()
      .range([height, 0])
      .domain(d3.extent(data, (d) => d))

    const line = d3.svg.line()
      .x((d, i) => x(i))
      .y((d) => y(d))
      .interpolate(interpolation)

    el.append('path')
      .datum(data)
      .attr({
        key: 'sparkline',
        className: 'sparkline',
        d: line
      })

    return el.node().toReact()
  }

}