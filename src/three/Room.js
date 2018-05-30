import Utils from '../utils';
import InteractiveObject from './displayComponents/InteractiveObject';

import PanelGroup from './PanelGroup';

class Room {
  constructor(parent, props) {
    this.parent = parent;
    this.props = props;

    this.ready = false;
    this.loadedElements = 0;
    this.readyElements = this.props.objects.length + 1;
    this.lastHighlight = null;

    this.utils = new Utils();

    this.id = this.props.id;
    this.name = this.props.name;

    this.enabled = this.props.enabled;
    this.colored = this.props.colored;
    this.type = this.props.type;

    this.environment = null;

    this.poemPanelsGroup = null;

    this.initEnvironment();
    this.initInteractiveObjects();
  }

  initEnvironment() {
    switch (this.type) {
      case 'empty':
        this.addEmptyEnvironment();
        break;
      case 'gltf':
        if (this.props.colorURL && this.props.colorURL !== '') {
          this.colorTexture = new THREE.TextureLoader().load(this.props.colorURL, (a) => {});
        }

        this.loadGltfEnvironment(this.props.bwURL);
        break;
    }
  }

  initInteractiveObjects() {
    this.interactiveObjects = [];
    this.objectGroup = new THREE.Object3D();
    this.objectGroup.name = 'Room ' + this.props.id + ' Interacive Objects';
    this.parent.add(this.objectGroup);

    _.each(this.props.objects, (objProps) => {
      this.interactiveObjects.push(new InteractiveObject(this.objectGroup, objProps, this.enabled));
      this.loadedElements++;
    });
  }

  cloneTextureAttributes() {
    this.colorTexture.wrapS = this.bwTexture.wrapS;
    this.colorTexture.wrapT = this.bwTexture.wrapT;
    this.colorTexture.format = this.bwTexture.format;
    this.colorTexture.flipY = this.bwTexture.flipY;
    this.colorTexture.encoding = this.bwTexture.encoding;
  }

  loadGltfEnvironment(url) {
    if (url && url !== '') {
      this.utils.loadGLTF(url, (gltf) => {
        this.addGltfEnvironment(gltf.scene);
      });
    }
  }

  removeGltfEnvironment() {
    if (this.environment) { this.parent.remove(this.environment); }
  }

  addGltfEnvironment(scene, callback) {
    if (scene) { this.removeGltfEnvironment(); }
    this.environment = scene;
    this.environment.name = 'Room ' + this.props.id;

    this.environment.scale.set(this.props.scale, this.props.scale, this.props.scale);
    this.environment.position.copy(this.props.position.clone());
    this.environment.rotation.copy(this.props.rotation.clone());

    this.parent.add(this.environment);
    this.loadedElements++;

    this.environment.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        this.bwTexture = _.cloneDeep(child.material.map);
        this.cloneTextureAttributes();
        if (this.colored) {
          setTimeout(this.colorRoom.bind(this), 25);
        }
      }
    });
    // this.environment.visible = this.enabled;
  }

  removeEmptyEnvironment() {
    if (this.gridHelperBottom) {
        this.parent.remove(this.gridHelperBottom);
    }
  }

  addEmptyEnvironment() {
    if (this.gridHelperBottom) { this.removeEmptyEnvironment(); }
    this.gridHelperBottom = new THREE.PolarGridHelper( 8, 16, 8, 64, 0x404040, 0x404040);
    this.parent.add(this.gridHelperBottom);
    this.loadedElements++;
  }

  initPoemPanelGroup(props) {
    this.bgPadding = [1.25, 2.5, 1.25, 2.5]; // top, right, bottom, left
    this.bgCornerRadius = [0, 0, 0, 0]; // top-left, top-right, bottom-right, bottom-left
    this.bgOpacity = 0.3;
    this.bgThickness = 0.01;
    this.bgColor = 0x000000;

    this.poemPG = new PanelGroup();
    this.poemPG.drawPanels([
      {
        type: 'text',
        value: props.text.content,
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
      width: props.text.width, // 0 or 'auto' for auto width, number for fixed width
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
    this.poemPanelsGroup = this.poemPG.getPanelsGroup();
    this.poemPanelsGroup.position.copy(props.text.position.clone());
    this.poemPanelsGroup.rotation.copy(props.text.rotation.clone());
    this.parent.add(this.poemPanelsGroup);
    this.loadedElements++;
  }

  getObj(name) {
    return _.filter(this.interactiveObjects, (obj) => { return obj.objName === name; })[0];
  }

  highlightObject(name) {
    if (name !== '') {
      if (this.lastHighlight !== null) {
        this.lastHighlight.lowlight();
      }

      const obj = this.getObj(name);
      obj.highlight();

      this.lastHighlight = obj;
    }
  }

  lowlightObject(name) {
    if (name !== '') {
      this.getObj(name).lowlight();
      this.lastHighlight = null;
    }
  }

  lowlightObjects() {
    _.each(this.interactiveObjects, (obj) => { return obj.lowlight(); });
    this.lastHighlight = null;
  }

  selectObject(name) {
    if (name !== '') {
      _.each(this.interactiveObjects, (obj, idx) => {
        if (obj.objName !== 'cube') {
          if (this.getObj('cube').selected && name !== 'book') {
            obj.deselect(obj.objName);
          }
        } else {
          obj.forceDeselect(obj.objName);
        }

        if (name !== 'book' && this.poemPanelsGroup !== null) {
          this.poemPanelsGroup.visible = false;
        }
        obj.lowlight();
        if (idx+1 == this.interactiveObjects.length) {
          if (name !== 'book') {
            let cube = this.getObj('cube');
            cube.forceSelect('cube');
          }

          if (name == 'book' && this.poemPanelsGroup !== null) {
            this.poemPanelsGroup.visible = true;
          }
    
          let obj = this.getObj(name);
          obj.select(name);
        }
      });
    }
  }

  deselectObject(name) {
    if (name !== '') {
      _.each(this.initInteractiveObjects, (obj) => {
        if (obj.objName == 'cube') {
          obj.forceDeselect();
        } else {
          obj.deselect();
        }
        if (this.poemPanelsGroup !== null) {
          this.poemPanelsGroup.visible = false;
        }
      });
    }
  }

  deselectObjects() {
    _.each(this.interactiveObjects, (obj) => {
      if (obj.objName == 'cube') {
        obj.forceDeselect();
      } else {
        obj.deselect();
      }
      obj.lowlight();
    });
    if (this.poemPanelsGroup !== null) {
      this.poemPanelsGroup.visible = false;
    }
  }

  toggleColor() {
    if (!this.colored) {
      this.makeColor();
    } else {
      this.makeBW();
    }
  }

  makeColor() {
    if (this.colorTexture) {
      this.colored = true;
      this.environment.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.map = this.colorTexture;
          child.material.needsUpdate = true;
        }
      });
    }
    _.each(this.interactiveObjects, (obj) => {
      obj.makeColor();
    });
  }

  makeBW() {
    if (this.bwTexture) {
      this.colored = false;
      this.environment.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.map = this.bwTexture;
          child.material.needsUpdate = true;
        }
      });
    }
    _.each(this.interactiveObjects, (obj) => {
      obj.makeBW();
    });
  }

  enable() {
    if (this.environment) {
      this.environment.visible = true;
    }
    _.each(this.interactiveObjects, (obj) => {
      obj.show();
    });
    this.enabled = true;
  }

  disable() {
    if (this.environment) {
      this.environment.visible = false;
    }
    _.each(this.interactiveObjects, (obj) => {
      obj.hide();
    });
    this.enabled = false;
  }

  update() {
    if (this.loadedElements == this.readyElements && this.ready !== true) {
      this.ready = true;
    }

    if (window.fontsReady && this.poemPanelsGroup == null && this.props.text) {
      this.initPoemPanelGroup(this.props);
    }

    if (this.interactiveObjects.length > 0) {
      _.each(this.interactiveObjects, (obj) => {
        obj.update(window.performance.now());
      });
    }
  }
}

export default Room;