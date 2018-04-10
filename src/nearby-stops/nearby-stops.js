import React, { Component } from "react";
import Stop from "../stop/stop";
import pluralize from "pluralize";
import "./nearby-stops.css";

class NearbyStops extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locating: false,
      stopData: { results: [] }
    };

    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.getStopsAroundMe = this.getStopsAroundMe.bind(this);
  }

  getStopsAroundMe(lat, lon) {
    const apiEndpoint = "https://data.smartdublin.ie/cgi-bin/rtpi/";
    const lat1 = lat + 0.0015;
    const lat2 = lat - 0.0015;
    const lon1 = lon - 0.0025;
    const lon2 = lon + 0.0025;
    const stopsAroundMeRequest =
      apiEndpoint +
      `BusStopInformationLL?format=json&latitude1=${lat1.toFixed(6)}&latitude2=${lat2.toFixed(6)}&longitude1=${lon1.toFixed(6)}&longitude2=${lon2.toFixed(6)}`;

    fetch(stopsAroundMeRequest)
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed");
        }
        return response;
      })
      .then(data => data.json())
      .then(data => {
        this.setState({ stopData: data });
      });
  }

  getCurrentPosition() {
    this.setState({ locating: true, stopData: { results: [] } });
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.getStopsAroundMe(
          position.coords.latitude,
          position.coords.longitude
        );
        this.setState({ locating: false });
      });
    } else {
      alert("Geolocation not available");
    }
  }

  render() {
    const buttonText = this.state.stopData.results.length
      ? "Refresh"
      : "Find stops around me";

    return (
      <div className="results-list">
        <button
          onClick={this.getCurrentPosition}
          className="locate-button"
          disabled={this.state.locating}
        >
          {this.state.locating ? "Locating" : buttonText}
        </button>

        <ul>
          {this.state.stopData.results.length
            ? this.state.stopData.results.map(stop => {
                const arrLen = stop.operators[0].routes.length;
                let routes = ` | ${pluralize(
                  "Route",
                  stop.operators[0].routes.length,
                  false
                )} `;
                stop.operators[0].routes.map((bus, i) => {
                  if (arrLen === i + 1) {
                    routes += bus;
                  } else {
                    routes += `${bus}, `;
                  }
                  return routes;
                });
                return (
                  <Stop
                    key={stop.stopid}
                    alias={stop.fullname + routes}
                    stopId={stop.stopid}
                  />
                );
              })
            : null}
        </ul>
      </div>
    );
  }
}

export default NearbyStops;
