import React, { Component } from "react";
import NextBus from "../bus/next-bus";
import Bus from "../bus/bus";
import Spinner from "../partials/spinner";
import "./stop.css";

const server = "https://data.smartdublin.ie/";
const request = "cgi-bin/rtpi/realtimebusinformation?stopid=";

const urlForStopNumber = stopNumber => server + request + stopNumber;

class Stop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showStopPanel: false,
      requestFailed: false
    };
    this.toggleStopPanel = this.toggleStopPanel.bind(this);
  }

  fetchDataByStop() {
    fetch(urlForStopNumber(this.props.stopData.stopId))
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed");
        }
        return response;
      })
      .then(data => data.json())
      .then(
        data => {
          this.setState({ stopData: data, nextBusData: data.results.shift() });
        },
        () => {
          this.setState({ requestFailed: true });
        }
      );
  }

  componentDidMount() {
    this.fetchDataByStop();
    this.apiCallInterval = setInterval(() => this.fetchDataByStop(), 20000);
  }

  componentWillUnmount() {
    clearInterval(this.apiCallInterval);
  }

  returnStopComment() {
    if (this.props.stopData.stopAlias !== null) {
      return (
        <div className="stop-comment">{this.props.stopData.stopAlias}</div>
      );
    }
  }

  renderEmptyResults() {
    return <p className="loading">No buses found</p>;
  }

  toggleStopPanel() {
    this.setState({
      showStopPanel: !this.state.showStopPanel
    });
  }

  renderStopPanel() {
    if (this.state.showStopPanel) {
      return (
        <div className="stop-panel">
          <div className="stop-panel-label">
            Next
            <span>routes</span>
          </div>
          <div className="stop-panel-results">
            {this.state.stopData.results.length
              ? this.state.stopData.results.map((bus, index) => {
                  return <Bus busData={bus} key={index} />;
                })
              : this.renderEmptyResults()}
          </div>
        </div>
      );
    }
  }

  render() {
    if (this.state.requestFailed)
      return <p className="loading">Request failed</p>;
    if (!this.state.stopData) {
      return (
        <li className="loading">
          {this.returnStopComment()}
          <div className="stop-tile">
            <div className="stop-id">
              <span>Stop no.</span>
              {this.props.stopData.stopId}
            </div>
            <Spinner />
          </div>
        </li>
      );
    }
    if (this.state.stopData.errorcode === "1") {
      return (
        <li className="loading">
          {this.returnStopComment()}
          <div className="stop-tile">
            <div className="stop-id">
              <span>Stop no.</span>
              {this.props.stopData.stopId}
            </div>
            <div className="no-results">No results</div>
          </div>
        </li>
      );
    }
    return (
      <li>
        {this.returnStopComment()}
        <NextBus
          toggleStopPanel={this.toggleStopPanel}
          nextBusData={this.state.nextBusData}
          stopNumber={this.props.stopData.stopId}
        />
        {this.renderStopPanel()}
      </li>
    );
  }
}

export default Stop;
