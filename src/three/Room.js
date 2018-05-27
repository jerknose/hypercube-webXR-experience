import Utils from '../utils';
import InteractiveObject from './displayComponents/InteractiveObject';

class Room {
  constructor(parent, props) {
    this.parent = parent;
    this.props = props;

    this.utils = new Utils();

    this.id = this.props.id;
    this.enabled = this.props.enabled;
    this.colored = this.props.colored;
    this.type = this.props.type;

    this.environment = null;

    this.initEnvironment();
    this.initInteractiveObjects();
  }

  initEnvironment() {
    switch (this.type) {
      case 'empty':
        this.addEmptyEnvironment();
        break;
      case 'gltf':
        if (this.props.bwURL && this.props.bwURL !== '') {
          this.bwTexture = new THREE.TextureLoader().load(this.props.bwURL, (a) => {});
        }

        this.loadGltfEnvironment(this.props.colorURL);
        break;
    }
  }

  initInteractiveObjects() {
    this.interactiveObjects = [];
    this.objectGroup = new THREE.Object3D();
    this.parent.add(this.objectGroup);

    _.each(this.props.objects, (objProps) => {
      this.interactiveObjects.push(new InteractiveObject(this.objectGroup, objProps, this.enabled));
    });
  }

  cloneTextureAttributes() {
    this.bwTexture.wrapS = this.colorTexture.wrapS;
    this.bwTexture.wrapT = this.colorTexture.wrapT;
    this.bwTexture.format = this.colorTexture.format;
    this.bwTexture.flipY = this.colorTexture.flipY;
    this.bwTexture.encoding = this.colorTexture.encoding;
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
    console.log(this.environment);

    this.environment.scale.set(this.props.scale, this.props.scale, this.props.scale);
    this.environment.position.copy(this.props.position.clone());
    this.environment.rotation.copy(this.props.rotation.clone());

    this.parent.add(this.environment);

    this.environment.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        this.colorTexture = _.cloneDeep(child.material.map);
        this.cloneTextureAttributes();
        if (!this.colored) {
          setTimeout(this.bwRoom.bind(this), 25);
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
  }

  toggleColor() {
    if (!this.color) {
      this.colorRoom();
    } else {
      this.bwRoom();
    }
  }

  colorRoom() {
    if (this.colorTexture) {
      this.environment.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.map = this.colorTexture;
          child.material.needsUpdate = true;
        }
      });
    }
  }

  bwRoom() {
    if (this.bwTexture) {
      this.environment.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.map = this.bwTexture;
          child.material.needsUpdate = true;
        }
      });
    }
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
    if (this.interactiveObjects.length > 0) {
      _.each(this.interactiveObjects, (obj) => {
        obj.update(window.performance.now());
      });
    }
  }
}

export default Room;