import React from "react"
import ReactDOM from "react-dom";

import Menu from "./menu.jsx"
import Navbar from "./navbar.jsx"
// import Results from "./results.jsx"
import UserActions from '../actions/userActions.jsx'

class App extends React.Component {

  constructor() {
    super();
    this.state = {selectValue: null};
  }

  handleSearch(startDate, endDate, business, star){
    console.log("handleSearch args", arguments)

    //ajax call to server
  }

	render() {
		return (
			<div>
			  <Navbar/>
				<Menu onSearch={this.handleSearch.bind(this)}/>
        {/* Footer with powered by __ */}
      </div>
    )
  }
}

	// <Results/>
ReactDOM.render(<App/>, document.getElementById('app'));
