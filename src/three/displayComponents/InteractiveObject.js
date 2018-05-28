import Utils from '../../utils';
import Hypercube from '../hypercube';

import KinectTransport from '../../inputs/KinectTransport';
import DepthDisplay from './DepthDisplay';

class InteractiveObject {
  constructor(parent, objProps, enabled) {
    this.props = objProps;
    this.parent = parent;
    this.enabled = this.enabled;
    this.colored = this.props.colored;
    this.selected = false;

    this.bwObject = null;
    this.colorObject = null;
    this.object = null;
    this.highObject = null;

    this.objName = this.props.type;

    this.utils = new Utils();

    switch (this.props.type) {
      default:
        console.log(this.props.type, ' not found');
        return false;
        break;
      case 'kinect':
        this.initKinectTransport(this.props);
        break;
      case 'book':
      case 'violin':
      case 'mandolin':
      case 'flute':
      case 'sword':
      case 'gun':
      case 'axe':
        if (this.colored && this.props.colorURL && this.props.colorURL !== '') {
          this.loadGltfObject(this.props.colorURL, this.props);
        } else {
          this.loadGltfObject(this.props.bwURL, this.props);
        }
        
        break;
      case 'cube':
        this.addHypercube(this.props);
        break;
    }
  }

  addHypercube(props) { // Add assets to scene
    this.hc = new Hypercube(props.active);
    if (!this.object) { this.object = new THREE.Object3D(); }
    this.object.add(this.hc.getHypercube());
    this.object.objName = props.type;
    this.object.scale.copy(props.scale.clone());

    this.object.position.copy(props.position.clone());
    this.object.rotation.copy(props.rotation.clone());

    // this.object.visible = this.enabled;

    this.parent.add(this.object);
  }

  loadGltfObject(url, props) {
    this.utils.loadGLTF(url, (gltf) => {
      this.addGltfObject(gltf.scene, props);
    });
  }

  addGltfObject(obj, props) {
    // if (scene) { this.removeGltfObject(); }
    if (!this.object) { this.object = new THREE.Object3D(); }
    if (this.colored) {
      if (!this.colorObject) { this.colorObject = new THREE.Object3D(); }
      this.colorObject = obj;
      this.object.add(obj);
    } else {
      if (!this.bwObject) { this.bwObject = new THREE.Object3D(); }
      this.bwObject = obj;
      this.object.add(obj);
    }
    
    this.object.objName = props.type;

    this.object.position.copy(props.position.clone());
    this.object.rotation.copy(props.rotation.clone());
    this.object.scale.copy(props.scale.clone());

    // this.object.visible = this.enabled;

    this.parent.add(this.object);
  }

  initKinectTransport(props) {
    if (!this.object) { this.object = new THREE.Object3D(); }
    this.object.objName = props.type;
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

  highlight() {
    if (!this.highObject) {
      if (this.object.objName == 'cube') {
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

      console.log(this.object.objName, ': ', this.object.scale);

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

  makeColor() {
    if (this.props.colorURL && this.props.colorURL !== '') {
      this.colored = true;
      if (this.bwObject) {
        this.bwObject.visible = false;
      }
      if (!this.colorObject) {
        this.loadGltfObject(this.props.colorURL, this.props);
      } else {
        this.colorObject.visible = true;
      }
    }
  }

  makeBW() {
    if (this.props.bwURL && this.props.bwURL !== '') {
      this.colored = false;
      if (this.colorObject) {
        this.colorObject.visible = false;
      }
      if (!this.bwObject) {
        this.loadGltfObject(this.props.bwURL, this.props);
      } else {
        this.bwObject.visible = true;
      }
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

  select() {
    this.animatePosition(this.object, this.object.position.clone(), this.props.selectedPosition.clone(), 1000);
    this.animateRotation(this.object, this.object.rotation.clone(), this.props.selectedRotation.clone(), 1000);
    this.animateScale(this.object, this.object.scale.clone(), this.props.selectedScale.clone(), 1000);
    this.selected = true;
  }

  deselect() {
    this.animatePosition(this.object, this.object.position.clone(), this.props.position.clone(), 500);
    this.animateRotation(this.object, this.object.rotation.clone(), this.props.rotation.clone(), 500);
    this.animateScale(this.object, this.object.scale.clone(), this.props.scale.clone(), 500);
    this.selected = false;
  }

  animatePosition(obj, from, to, time) {
    var tween = new TWEEN.Tween(from)
        .to(to, time)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function() {
            obj.position.set(
              this.x,
              this.y,
              this.z,
            );
        })
        .start();
  }

  animateRotation(obj, from, to, time) {
    var tween = new TWEEN.Tween(from)
        .to(to, time)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function() {
            obj.rotation.set(
              this.x,
              this.y,
              this.z,
            );
        })
        .start();
  }

  animateScale(obj, from, to, time) {
    var tween = new TWEEN.Tween(from)
        .to(to, time)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function() {
            obj.scale.set(
              this.x,
              this.y,
              this.z,
            );
        })
        .start();
  }

  update() {
    if (this.hc) { this.hc.update(window.performance.now()); }
  }
}

export default InteractiveObject;