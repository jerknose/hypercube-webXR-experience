import Utils from '../../utils';
import Hypercube from '../hypercube';

import KinectTransport from '../../inputs/KinectTransport';
import DepthDisplay from './DepthDisplay';

class InteractiveObject {
  constructor(parent, objProps, enabled) {
    this.props = objProps;
    this.parent = parent;
    this.enabled = this.enabled;

    this.object = new THREE.Object3D();
    this.highObject = null;

    this.name = this.props.type;

    this.utils = new Utils();

    switch (this.props.type) {
      default:
        console.log(this.props.type, ' not found');
        return false;
        break;
      case 'kinect':
        this.initKinectTransport(this.props);
        break;
      case 'violin':
      case 'mandolin':
      case 'flute':
      case 'sword':
      case 'gun':
      case 'axe':
        this.loadGltfObject(this.props);
        break;
      case 'cube':
        this.addHypercube(this.props);
        break;
    }
  }

  addHypercube(props) { // Add assets to scene
    this.hc = new Hypercube(props.active);

    this.object.add(this.hc.getHypercube());
    this.object.name = props.type;
    this.object.scale.set(props.scale, props.scale, props.scale);

    this.object.position.copy(props.position.clone());
    this.object.rotation.copy(props.rotation.clone());

    // this.object.visible = this.enabled;

    this.parent.add(this.object);
  }

  loadGltfObject(props) {
    if (props.colorURL && props.colorURL !== '') {
      this.utils.loadGLTF(props.colorURL, (gltf) => {
        this.addGltfObject(gltf.scene, props);
      });
    }
  }

  addGltfObject(obj, props) {
    // if (scene) { this.removeGltfObject(); }
    this.object.add(obj);
    this.object.name = props.type;

    this.object.position.copy(props.position.clone());
    this.object.rotation.copy(props.rotation.clone());
    this.object.scale.set(props.scale, props.scale, props.scale);

    // this.object.visible = this.enabled;

    this.parent.add(this.object);
  }

  initKinectTransport(props) {
    // this.inputManager.registerCallback('kinecttransport', 'depth', 'Kinect Depth', this.scene.viewKinectTransportDepth.bind(this.scene));
    // this.inputManager.registerCallback('kinecttransport', 'bodies', 'Kinect Body', this.scene.viewKinectTransportBodies.bind(this.scene));
    this.object.name = props.type;
    this.kinectTransport = new KinectTransport();
    this.kinectTransport.on('Buffer', this.viewKinectTransportDepth.bind(this), 'depth', 'kinect depth');
  }

  viewKinectTransportDepth(buffer) {
    if (!this.kinectPC) { // create point cloud depth display if one doesn't exist
      this.initDepthDisplay();
    }

    // this.kinectPC.moveSlice();
    this.kinectPC.updateDepth('kinecttransport', buffer.data);
    this.kinectPC.updateColor('kinecttransport', buffer.data);
  }

  initDepthDisplay() {
    const imgWidth = 512; const imgHeight = 424; // width and hight of kinect depth camera
    const dimensions = {
      width: imgWidth, height: imgHeight, near: 0, far: 128,
    };
    
    this.object.scale.set(0.05, 0.05, 0.05);
    this.object.position.set(0.6, 1, -2);
    this.scene.add(this.object);
    this.kinectPC = new DepthDisplay(this.object, dimensions, 30, false);
  }

  // viewKinectTransportBodies(bodiesObj) {
  //   // console.log(bodiesObj.bodies.trackingIds.length);
  //   const bodies = bodiesObj.bodies.bodies;
  //   if (!this.bodies) {
  //     this.bodies = {};
  //   }

  //   _.each(bodies, (body, idx) => {
  //     // body.id;
  //     if (!this.bodies[idx]) {
  //       this.bodies[idx] = new Performer(this.sceneGroup, idx);
  //     }

  //     this.bodies[idx].updateJoints(body.joints);
  //   });
  // }
  highlight() {
    if (!this.highObject) {
      if (this.object.name == 'cube') {
        let bbox = new THREE.Box3().setFromObject(this.object);
        this.highObject = new THREE.Mesh(
          new THREE.BoxBufferGeometry(bbox.max.y, bbox.max.y, bbox.max.y),
          new THREE.MeshBasicMaterial({color: 0xFFFFFF}),
        );

        // this.highObject.position.copy(this.object.position.clone());
        this.highObject.position.add(this.props.highlightOffset);
        this.highObject.rotation.copy(this.object.rotation.clone());
        this.highObject.scale.copy(this.object.scale.clone());
      } else {
        this.highObject = this.object.clone();
      }

      console.log(this.object.name, ': ', this.object.scale);

      // this.highObject.scale.multiplyScalar(this.props.highlightScale);
      this.highObject.scale.copy(this.props.highlightScale.clone());
      this.parent.add(this.highObject);

      let highlightColor = 0x00ff00;
      this.highObject.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshBasicMaterial({
            color: highlightColor,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.5,
          });
          child.material.needsUpdate = true;
        }
      });
    } else {
      this.highObject.visible = true;
    }
  }

  lowlight() {
    if (this.highObject) {
      this.highObject.visible = false;
    }
  }


  show() {
    this.object.visible = true;
  }

  hide() {
    this.object.visible = false;
    if (this.highlight) {
      this.highlight.visible = false;
      this.lowlight();
    }
  }

  update() {
    if (this.hc) { this.hc.update(window.performance.now()); }
  }
}

export default InteractiveObject;