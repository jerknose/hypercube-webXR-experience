import Utils from '../../utils';
import Hypercube from '../hypercube';

import KinectTransport from '../../inputs/KinectTransport';
import DepthDisplay from './DepthDisplay';

import PanelGroup from '../PanelGroup';

class InteractiveObject {
  constructor(parent, objProps, enabled) {
    this.props = objProps;
    this.parent = parent;
    this.enabled = this.enabled;
    this.colored = this.props.colored;
    
    this.interactive = this.props.interactive;

    this.selected = false;
    this.animating = false;

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
      case 'poem':
        this.initPoem(this.props);
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

  initPoem(props) {
    this.bgPadding = [1.25, 2.5, 1.25, 2.5]; // top, right, bottom, left
    this.bgCornerRadius = [0, 0, 0, 0]; // top-left, top-right, bottom-right, bottom-left
    this.bgOpacity = 0.3;
    this.bgThickness = 0.01;
    this.bgColor = 0x000000;

    this.poemPG = new PanelGroup();
    this.poemPG.drawPanels([
      {
        type: 'text',
        value: props.text,
        style: {
          size: 3, // cap height in cm
          color: 0xFFFFFF,
          weight: 'bold', // bold or regular
        },
        align: 'center',
        padding: [0, 0, 0, 0], // top, right, bottom, left
      },
    ],
    {
      width: props.width, // 0 or 'auto' for auto width, number for fixed width
      thickness: this.bgThickness,
      opacity: 0, // this.bgOpacity,
      padding: this.bgPadding,
      cornerRadius: this.bgCornerRadius,
      color: this.bgColor,
      position: new THREE.Vector3(0, 0, 0),
      align: ['top', 'center'], // 'top' or 'bottom', 'left' or 'center' or 'right'
      fonts: window.fonts,
      layerSeparation: this.layerSeparation,
    },
    window.fonts);
    this.object = this.poemPG.getPanelsGroup();
    this.object.objName = props.type;
    this.object.position.copy(props.position.clone());
    this.object.rotation.copy(this.props.rotation.clone());
    this.parent.add(this.object);
  }

  addHypercube(props) { // Add assets to scene
    this.hc = new Hypercube(props.active);
    if (!this.object) { this.object = new THREE.Object3D(); }
    this.object.add(this.hc.getHypercube());
    this.object.objName = props.type;
    this.object.scale.copy(props.scale.clone());

    this.object.position.copy(props.position.clone());
    this.object.rotation.copy(props.rotation.clone());
    this.object.scale.copy(props.scale.clone());
    // this.object.visible = false;

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
    this.parent.add(this.object);
    this.kinectPC = new DepthDisplay(this.object, dimensions, 30, false);
  }

  highlight() {
    if (!this.selected && !this.animating && this.interactive) {
      if (!this.highObject) {
        if (this.object.objName == 'cube') {
          let bbox = new THREE.Box3().setFromObject(this.object);
          this.highObject = new THREE.Mesh(
            new THREE.BoxBufferGeometry(bbox.max.y, bbox.max.y, bbox.max.y),
            new THREE.MeshBasicMaterial({color: 0xFFFFFF}),
          );

          // this.highObject.position.copy(this.object.position.clone());
          this.highObject.position.copy(this.props.highlightOffset.clone());
          this.highObject.rotation.copy(this.object.rotation.clone());
          this.highObject.scale.copy(this.object.scale.clone());
        } else {
          this.highObject = this.object.clone();
        }

        // console.log(this.object.objName, ': ', this.object.scale);

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
  }

  lowlight() {
    if (this.highObject && this.highObject.visible !== false && this.interactive) {
      this.highObject.visible = false;
    }
  }

  makeColor() {
    if (this.props.colorURL && this.props.colorURL !== '' && this.interactive) {
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
    if (this.props.bwURL && this.props.bwURL !== '' && this.interactive) {
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
    if (this.object) { 
      this.object.visible = true;
    }
  }

  hide() {
    if (this.object) { 
      this.object.visible = false;
      if (this.highlight) {
        this.highlight.visible = false;
        this.lowlight();
      }
    }
  }

  select(name) {
    if (!this.animating && this.interactive && !this.selected) {
      this.selected = true;
      this.animatePosition(this.object, this.object.position.clone(), this.props.selectedPosition.clone(), 1000, () => {
        this.animating = false;
      });
      this.animateRotation(this.object, this.object.rotation.clone(), this.props.selectedRotation.clone(), 1000);
      this.animateScale(this.object, this.object.scale.clone(), this.props.selectedScale.clone(), 1000);
    }
  }

  forceSelect(name) {
    if (!this.animating && !this.selected) {
      this.selected = true;
      this.animatePosition(this.object, this.object.position.clone(), this.props.selectedPosition.clone(), 1000, () => {
        this.animating = false;
      });
      this.animateRotation(this.object, this.object.rotation.clone(), this.props.selectedRotation.clone(), 1000);
      this.animateScale(this.object, this.object.scale.clone(), this.props.selectedScale.clone(), 1000);
    }
  }

  deselect(name) {
    if (!this.animating && this.interactive) {
      this.animatePosition(this.object, this.object.position.clone(), this.props.position.clone(), 500, () => {
        this.animating = false;  
        this.selected = false;
      });
      this.animateRotation(this.object, this.object.rotation.clone(), this.props.rotation.clone(), 500);
      this.animateScale(this.object, this.object.scale.clone(), this.props.scale.clone(), 500);
    }
  }

  forceDeselect(name) {
    if (!this.animating && this.interactive) {
      this.animatePosition(this.object, this.object.position.clone(), this.props.position.clone(), 500, () => {
        this.animating = false;  
        this.selected = false;
      });
      this.animateRotation(this.object, this.object.rotation.clone(), this.props.rotation.clone(), 500);
      this.animateScale(this.object, this.object.scale.clone(), this.props.scale.clone(), 500);
    }
  }

  animatePosition(obj, from, to, time, callback) {
    if (!_.isEqual(obj.position, to)) {
      this.animating = true;
      const that = this;
      var tween = new TWEEN.Tween(from)
          .to(to, time)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(function() {
              that.lowlight();
              obj.position.set(
                this.x,
                this.y,
                this.z,
              );
          })
          .onComplete(callback)
          .start();
    }
  }

  animateRotation(obj, from, to, time) {
    if (!_.isEqual(obj.rotation, to)) {
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
  }

  animateScale(obj, from, to, time) {
    if (!_.isEqual(obj.scale, to)) {
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
  }

  update() {
    if (this.hc) { this.hc.update(window.performance.now()); }
  }
}

export default InteractiveObject;