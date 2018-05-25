import Utils from '../utils';
import Hypercube from './hypercube';

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

    this.hypercube = null;

    switch (this.type) {
      case 'empty':
        this.addEmptyEnvironment();
        break;
      case 'gltf':
        if (this.props.bwURL && this.props.bwURL !== '') {
          this.bwTexture = new THREE.TextureLoader().load(this.props.bwURL, (a) => {});
        }

        this.loadGltfEnvironment(this.props.colorURL, (environment) => {
          this.environment = environment;
          this.environment.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              this.colorTexture = _.cloneDeep(child.material.map);
              this.cloneTextureAttributes();
              if (!this.colored) {
                setTimeout(this.bwRoom.bind(this), 25);
              }
            }
          });
          // setTimeout(() => {
            this.environment.visible = this.enabled;
          // }, 5000);
        });
        break;
    }
    
    this.objects = [];
    this.objectGroup = new THREE.Object3D();
    this.objectGroup.position.copy(new THREE.Vector3(0, 1, -2)); 
    this.parent.add(this.objectGroup);

    let x = -1;
    _.each(this.props.objects, (obj) => {
      switch (obj.type) {
        default:
          break;
        case 'cube':
          this.addHypercube(x);
          break;
      }
      x+=1;
    });
  }

  addHypercube(x) { // Add assets to scene
    let hc = new Hypercube(this.parent);
    this.objects.push(hc);
    let hypercube = hc.getHypercube();
    hypercube.scale.set(0.5, 0.5, 0.5);
    hypercube.position.set(x, 0, 0);

    this.objectGroup.add(hypercube);
  }

  cloneTextureAttributes() {
    this.bwTexture.wrapS = this.colorTexture.wrapS;
    this.bwTexture.wrapT = this.colorTexture.wrapT;
    this.bwTexture.format = this.colorTexture.format;
    this.bwTexture.flipY = this.colorTexture.flipY;
    this.bwTexture.encoding = this.colorTexture.encoding;
  }

  loadGltfEnvironment(url, callback) {
    if (url && url !== '') {
      this.utils.loadGLTF(url, (gltf) => {
        this.addGltfEnvironment(gltf.scene, callback);
      });
    }
  }

  removeGltfEnvironment() {
    if (this.environment) { this.parent.remove(this.environment); }
  }

  addGltfEnvironment(scene, callback) {
    if (scene) { this.removeGltfEnvironment(); }
    let environment = scene;

    environment.scale.set(this.props.scale, this.props.scale, this.props.scale);
    environment.position.copy(this.props.position.clone());

    this.parent.add(environment);

    callback(environment);
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
    this.enabled = true;
  }

  disable() {
    if (this.environment) {
      this.environment.visible = false;
    }
    this.enabled = false;
  }

  update() {
    if (this.objects.length > 0) {
      _.each(this.objects, (obj) => {
        obj.update(window.performance.now());
      });
    }
  }
}

export default Room;