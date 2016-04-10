import React from "react"
import ReactDOM from "react-dom";

export default class Spinner extends React.Componet {

	render() {
		return (
			<div classNames="spinner">
			  <img src="../public/spinner.gif">
			</div>
		)
	}
}