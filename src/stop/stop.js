import React, { Component } from 'react';
import NextBus from "../bus/next-bus";
import Bus from "../bus/bus";
import './stop.css';


const server = 'https://data.dublinked.ie/';
const request = 'cgi-bin/rtpi/realtimebusinformation?stopid=';
const format = '&format=json'

const urlForStopNumber = stopNumber =>
    server + request + stopNumber + format

class Stop extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showStopPanel: false,
            requestFailed: false
        }
    }

    componentDidMount() {
        fetch(urlForStopNumber(this.props.stopNumber))
            .then(response => {
                if (!response.ok) {
                    throw Error("Network request failed")
                }
                return response
            })
            .then(data => data.json())
            .then(data => {
                this.setState({
                    stopData: data,
                    nextBusData: data.results.shift()
                });
            }, () => {
                this.setState({
                    requestFailed: true
                })
            })
    }

    renderEmptyResults() {
        return <p className="loading">No buses found</p>
    }

    toggleStopPanel(e) {
        this.setState({showStopPanel: !this.state.showStopPanel})
    }

    renderStopPanel() {
        if (this.state.showStopPanel) {
            return (
                <div className="stop-panel">
                    <div className="stop-panel-label">Next <span>routes</span></div>
                    <div className="stop-panel-results">
                        {this.state.stopData.results.length ? this.state.stopData.results.map((bus, index) => {
                            return <Bus
                                busData={bus}
                                key={index}
                            />;
                        }) : this.renderEmptyResults()}
                    </div>
                </div>
            )
        }
    }

    render() {
        if (this.state.requestFailed) return <p className="loading">Request failed</p>
        if (!this.state.stopData) return <li className="loading">Loading...</li>
        return (
            <li>
                <NextBus
                    toggleStopPanel={this.toggleStopPanel.bind(this)}
                    nextBusData={this.state.nextBusData}
                    stopNumber={this.props.stopNumber}
                />
                {this.renderStopPanel()}
            </li>
        )
    }
}

export default Stop