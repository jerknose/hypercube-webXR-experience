//Main threejs scene

require('three/examples/js/loaders/GLTFLoader.js');
require('three/examples/js/loaders/OBJLoader.js');
require('three/examples/js/loaders/ColladaLoader.js');
require('three/examples/js/controls/TrackballControls.js');

const Stats = require('three/examples/js/libs/stats.min.js');

import config from './../config';

import VR from './vr/vr';
import VRPoseControl from './vrPoseControl';

import PanelGroup from './PanelGroup';

import Utils from '../utils';
import Room from './Room';

import Mousetrap from 'mousetrap';

class Scene {
  constructor() {
    window._scene = this;

    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.controls = null;

    this.utils = new Utils();

    this.clock = new THREE.Clock();

    this.container = null;
    this.w = null;
    this.h = null;

    this.stats = null;

    this.ready = false;
    this.currentRoom = 0;
    this.cubeRotating = false;
    this.roomAnimating = false;
    this.gltfReady = false;
    window.fontsReady = false;
    this.waitingRoom = true;
    this.lastRoom = null;

    this.selectedLeft = [];
    this.selectedRight = [];

    this.bgPadding = [1.25, 2.5, 1.25, 2.5]; // top, right, bottom, left
    this.bgCornerRadius = [0, 0, 0, 0]; // top-left, top-right, bottom-right, bottom-left
    this.bgOpacity = 0.3;
    this.bgThickness = 0.01;
    this.bgColor = 0x000000;

    this.overlayIn = true;

    // let assetCheck = 0;
    // _.each(this.rooms, (room) => {
    //   this.utils.loadGLTF('models/gltf/' + room.name + '/scene.gltf', (gltf) => {
    //     assetCheck++;
    //     room.gltf = gltf.scene;

    //     if (assetCheck == this.rooms.length) {
    //       this.addRoom(this.rooms[this.currentRoom].name);
    //       this.initHypercubePanelGroup();
    //       this.drawHypercubeText();
    //       this.gltfReady = true;
    //       this.showReadyMessage(this.gltfReady, this.fontsReady);
    //     }
    //   });
    // });

    this.utils.loadFonts(config.fonts, () => {
      // all fonts are loaded
      this.showReadyMessage(true, this.ready);
    });
  }

  startExperience() {
    this.waitingRoom = false;
    if (this.startPG) { this.startPG.destroyPanels(); }
    this.fadeOverlay('out', 2000, () => {});
  }

  showReadyMessage(fontsReady, assetsReady) {
    if (fontsReady && assetsReady) {
      this.initStartPanelGroup();
      // this.changeRoom(0);
    }
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

    this.rooms = _.map(config.rooms, (props) => {
      let room = new Room(this.scene, props);
      if (props.enabled) {
        this.currentRoom = room;
      }
      return room;
    });
    
    this.initVR();

    this.initOverlay();

    if (config.debug) {
      this.stats = new Stats();
      document.body.appendChild(this.stats.dom);
    }

    this.addMouseEvents();
    this.addKeyboardEvents();
    this.animate();
  }

  deselectEverything() {
    _.each(this.rooms, (room) => {
      room.deselectObjects();
    });
  }

  changeRoom(id) {
    this.hideRooms();

    let newRoom = _.filter(this.rooms, (room) => {
      if (room.id == id) {
        console.log('Switching to: ' + room.name);
        return true;
      }
    })[0];
    newRoom.enable();

    this.currentRoom = newRoom;
  }

  hideRooms() {
    _.each(this.rooms, (room) => {
      room.disable();
    });
  }

  showRooms() {
    _.each(this.rooms, (room) => {
      room.enable();
    });
  }

  toggleRoomColor() {
    this.currentRoom.toggleColor();
  }

  initStartPanelGroup() {
    this.startPG = new PanelGroup();
    this.startPG.drawPanels([
      {
        type: 'text',
        value: 'Press Any Button to Start',
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
      width: 'auto', // 0 or 'auto' for auto width, number for fixed width
      thickness: this.bgThickness,
      opacity: 0, // this.bgOpacity,
      padding: this.bgPadding,
      cornerRadius: this.bgCornerRadius,
      color: this.bgColor,
      position: new THREE.Vector3(0, 0, 0),
      align: ['top', 'center'], // 'top' or 'bottom', 'left' or 'center' or 'right'
      fonts: fonts,
      layerSeparation: this.layerSeparation,
    },
    window.fonts);
    this.startPanelsGroup = this.startPG.getPanelsGroup();
    this.startPanelsGroup.position.y = 1;
    this.startPanelsGroup.position.z = -0.75;
    this.scene.add(this.startPanelsGroup);

    let geometry = new THREE.PlaneBufferGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({
      transparent: true,
      map: new THREE.TextureLoader().load('textures/instructions.png'),
    });
    let plane = new THREE.Mesh(geometry, material);
    plane.position.y = 0.25;
    // plane.position.z = -0.25;
    this.startPanelsGroup.add(plane);
  }

  initHypercubePanelGroup() {
    this.hyperPG = new PanelGroup();
    this.hyperPanelsGroup = this.hyperPG.getPanelsGroup();
    this.hyperPanelsGroup.position.y = 0;
    this.hyperPanelsGroup.position.z = 0.75;
    this.hypercubeGroup.add(this.hyperPanelsGroup);
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
  
    // if ((this.overlayIn == true && direction !== 'in') && this.overlayIn == false && direction !== 'out') {
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
    // }
  }

  drawHypercubeText() {
    this.hyperPG.drawPanels([
      {
        type: 'text',
        value: this.rooms[this.currentRoom].text,
        style: {
          size: 7, // cap height in cm
          color: 0xFFFFFF,
          weight: 'bold', // bold or regular
        },
        align: 'center',
        padding: [0, 0, 0, 0], // top, right, bottom, left
      },
    ], 
    {
      width: '150', // 0 or 'auto' for auto width, number for fixed width
      thickness: this.bgThickness,
      opacity: 0, // this.bgOpacity,
      padding: this.bgPadding,
      cornerRadius: this.bgCornerRadius,
      color: this.bgColor,
      position: new THREE.Vector3(0, 0, 0),
      align: ['top', 'center'], // 'top' or 'bottom', 'left' or 'center' or 'right'
      fonts: fonts,
      layerSeparation: this.layerSeparation,
    },
    window.fonts);
  }

  initVR() { // Init vr controls / view, listen for button presses, etc
    this.vr = new VR(this.renderer, this.camera, this.scene, this.controls);
    this.vr.on('isPresenting', this.isVRPresenting.bind(this)); // handle the transition to vr.

    // this.vrPoseControl = new VRPoseControl(this.hypercube, this.vr);
    if (this.vr) {
    //   this.vrPoseControl.startPoseControl();
      this.vr.leftIntersectStream  
        .distinctUntilChanged()
        .filter(x => x)
        .subscribe((x) => {
          this.selectedLeft = x;
          if (this.selectedLeft.length > 0) {
            this.currentRoom.highlightObject(this.selectedLeft[0]);
          } else {
            // this.currentRoom.lowlightObjects();
          }
        });

      this.vr.rightIntersectStream  
        .distinctUntilChanged()
        .filter(x => x)
        .subscribe((x) => {
          this.selectedRight = x;
          if (this.selectedRight.length > 0) {
            this.currentRoom.highlightObject(this.selectedRight[0]);
          } else {
            // this.currentRoom.lowlightObjects();
          }
        });

      this.vr.leftTriggerStream
        .distinctUntilChanged()
        .filter(x => x)
        .subscribe((x) => {
          if (this.waitingRoom) {
            this.startExperience();
          } else {
            if (this.selectedLeft.length > 0) {
              if (!this.currentRoom.getObj(this.selectedLeft[0]).selected) {
                this.currentRoom.selectObject(this.selectedLeft[0]);
              } else {
                this.currentRoom.deselectObject(this.selectedLeft[0]);
              }
            } else {
              this.currentRoom.deselectObjects();
            }
          }
        });

      this.vr.rightTriggerStream
        .distinctUntilChanged()
        .filter(x => x)
        .subscribe((x) => {
          // if (this.waitingRoom) {
          //   this.startExperience();
          // } else {
            if (this.selectedRight.length > 0) {
              if (!this.currentRoom.getObj(this.selectedRight[0]).selected) {
                this.currentRoom.selectObject(this.selectedRight[0]);
              } else {
                this.currentRoom.deselectObject(this.selectedRight[0]);
              }
            } else {
              this.currentRoom.deselectObjects();
            }
          // }
        });

      this.vr.buttonAStream
        .distinctUntilChanged()
        .filter(x => x)
        .subscribe((x) => {
          // if (this.waitingRoom) {
          //   this.startExperience();
          // } else {
            // this.changeRoom(this.rooms[this.currentRoom].name);
          // }
        });

      this.vr.buttonBStream
        .distinctUntilChanged()
        .filter(x => x)
        .subscribe((x) => {
          // if (this.waitingRoom) {
          //   this.startExperience();
          // } else {
            // this.changeRoom(this.rooms[this.currentRoom].name);
          // }
        });

      this.vr.buttonXStream
        .distinctUntilChanged()
        .filter(x => x)
        .subscribe((x) => {
          // if (this.waitingRoom) {
          //   this.startExperience();
          // } else {
            // this.changeRoom(this.rooms[this.currentRoom].name);
          // }
        });

      this.vr.buttonYStream
        .distinctUntilChanged()
        .filter(x => x)
        .subscribe((x) => {
          // if (this.waitingRoom) {
          //   this.startExperience();
          // } else {
            // this.changeRoom(this.rooms[this.currentRoom].name);
          // }
        });

      this.vr.leftStickStream
        // .distinctUntilChanged()
        .filter(x => Math.abs(x[1]) > 0.1)
        .subscribe((x) => {
          // if (this.waitingRoom) {
          //   this.startExperience();
          // } else {
          //   if (x[0] < -0.25) {
          //     this.hyperPG.destroyPanels();
          //     this.rotateHypercube('left', 1000, () => {
          //       this.cubeRotating = false;
          //       (this.currentRoom > 0) ? this.currentRoom-- : this.currentRoom = this.rooms.length-1;
          //       this.drawHypercubeText();
          //     });
          //   } else if (x[0] > 0.25) {
          //     this.hyperPG.destroyPanels();
          //     this.rotateHypercube('right', 1000, () => {
          //       this.cubeRotating = false;
          //       (this.currentRoom < this.rooms.length-1) ? this.currentRoom++ : this.currentRoom = 0;
          //       this.drawHypercubeText();
          //     });
          //   }

          //   if (x[1] < -0.25) {
          //     this.hyperPG.destroyPanels();
          //     this.rotateHypercube('up', 1000, () => {
          //       this.cubeRotating = false;
          //       (this.currentRoom > 0) ? this.currentRoom-- : this.currentRoom = this.rooms.length-1;
          //       this.drawHypercubeText();
          //     });
          //   } else if (x[1] > 0.25) {
          //     this.hyperPG.destroyPanels();
          //     this.rotateHypercube('down', 1000, () => {
          //       this.cubeRotating = false;
          //       (this.currentRoom < this.rooms.length-1) ? this.currentRoom++ : this.currentRoom = 0;
          //       this.drawHypercubeText();
          //     });
          //   }
          // }
        });

      this.vr.rightStickStream
        // .distinctUntilChanged()
        .filter(x => Math.abs(x[1]) > 0.1)
        .subscribe((x) => {
          // if (this.waitingRoom) {
          //   this.startExperience();
          // } else {
          //   if (x[0] > 0.25) {
          //     this.hyperPG.destroyPanels();
          //     this.rotateHypercube('left', 1000, () => {
          //       this.cubeRotating = false;
          //       (this.currentRoom > 0) ? this.currentRoom-- : this.currentRoom = this.rooms.length-1;
          //       this.drawHypercubeText();
          //     });
          //   } else if (x[0] < -0.25) {
          //     this.hyperPG.destroyPanels();
          //     this.rotateHypercube('right', 1000, () => {
          //       this.cubeRotating = false;
          //       (this.currentRoom < this.rooms.length-1) ? this.currentRoom++ : this.currentRoom = 0;
          //       this.drawHypercubeText();
          //     });
          //   }

          //   if (x[1] < -0.25) {
          //     this.hyperPG.destroyPanels();
          //     this.rotateHypercube('up', 1000, () => {
          //       this.cubeRotating = false;
          //       (this.currentRoom > 0) ? this.currentRoom-- : this.currentRoom = this.rooms.length-1;
          //       this.drawHypercubeText();
          //     });
          //   } else if (x[1] > 0.25) {
          //     this.hyperPG.destroyPanels();
          //     this.rotateHypercube('down', 1000, () => {
          //       this.cubeRotating = false;
          //       (this.currentRoom < this.rooms.length-1) ? this.currentRoom++ : this.currentRoom = 0;
          //       this.drawHypercubeText();
          //     });
          //   }
          // }
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

  addRoom(roomName) {
    if (this.room) { this.scene.remove(this.room); }
    if (roomName !== 'Nothing' && roomName !== 'Nowhere') {
      this.room = _.filter(this.rooms, (room) => { return room.name == roomName; })[0].gltf;
      this.room.scale.set(this.rooms[this.currentRoom].scale, this.rooms[this.currentRoom].scale, this.rooms[this.currentRoom].scale);
      this.room.position.copy(this.rooms[this.currentRoom].position.clone());
      this.scene.add(this.room);
      this.lastRoom = roomName;
    }
  }

  // changeRoom(roomName) {
  //   if (this.lastRoom !== roomName && !this.roomAnimating) {
  //     this.roomAnimating = true;
  //     this.fadeOverlay('in', 1000, () => {
  //       this.addRoom(roomName);

  //       this.fadeOverlay('out', 2000, () => {
  //         this.roomAnimating = false;
  //       });
  //     });
  //     this.lastRoom = roomName;
  //   }
  // }

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
    let ambLight = new THREE.AmbientLight(0xFFFFFF);
    ambLight.name = 'Ambient Light';
    this.scene.add(ambLight);
    
    let directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.125);
    directionalLight.name = 'Directional Light';
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

  isVRPresenting(event) { // Adjust scene / clean up listeners when entering / exiting VR
    if (event.display && event.display.isPresenting) { // app is vr mode
      this.controls.enabled = false;
      this.removeMouseEvents(); // make sure mouse events, etc aren't interfering with VR.
      // this.addEnvironment();
    } else { // app is not in vr mode
      this.controls.enabled = true;
      this.addMouseEvents(); // re-enable mouse control when VR is finished
      // this.removeEnvironment();
    }
  }

  addKeyboardEvents() {
    Mousetrap.bind('esc', () => {
      this.deselectEverything();
    });

    Mousetrap.bind('`', () => {
      // Reset Scene
      this.currentRoom.deselectObjects();
      this.overlay.material.uniforms.time.value = 4.7;
      this.overlay.material.uniforms.alpha.value = 1;
      // the void calm
      this.changeRoom(0);
      // this.overlayIn = true;
    });

    Mousetrap.bind('1', () => {
      this.fadeOverlay('out', 2000, () => {})
    });

    Mousetrap.bind('2', () => {
      this.fadeOverlay('in', 2000, () => {
        // this.overlayIn = true;
      });
    });
    
    Mousetrap.bind('3', () => {
      // the drawing room
      this.changeRoom(1);
      this.fadeOverlay('out', 2000, () => {
        // this.overlayIn = false;
      });
    });

    Mousetrap.bind('4', () => {
      this.fadeOverlay('in', 2000, () => {
        // this.overlayIn = true;
      });
    });

    Mousetrap.bind('5', () => {
      // the armoury
      this.changeRoom(2);
      this.fadeOverlay('out', 2000, () => {
        // this.overlayIn = false;
      });
    });

    Mousetrap.bind('6', () => {
      this.fadeOverlay('in', 2000, () => {
        // this.overlayIn = true;
      });
    });

    Mousetrap.bind('7', () => {
      // the void storm
      this.changeRoom(3);
      this.fadeOverlay('out', 2000, () => {
        // this.overlayIn = false;
      });
    });

    Mousetrap.bind('8', () => {
      _scene.currentRoom.interactiveObjects[4].hc.activate()
    });

    Mousetrap.bind('9', () => {
      this.fadeOverlay('in', 2000, () => {
        // this.overlayIn = true;
      });
    });

    Mousetrap.bind('0', () => {
      // the void storm
      this.changeRoom(4);
      this.fadeOverlay('out', 2000, () => {
        // this.overlayIn = false;
      });
    });

    Mousetrap.bind('-', () =>   {
      this.fadeOverlay('in', 2000, () => {
      });
    });

    Mousetrap.bind('=', () =>   {
      this.changeRoom(5);
      this.fadeOverlay('out', 2000, () => {
        // this.overlayIn = false;
      });
    });
  }

  addMouseEvents() { // Make it easy to add mouse events, etc
    this.renderer.domElement.addEventListener('mousemove', e => this.onDocumentMouseMove(e), false);
    this.renderer.domElement.addEventListener('mousedown', e => this.onDocumentMouseDown(e), false);
    this.renderer.domElement.addEventListener('mouseout', e => this.onDocumentMouseUp(e), false);

    document.addEventListener('mouseup', e => this.onDocumentMouseUp(e), false);

    window.addEventListener('resize', e => this.resizeRenderer(e), true);

    this.configControls();
  }

  removeMouseEvents() { // Make it easy to clean up mouse events, etc
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
  
  animate() {
    if (_.every(this.rooms, (room) => { return (room.ready === true); }) && this.ready !== true) {
      this.showReadyMessage(window.fontsReady, true);
      this.ready = true;
    }

    if (this.vr && this.vr.vrEffect) {
      this.vr.vrEffect.requestAnimationFrame(this.animate.bind(this));
    } else {
      requestAnimationFrame(this.animate.bind(this));
    }

    this.controls.update();
    if (TWEEN) { TWEEN.update(); }

    if (this.rooms.length > 0) {
      _.each(this.rooms, (room) => { room.update(); });
    }

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
      this.vr.render(this.vr, _.map(this.currentRoom.interactiveObjects, (obj) => { return obj.object; }));
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
