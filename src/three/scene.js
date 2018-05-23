//Main threejs scene

require('three/examples/js/loaders/GLTFLoader.js');
require('three/examples/js/loaders/OBJLoader.js');
require('three/examples/js/loaders/ColladaLoader.js');
require('three/examples/js/controls/TrackballControls.js');

const Stats = require('three/examples/js/libs/stats.min.js');

import config from './../config';

import VR from './vr/vr';
import VRPoseControl from './vrPoseControl';

import Hypercube from './hypercube';

import loadFont from 'load-bmfont';
import PanelGroup from './PanelGroup';

import KinectTransport from '../inputs/KinectTransport';
import DepthDisplay from './displayComponents/DepthDisplay';

class Scene {
  constructor() {
    window._scene = this;

    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.controls = null;

    this.clock = new THREE.Clock();

    this.container = null;
    this.w = null;
    this.h = null;

    this.stats = null;

    this.hypercube = null;
    this.rooms = [
      {name: 'the_great_drawing_room', position: new THREE.Vector3(0, -0.575, 0), scale: 0.5},
      {name: 'the_smoking_room', position: new THREE.Vector3(0, -0.32, 0), scale: 0.3},
      {name: 'the_morning_room', position: new THREE.Vector3(0, -0.345, 0), scale: 0.3},
      {name: 'the_billiards_room', position: new THREE.Vector3(0, -0.575, 0), scale: 0.5},
    ];
    this.currentRoom = 0;
    this.cubeRotating = false;
    this.roomAnimating = false;
    this.gltfReady = false;
    this.fontsReady = false;
    this.waitingRoom = true;
    this.lastRoom = null;

    let assetCheck = 0;
    this.rooms.forEach((room) => {
      this.loadRoom(room.name, (gltf) => {
        assetCheck++;
        room.gltf = gltf;

        if (assetCheck == this.rooms.length) {
          this.addRoom(this.rooms[this.currentRoom].name);
          this.gltfReady = true;
          this.showReadyMessage(this.gltfReady, this.fontsReady);
        }
      });
    });

      window.fonts = [
        {
            name: 'bold',
            json: '/bmFont/lato-bold.json',
            png: '/bmFont/lato-bold.png',
            font: null,
            texture: null,
        },
        {
            name: 'regular',
            json: '/bmFont/lato-regular.json',
            png: '/bmFont/lato-regular.png',
            font: null,
            texture: null,
        },
    ];
    this.loadFonts(window.fonts);
  }

  startExperience() {
    this.waitingRoom = false;
    if (this.pg) { this.pg.destroyPanels(); }
    this.fadeOverlay('out', 2000, () => {});
  }

  showReadyMessage(gltf, fonts) {
    console.log(gltf, fonts);
    if (gltf && fonts) {
      this.initStartPanelGroup();
    }
  }

  loadFonts(fontList) {
    _.each(fontList, (fontDef) => {
        loadFont(fontDef.json, (err, font) => {
            if (err) throw err;
            THREE.ImageUtils.loadTexture(fontDef.png, undefined, (texture) => {
                fontDef.font = font;
                fontDef.texture = texture;
                if (_.filter(fontList, 'font').length === fontList.length) {
                    // all fonts are loaded
                    this.fontsReady = true;
                    this.showReadyMessage(this.gltfReady, this.fontsReady);
                }
            });
        });
    });
  }

  initScene() { // Initialize the basic threejs stuff
    this.container = $('#threeContainer');

    this.w = this.container.width();
    this.h = this.container.height();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      autoClear: false,
    });

    this.renderer.sortObjects = false;
    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(this.w, this.h);

    this.scene = new THREE.Scene();
    // window.scene = this.scene;

    this.addLights();

    if (config.debug) {
      this.scene.add(new THREE.AxisHelper(5));
    }

    this.camera = new THREE.PerspectiveCamera(20, this.w / this.h, 1/1000, 1000);
    window.camera = this.camera;

    this.camera.position.set(0, 1, 0);
  
    this.scene.add(this.camera);

    this.controls = new THREE.TrackballControls(this.camera);
    this.controls.target = new THREE.Vector3(0, 1, -1);
    // window.controls = this.controls;

    this.configControls();

    // attach this.renderer to DOM
    this.container.append(this.renderer.domElement);

    this.addHypercube();

    this.initVR();

    this.initOverlay();
    this.initKinectTransport();

    if (config.debug) {
      this.stats = new Stats();
      document.body.appendChild(this.stats.dom);
    }

    this.addEventListeners();
    this.animate();
  }

  initKinectTransport() {
    // this.inputManager.registerCallback('kinecttransport', 'depth', 'Kinect Depth', this.scene.viewKinectTransportDepth.bind(this.scene));
    // this.inputManager.registerCallback('kinecttransport', 'bodies', 'Kinect Body', this.scene.viewKinectTransportBodies.bind(this.scene));
    this.kinectTransport = new KinectTransport();
    this.kinectTransport.on('Buffer', this.viewKinectTransportDepth.bind(this), 'depth', 'kinect depth');
  }

  initDepthDisplay() {
    const imgWidth = 512; const imgHeight = 424; // width and hight of kinect depth camera
    const dimensions = {
      width: imgWidth, height: imgHeight, near: 0, far: 128,
    };
    this.kinectGroup = new THREE.Object3D();
    this.kinectGroup.scale.set(0.05, 0.05, 0.05);
    this.kinectGroup.position.set(0.6, 1, -2);
    this.scene.add(this.kinectGroup);
    this.kinectPC = new DepthDisplay(this.kinectGroup, dimensions, 30, false);
  }
  viewKinectTransportDepth(buffer) {
    if (!this.kinectPC) { // create point cloud depth display if one doesn't exist
      this.initDepthDisplay();
    }

    // this.kinectPC.moveSlice();
    this.kinectPC.updateDepth('kinecttransport', buffer.data);
    this.kinectPC.updateColor('kinecttransport', buffer.data);
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

  initStartPanelGroup() {
    this.pg = new PanelGroup();
    this.pg.drawPanels({}, window.fonts);
    this.panelsGroup = this.pg.getPanelsGroup();
    this.panelsGroup.position.y = 1;
    this.panelsGroup.position.z = -0.75;
    this.scene.add(this.panelsGroup);

    let geometry = new THREE.PlaneBufferGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({
      transparent: true,
      map: new THREE.TextureLoader().load('textures/instructions.png'),
    });
    let plane = new THREE.Mesh(geometry, material);
    plane.position.y = 0.25;
    // plane.position.z = -0.25;
    this.panelsGroup.add(plane);
  }

  initOverlay() {
    const material = new THREE.RawShaderMaterial({
      vertexShader: require('../glsl/shader.vert'),
      fragmentShader: require('../glsl/shader.frag'),
      uniforms: {
        time: { type: 'f', value: 0 },
        alpha: { type: 'f', value: 1 }
      }
    });

    let geometry = new THREE.OctahedronBufferGeometry(1, 3);
    geometry.center();
    geometry.computeVertexNormals();

    this.overlay = new THREE.Mesh(geometry, material);
    this.overlay.position.set(0, 1, 0);
    this.scene.add(this.overlay);

    this.overlay.material.uniforms.time.value = 4.7;
    this.overlay.geometry.scale(1, 1, 1);

    this.overlay.material.side = THREE.DoubleSide;
    this.overlay.material.transparent = true;
  }

  fadeOverlay(direction, length, cb) {
    let start = {};
    let end = {};
    if (direction === 'out') {
      this.overlay.material.uniforms.time.value = 4.7;

      start = { time: this.overlay.material.uniforms.time.value, size: 1, alpha: 1 };
      end = { time: 7.1, alpha: 0};
    } else {  
      this.overlay.material.uniforms.time.value = 7.1;

      start = { time: this.overlay.material.uniforms.time.value, size: 0, alpha: 0 };
      end = { time: 4.7, alpha: 1 };
    }
  
    let that = this;
    new TWEEN.Tween(start)
        .to(end, length)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
          that.overlay.material.uniforms.time.value = this.time;
          that.overlay.material.uniforms.alpha.value = this.alpha;
        })
        .onComplete(cb)
        .start();
  }

  initVR() { // Init vr controls / view, listen for button presses, etc
    this.vr = new VR(this.renderer, this.camera, this.scene, this.controls);
    this.vr.on('isPresenting', this.isVRPresenting.bind(this)); // handle the transition to vr.

    this.vrPoseControl = new VRPoseControl(this.hypercube, this.vr);
    if (this.vr) {
      this.vrPoseControl.startPoseControl();
      
      this.vr.leftTriggerStream
        .distinctUntilChanged()
        .filter(x => x)
        .subscribe((x) => {
          if (this.waitingRoom) {
            this.startExperience();
          } else {
            this.changeRoom(this.rooms[this.currentRoom].name);
          }
        });

      this.vr.rightTriggerStream
        .distinctUntilChanged()
        .filter(x => x)
        .subscribe((x) => {
          if (this.waitingRoom) {
            this.startExperience();
          } else {
            this.changeRoom(this.rooms[this.currentRoom].name);
          }
        });

      this.vr.buttonAStream
        .distinctUntilChanged()
        .filter(x => x)
        .subscribe((x) => {
          if (this.waitingRoom) {
            this.startExperience();
          } else {
            this.changeRoom(this.rooms[this.currentRoom].name);
          }
        });

      this.vr.buttonBStream
        .distinctUntilChanged()
        .filter(x => x)
        .subscribe((x) => {
          if (this.waitingRoom) {
            this.startExperience();
          } else {
            this.changeRoom(this.rooms[this.currentRoom].name);
          }
        });

      this.vr.buttonXStream
        .distinctUntilChanged()
        .filter(x => x)
        .subscribe((x) => {
          if (this.waitingRoom) {
            this.startExperience();
          } else {
            this.changeRoom(this.rooms[this.currentRoom].name);
          }
        });

      this.vr.buttonYStream
        .distinctUntilChanged()
        .filter(x => x)
        .subscribe((x) => {
          if (this.waitingRoom) {
            this.startExperience();
          } else {
            this.changeRoom(this.rooms[this.currentRoom].name);
          }
        });

      this.vr.leftStickStream
        // .distinctUntilChanged()
        .filter(x => Math.abs(x[1]) > 0.1)
        .subscribe((x) => {
          if (this.waitingRoom) {
            this.startExperience();
          } else {
            if (x[0] < -0.25) {
              this.rotateHypercube('left', 1000, () => {
                this.cubeRotating = false;
                (this.currentRoom > 0) ? this.currentRoom-- : this.currentRoom = this.rooms.length-1;
              });
            } else if (x[0] > 0.25) {
              this.rotateHypercube('right', 1000, () => {
                this.cubeRotating = false;
                (this.currentRoom < this.rooms.length-1) ? this.currentRoom++ : this.currentRoom = 0;
              });
            }

            if (x[1] < -0.25) {
              this.rotateHypercube('up', 1000, () => {
                this.cubeRotating = false;
                (this.currentRoom > 0) ? this.currentRoom-- : this.currentRoom = this.rooms.length-1;
              });
            } else if (x[1] > 0.25) {
              this.rotateHypercube('down', 1000, () => {
                this.cubeRotating = false;
                (this.currentRoom < this.rooms.length-1) ? this.currentRoom++ : this.currentRoom = 0;
              });
            }
          }
        });

      this.vr.rightStickStream
        // .distinctUntilChanged()
        .filter(x => Math.abs(x[1]) > 0.1)
        .subscribe((x) => {
          if (this.waitingRoom) {
            this.startExperience();
          } else {
            if (x[0] > 0.25) {
              this.rotateHypercube('left', 1000, () => {
                this.cubeRotating = false;
                (this.currentRoom > 0) ? this.currentRoom-- : this.currentRoom = this.rooms.length-1;
              });
            } else if (x[0] < -0.25) {
              this.rotateHypercube('right', 1000, () => {
                this.cubeRotating = false;
                (this.currentRoom < this.rooms.length-1) ? this.currentRoom++ : this.currentRoom = 0;
              });
            }

            if (x[1] < -0.25) {
              this.rotateHypercube('up', 1000, () => {
                this.cubeRotating = false;
                (this.currentRoom > 0) ? this.currentRoom-- : this.currentRoom = this.rooms.length-1;
              });
            } else if (x[1] > 0.25) {
              this.rotateHypercube('down', 1000, () => {
                this.cubeRotating = false;
                (this.currentRoom < this.rooms.length-1) ? this.currentRoom++ : this.currentRoom = 0;
              });
            }
          }
        });
    }
  }

  rotateHypercube(direction, length, cb) {
    let start = {};
    let end = {};
    
    switch(direction) {
      case 'up':
        start = this.hypercube.rotation.clone();
        end = new THREE.Vector3(this.hypercube.rotation.x - (Math.PI / 2), this.hypercube.rotation.y, this.hypercube.rotation.z);
        break;
        
      case 'down':
        start = this.hypercube.rotation.clone();
        end = new THREE.Vector3(this.hypercube.rotation.x + (Math.PI / 2), this.hypercube.rotation.y, this.hypercube.rotation.z);
        break;
      
        case 'left':
        start = this.hypercube.rotation.clone();
        end = new THREE.Vector3(this.hypercube.rotation.x, this.hypercube.rotation.y - (Math.PI / 2), this.hypercube.rotation.z);
        break;
      
        case 'right':
        start = this.hypercube.rotation.clone();
        end = new THREE.Vector3(this.hypercube.rotation.x, this.hypercube.rotation.y + (Math.PI / 2), this.hypercube.rotation.z);
        break;
    }
  
    if (!this.cubeRotating) {
      this.cubeRotating = true;
      let that = this;
      new TWEEN.Tween(start)
          .to(end, length)
          .easing(TWEEN.Easing.Linear.None)
          .onUpdate(function() {
            that.hypercube.rotation.copy(this);
            this.cubeRotating = true;
          })
          .onComplete(cb)
          .start();
    }
  }

  addHypercube() { // Add assets to scene
    this.hc = new Hypercube(this.scene);
    this.hypercube = this.hc.getHypercube();
    this.hypercube.scale.set(0.5, 0.5, 0.5);
    this.hypercube.position.copy(new THREE.Vector3(0, 1, -2));
    this.scene.add(this.hypercube); 
  }

  loadRoom(roomName, cb) {
    this.loadGLTF('models/gltf/' + roomName + '/scene.gltf', {}, (gltf) => {
      cb(gltf);
    });
  }

  addRoom(roomName) {
    if (this.room) { this.scene.remove(this.room); }
    this.room = _.filter(this.rooms, (room) => { return room.name == roomName; })[0].gltf;
    this.room.scale.set(this.rooms[this.currentRoom].scale, this.rooms[this.currentRoom].scale, this.rooms[this.currentRoom].scale);
    this.room.position.copy(this.rooms[this.currentRoom].position.clone());
    this.scene.add(this.room);
    this.lastRoom = roomName;
  }

  changeRoom(roomName) {
    if (this.lastRoom !== roomName && !this.roomAnimating) {
      this.roomAnimating = true;
      this.fadeOverlay('in', 1000, () => {
        this.addRoom(roomName);

        this.fadeOverlay('out', 2000, () => {
          this.roomAnimating = false;
        });
      });
      this.lastRoom = roomName;
    }
  }

  loadPrevRoom() {
    this.fadeOverlay('in', 1000, () => {
      (this.currentRoom > 0) ? this.currentRoom-- : this.currentRoom = this.rooms.length-1;
      this.changeRoom(this.rooms[this.currentRoom].name);
    });
  }

  loadNextRoom() {
    this.fadeOverlay('in', 1000, () => {
      (this.currentRoom < this.rooms.length-1) ? this.currentRoom++ : this.currentRoom = 0;
      this.changeRoom(this.rooms[this.currentRoom].name);
    });
  }

  addLights() { // Add lights to scene
		this.scene.add( new THREE.AmbientLight( 0xFFFFFF ) );
		let directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 0.125 );
		directionalLight.position.y = 10;
		directionalLight.position.normalize();
		this.scene.add( directionalLight );
  }

  toggleWireframe(object) { // Hide / show wirframe of Object3d material
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.wireframe = !child.material.wireframe;
        child.material.needsUpdate = true;
      }
    });
  }

  changeOpacity(object, val) { // Change opacity of Object3d material
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.opacity += val;
        child.material.needsUpdate = true;
        if (child.material.opacity < 0.001) { // Limit opacity range
          child.material.opacity = 0.001;
        }
        if (child.material.opacity > 1) { // Limit opacity range
          child.material.opacity = 1;
        }
      }
    });
  }

  updateMaterial(options) { // Update properties of Object3d material
    return new THREE.MeshPhongMaterial({
      color: options.color || 0xFFFFFF,
      wireframe: options.wireframe || false,
      opacity: options.opacity || 0.75,
      transparent: options.transparent || false,
      side: THREE.DoubleSide,
      depthTest: options.depthTest || false,
    });
  }

  configControls() { // Set default threejs control params
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
    this.controls.keys = [65, 83, 16];
  }

  // loadHead() { // Load 3d assets
  //   const head = new THREE.Object3D();
  //   this.loadObj('models/skulls/Skull.obj', {
  //     color: 0xFFFFFF,
  //     opacity: 0.01,
  //     wireframe: true,
  //     transparent: true,
  //     side: THREE.BackSide,
  //     depthTest: false,
  //   }, (obj) => {
  //     obj.scale.set(0.00088, 0.00088, 0.00088);
  //     obj.position.set(-0.0129, -0.09, -0.005);
  //     obj.rotation.x = Math.PI / 25;
  //     obj.renderOrder = 1;
  //     this.skull = obj;
  //     head.add(obj);
  //   });

  //   this.loadObj('models/brains/spineless.obj', {
  //     color: 0x6EC5FB,
  //     opacity: 0.015,
  //     wireframe: true,
  //     transparent: true,
  //     depthTest: false,
  //   }, (obj) => {
  //     obj.scale.set(0.022, 0.022, 0.022);
  //     obj.position.set(0, 0, 0);
  //     obj.renderOrder = 100;
  //     this.brain = obj;
  //     head.add(obj);
  //   });
  //   return head;
  // }

  isVRPresenting(event) { // Adjust scene / clean up listeners when entering / exiting VR
    if (event.display && event.display.isPresenting) { // app is vr mode
      this.controls.enabled = false;
      this.removeEventListeners(); // make sure mouse events, etc aren't interfering with VR.

      this.initEnvironment();
    } else { // app is not in vr mode
      this.controls.enabled = true;
      this.addEventListeners(); // re-enable mouse control when VR is finished

      this.removeEnvironment();
    }
  }

  initEnvironment() {
    this.gridHelperBottom = new THREE.PolarGridHelper( 8, 16, 8, 64, 0x404040, 0x404040);
    this.scene.add(this.gridHelperBottom);
  }

  removeEnvironment() {
    if (this.gridHelperBottom) {
        this.scene.remove(this.gridHelperBottom);
    }
  }

  addEventListeners() { // Make it easy to add mouse events, etc
    this.renderer.domElement.addEventListener('mousemove', e => this.onDocumentMouseMove(e), false);
    this.renderer.domElement.addEventListener('mousedown', e => this.onDocumentMouseDown(e), false);
    this.renderer.domElement.addEventListener('mouseout', e => this.onDocumentMouseUp(e), false);

    document.addEventListener('mouseup', e => this.onDocumentMouseUp(e), false);

    window.addEventListener('resize', e => this.resizeRenderer(e), true);

    this.configControls();
  }

  removeEventListeners() { // Make it easy to clean up mouse events, etc
    this.renderer.domElement.removeEventListener('mousemove', e => this.onDocumentMouseMove(e), false);
    this.renderer.domElement.removeEventListener('mousedown', e => this.onDocumentMouseDown(e), false);
    this.renderer.domElement.removeEventListener('mouseout', e => this.onDocumentMouseUp(e), false);

    document.removeEventListener('mouseup', e => this.onDocumentMouseUp(e), false);

    window.removeEventListener('resize', e => this.resizeRenderer(e), true);
  }

  onDocumentMouseMove(event) {
    // event.preventDefault();
  }

  onDocumentMouseDown(event) {
      // event.preventDefault();
  }

  onDocumentMouseUp(event) {
      // event.preventDefault();
  }

  loadObj(url, options, cb) { // Simple interface for loading OBJ files
    new THREE.OBJLoader(new THREE.LoadingManager()).load(url, (object) => {
      object.traverse((child) => {
        child.position.set(0, 0, 0); // force center
        if (child instanceof THREE.Mesh) {
          child.material = this.updateMaterial(options);
        }
      });
      cb(object);
    }, (xhr) => {
      if (xhr.lengthComputable) {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
      }
    }, (xhr) => {
      console.log('OBJLoader Error: ', xhr);
    });
  }

  loadCollada(url, options, cb) { // Simple interface for loading DAE files
    let obj = null;
    new THREE.ColladaLoader(new THREE.LoadingManager(() => {
      cb(obj);
    })).load(url, (c) => {
      obj = c.scene;
      obj.traverse((child) => {
        child.position.set(0, 0, 0); // force center
        if (child instanceof THREE.Mesh) {
          child.material = this.updateMaterial(options);
        }
      });
    });
  }

  loadGLTF(url, options, cb) { // Simple interface for loading gltf files
    new THREE.GLTFLoader().load(url, (gltf) => {
        // gltf.scene.traverse( function ( child ) {
        //   if ( child.isMesh ) {
        //     child.material.envMap = envMap;
        //   }
        // } );
      cb(gltf.scene);
    });
  }

  animate() {
    if (this.vr && this.vr.vrEffect) {
      this.vr.vrEffect.requestAnimationFrame(this.animate.bind(this));
    } else {
      requestAnimationFrame(this.animate.bind(this));
    }

    this.controls.update();
    if (TWEEN) { TWEEN.update(); }
    if (this.hc) { this.hc.update(window.performance.now()); }

    if (this.overlay) {
      // this.overlay.position.copy(this.camera.position.clone());
      // this.overlay.material.uniforms.time.value += 0.01;
      // console.log(this.overlay.material.uniforms.time.value);
    }

    // update stats
    if (config.debug) {
      this.stats.update();
    }
    
    this.render();
  }

  render() {
    if (this.vr) {
      this.vr.render(this.vr);
    }

    
    this.renderer.render(this.scene, this.camera);
  }

  resizeRenderer(event) {
    const width = $('#threeContainer').width();
    const height = $('#threeContainer').height();

    // First update the camera's aspect ratio: width / height
    this.camera.aspect = width / height;


    // must update for your changes to take effect
    this.camera.updateProjectionMatrix();

    // reset the size of the window to the new height

    // this.composer.setSize(width, height)
    this.renderer.setSize(width, height);
  }
}

export default Scene;
