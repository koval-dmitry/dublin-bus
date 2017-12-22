import React, { Component } from 'react';
import Stop from "../stop/stop";
import './my-stops.css';


    // [
    //     {
    //         "stopID":"1328",
    //         "label":"Grange Road to center"
    //     },
    //     {
    //         "stopID":"1306",
    //         "label":"Nutgrove avenue to East"
    //     },
    //     {
    //         "stopID":"1329",
    //         "label":"St Mary's Boys School"
    //     },
    //     {
    //         "stopID":"1331",
    //         "label":"Rathfarnham to center"
    //     }
    // ]

class MyStops extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myStops: []
        }
    }

    componentDidMount() {
        if (localStorage.getItem("myStops") !== null) {
            const storedStops = JSON.parse(localStorage.getItem("myStops"));
            this.setState({
                myStops: storedStops
            });
        }
    }

    addFavoriteStop() {
        // ask stop number
        const inputStop = prompt("Enter stop number");

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
            localStorage.setItem("myStops", JSON.stringify(storedStops))
        }
    }

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
                    {this.state.myStops.length ? this.state.myStops.map((stop) => {
                        return <Stop
                            key={stop}
                            stopNumber={stop} />;
                    }) : this.emptyStops()}
                </ul>
                <button onClick={this.addFavoriteStop.bind(this)}><span>+</span></button>
            </div>
        )
    }
}

export default MyStops