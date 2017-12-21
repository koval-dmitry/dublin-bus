import React, { Component } from 'react';
import './bus.css';


class Bus extends Component {
    render() {
        return (
            <div className="stop-panel-row">
                <div className="bus-route-number">
                    {this.props.busData.route}
                </div>
                <div className="bus-destination">
                    {this.props.busData.destination}
                </div>
                <div className="bus-duetime">
                    {this.props.busData.duetime}
                    {this.props.busData.route != "Due" ? <span>min</span> : null}
                </div>
            </div>
        )
    }
}

export default Bus