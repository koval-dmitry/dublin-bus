import React, { Component } from "react";
import "./settings.css";

class Settings extends Component {
  emptyStops() {
    return (
      <li>
        <div className="notification">No stops in favorites</div>
      </li>
    );
  }

  render() {
    return (
      <div className="settings">
        <ul>
          {this.props.myStops.length
            ? this.props.myStops.map(stop => {
                return (
                  <li key={stop}>
                    <div className="settings-stop-id">Stop no. {stop}</div>
                    <button
                      className="delete-stop"
                      onClick={() => this.props.removeStopFromFavorites(stop)}
                    >
                      Remove
                    </button>
                  </li>
                );
              })
            : this.emptyStops()}
        </ul>
      </div>
    );
  }
}

export default Settings;
