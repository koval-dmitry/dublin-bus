import React, { Component } from "react";
import "./add-stop.css";

class AddStop extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.addFavoriteStop(this.state.value);
    this.setState({ value: "" });
  };

  render() {
    return (
      <div>
        <button className="add-stop">
          <span>+</span>
        </button>
        <form onSubmit={this.handleSubmit}>
          <input
            type="number"
            inputMode="numeric"
            min="0"
            pattern="[0-9]*"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default AddStop;
