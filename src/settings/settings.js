import React, { Component } from "react";
import Modal from "react-modal";
import "./settings.css";

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    position: "absolute"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    color: "#fff",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "0",
    border: "none",
    backgroundColor: "#0b2027",
    boxShadow: "2px 4px 5px rgba(0, 0, 0, 0.5)"
  }
};

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stopAlias: "",
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement("body");
  }

  closeModal() {
    this.setState({
      stopId: "",
      stopAlias: "",
      modalIsOpen: false
    });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.stopId) {
      const stopId = this.state.stopId;
      const stopAlias = this.state.stopAlias.length
        ? this.state.stopAlias
        : "";
      this.props.editFavoriteStop(stopId, stopAlias);
      this.setState({
        stopId: "",
        stopAlias: "",
        modalIsOpen: false
      });
    }
  };

  openModal(stopId, stopAlias = "") {
    this.setState({
      stopId: stopId,
      stopAlias: stopAlias,
      modalIsOpen: true
    });
  }

  emptyStops() {
    return (
      <li>
        <div className="notification">No stops in favorites</div>
      </li>
    );
  }

  render() {
    return (
      <div className="settings">
        <ul>
          {this.props.myStops.length
            ? this.props.myStops.map(stop => {
                return (
                  <li key={stop.stopId}>
                    <div className="settings-stop-id">
                      Stop no. {stop.stopId} | {stop.stopAlias}
                    </div>
                    <button
                      onClick={() =>
                        this.openModal(stop.stopId, stop.stopAlias)
                      }
                    >
                      Edit name
                    </button>
                    <button
                      onClick={() =>
                        this.props.removeStopFromFavorites(stop.stopId)
                      }
                    >
                      Remove
                    </button>
                  </li>
                );
              })
            : this.emptyStops()}
        </ul>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyles}
        >
          <div>Edit stop alias</div>
          <form className="stop-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="stop-alias">Stop alias (optional)</label>
              <input
                id="stop-alias"
                name="stopAlias"
                value={this.state.stopAlias}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <button>Update</button>
              <button onClick={this.closeModal}>Cancel</button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default Settings;
