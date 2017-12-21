import React, { Component } from 'react';
import Spinner from './Spinner';
import Bus from './Bus';
import './Data.css';


const server = 'https://data.dublinked.ie/';
const request = 'cgi-bin/rtpi/realtimebusinformation?stopid=';
const format = '&format=json'

const urlForStopNumber = stopNumber =>
  server + request + stopNumber + format

class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requestFailed: false
    }
  }

  componentDidMount() {
    fetch(urlForStopNumber(this.props.match.params.stopID))
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed")
        }
        return response
      })
      .then(data => data.json())
      .then(data => {
        this.setState({
          stopData: data
        })
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      stopData: null
    });
    fetch(urlForStopNumber(nextProps.match.params.stopID))
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed")
        }
        return response
      })
      .then(data => data.json())
      .then(data => {
        this.setState({
          stopData: data
        })
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
  }

  renderEmptyResults() {
    return <p className="loading">No buses found</p>
  }

	render() {
    console.log(this.state.stopData)
        if (this.state.requestFailed) return <p className="loading">Request failed</p>
        if (!this.state.stopData) return <Spinner />
    return (
			<div className="scheduled-routes">
				<ul className="results-list">
					{this.state.stopData.results.length ? this.state.stopData.results.map((bus, index) => {
            return <Bus
              routeNumber={bus.route}
              destination={bus.destination}
              dueTime={bus.duetime}
              key={index}
            />;
          }) : this.renderEmptyResults()}
				</ul>
			</div>
		)
	}

}

export default Data