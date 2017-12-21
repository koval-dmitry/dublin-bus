import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import MyStops from './my-stops/my-stops';
import NearbyStops from './nearby-stops/nearby-stops';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: "my-stops"
    }
  }

  switchStopTab(e, newTab) {
    if (newTab !== this.state.activeTab ) {
      this.setState({
        activeTab: newTab,
      })
    }
  }

  renderStopTabs() {
    return (
      <header>
        <ul className="stops-tabs">
          <li className={this.state.activeTab === "my-stops" ? "active-tab" : null}>
            <Link
              to="/my-stops"
               onClick={(e) => this.switchStopTab(e, "my-stops")}
            >
              My stops
            </Link>
          </li>
          <li className={this.state.activeTab === "nearby-stops" ? "active-tab" : null}>
            <Link
              to="/nearby-stops"
               onClick={(e) => this.switchStopTab(e, "nearby-stops")}
            >
              Nearby
            </Link>
          </li>
        </ul>
      </header>
    )
  }

  render() {
    return (
      <Router>
        <div className="App">

          {this.renderStopTabs()}

          <Redirect exact from="/" to="/my-stops/" />
          <Route path="/my-stops" render={(props) => <MyStops {...props} />} />
          <Route path="/nearby-stops" render={(props) => <NearbyStops {...props} />} />

          <footer>Made in Rathfarnham with &hearts;</footer>
        </div>
      </Router>
    );
  }

}

export default App;