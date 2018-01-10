import React, { Component } from "react";
import Header from "./partials/header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MyStops from "./my-stops/my-stops";
import AddStop from "./my-stops/add-stop.js";
import NearbyStops from "./nearby-stops/nearby-stops";
import Settings from "./settings/settings";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myStops: []
    };

    this.addFavoriteStop = this.addFavoriteStop.bind(this);
    this.removeStopFromFavorites = this.removeStopFromFavorites.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("myStops") !== null) {
      const storedStops = JSON.parse(localStorage.getItem("myStops"));
      this.setState({
        myStops: storedStops
      });
    }
  }

  addFavoriteStop(inputStop) {
    if (inputStop !== null) {
      // update state
      let favoriteStops = this.state.myStops;
      favoriteStops.push(inputStop);
      this.setState({
        myStops: favoriteStops
      });

      // update localStorage
      if (localStorage.getItem("myStops") === null) {
        let storedStops = [];
        storedStops.push(inputStop);
        localStorage.setItem("myStops", JSON.stringify(storedStops));
      } else {
        let storedStops = JSON.parse(localStorage.getItem("myStops"));
        storedStops.push(inputStop);
        localStorage.setItem("myStops", JSON.stringify(storedStops));
      }
    }
  }

  removeStopFromFavorites(stopID) {
    //update state
    const oldFavoriteStops = this.state.myStops;
    const newFavoriteStops = oldFavoriteStops.filter(a => a !== stopID);
    this.setState({
      myStops: newFavoriteStops
    });

    //update localStorage
    const oldStoredStops = JSON.parse(localStorage.getItem("myStops"));
    const newStoredStops = oldStoredStops.filter(a => a !== stopID);
    localStorage.setItem("myStops", JSON.stringify(newStoredStops));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <Route
            exact
            path="/"
            render={() => (
              <div>
                <MyStops myStops={this.state.myStops} />
                <AddStop addFavoriteStop={this.addFavoriteStop} />
              </div>
            )}
          />
          <Route exact path="/nearby-stops" render={() => <NearbyStops />} />
          <Route
            exact
            path="/settings"
            render={() => (
              <Settings
                myStops={this.state.myStops}
                removeStopFromFavorites={this.removeStopFromFavorites}
              />
            )}
          />

          <footer>Made in Rathfarnham with &hearts;</footer>
        </div>
      </Router>
    );
  }
}

export default App;
