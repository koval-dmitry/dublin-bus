import React, { Component } from 'react';
import Stop from "../stop/stop";
import './my-stops.css';


class MyStops extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myStops: [1328, 1306, 1329, 1331]
        }
    }

    emptyStops() {
        return <p>add some stops</p>
    }

    render() {
        return (
            <div className="results-list">
                <ul>
                    {this.state.myStops.length ? this.state.myStops.map((stop) => {
                        return <Stop stopNumber={stop} />;
                    }) : this.emptyStops()}
                </ul>
                <button><span>+</span></button>
            </div>
        )
    }
}

export default MyStops