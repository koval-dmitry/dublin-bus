import React, { Component } from "react";
import Stop from "../stop/stop";
import "./my-stops.css";

class MyStops extends Component {
  emptyStops() {
    return (
      <li>
        <div className="notification">
          You can add some stops to favorites
        </div>
      </li>
    );
  }

  render() {
    return (
      <ul>
        {this.props.myStops.length
          ? this.props.myStops.map(stop => {
              return (
                <Stop
                  key={stop.stopId}
                  alias={stop.stopAlias}
                  stopId={stop.stopId}
                />
              );
            })
          : this.emptyStops()}
      </ul>
    );
  }
}

export default MyStops;
