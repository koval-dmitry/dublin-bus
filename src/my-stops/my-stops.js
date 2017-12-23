import React, { Component } from 'react';
import Stop from "../stop/stop";
import './my-stops.css';


class MyStops extends Component {

    emptyStops() {
        return (
            <li>
                <div className="notification">
                    You need to add some stops to favorites
                </div>
            </li>
        )
    }

    render() {
        return (
            <div className="results-list">
                <ul>
                    {this.props.myStops.length ? this.props.myStops.map((stop) => {
                        return (
                            <Stop
                                key={stop}
                                stopNumber={stop}
                            />
                        )
                    }) : this.emptyStops()}
                </ul>
                <button className="add-stop" onClick={this.props.addFavoriteStop}><span>+</span></button>
            </div>
        )
    }
}

export default MyStops