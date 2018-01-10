import React, { Component } from "react";
import "./next-bus.css";

class NextBus extends Component {
  render() {
    return (
      <div className="stop-tile" onClick={e => this.props.toggleStopPanel()}>
        <div className="stop-id">
          <span>Stop no.</span>
          {this.props.stopNumber}
        </div>
        <div className="next-bus-route-number">
          {this.props.nextBusData.route}
        </div>
        <div className="next-bus-destination">
          {this.props.nextBusData.destination}
        </div>
        <div className="next-bus-duetime">
          {this.props.nextBusData.duetime}
          {this.props.nextBusData.duetime !== "Due" ? <span>min</span> : null}
        </div>
      </div>
    );
  }
}

export default NextBus;
