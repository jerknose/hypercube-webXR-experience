import React from 'react';
import { Row, Col, Jumbotron, Modal, Button } from 'react-bootstrap';

//Import top level files
import 'bootstrap/dist/css/bootstrap.css';
import styles from './Main.css';

import Scene from '../three/scene';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: true
    };
  }
  componentWillMount() {
    // initialize the threejs scene class
    this.setState({
      scene: new Scene(),
    });
  }
  componentDidMount() {
    // once the dom has mounted, initialize threejs
    this.state.scene.initScene();
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  render() {
    return (
      <div className="app">
        <div>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Hypercube XR - 2018</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>by Travis Bennett (<a href="https://www.travisbennett.com/" target="_blank">travisbennett.com</a>)</h5>
              <p>Disclaimer: Designed to run locally, hooked to a Kinect v2, and an Oculus Rift. It is provided as is, for posterity.</p>
              <p>Use number keys to switch between scenes. Use ` to reset project.</p>
              <p>Point controller to find hidden objecs within a scene. Pull trigger to select object.</p>
              <p>Be patient. This project loads several large files. Things may be slow and / or buggy.</p>
              <p><a href="https://travisbennett.com/all/hypercube-xr" target="_blank">More Info</a></p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div id="threeContainer" />
        <div id="statsBox" />
      </div>
    );
  }
}

export default Main;
