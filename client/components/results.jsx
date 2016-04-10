// import React from "react"
// import ReactDOM from "react-dom"
// import ReactFauxDOM from ""

var d3 = require('d3')
var React = require('react')
var ReactFauxDOM = require('react-faux-dom')

export default class Results extends React.Component{
  render() {
  	
			d3.tsv('./data.tsv', function (error, data) {
	  		if (error) throw error
		  	
		    data.forEach(function (d) {
		      d.date = parseDate(d.date)
		      d.close = +d.close
		    })

		    return node.toReact()
			})

  }
}

