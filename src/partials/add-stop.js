import React, { Component } from "react";
import Modal from "react-modal";
import "./add-stop.css";

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

class AddStop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stopId: "",
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

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
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
      this.props.addFavoriteStop(stopId, stopAlias);
      this.setState({
        stopId: "",
        stopAlias: "",
        modalIsOpen: false
      });
    }
  };

  render() {
    return (
      <div className="add-stop-container">
        <button className="round" onClick={this.openModal}>
          <span>+</span>
        </button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyles}
        >
          <div>Add stop to favorites</div>
          <form className="stop-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="stop-number">Stop number</label>
              <input
                id="stop-number"
                name="stopId"
                type="number"
                inputMode="numeric"
                min="0"
                pattern="[0-9]*"
                value={this.state.stopId}
                onChange={this.handleChange}
              />
            </div>
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
              <button>Add</button>
              <button onClick={this.closeModal}>Cancel</button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default AddStop;
