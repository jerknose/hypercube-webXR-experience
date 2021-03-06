//Store client config values here

import config from './../../server/config';

const defaults = {
  debug: false, //Includes stats and helpers
  // kinecttransport: {
  //   ports: {
  //     outgoing: config.kinectTransport.ports.outgoing,
  //   },
  // },
  rooms: [
    {
      id: 0, name: 'The Void Calm',
      type: 'empty',
      enabled: true, colored: false,
      bwURL: '', colorURL: '',
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(),
      scale: 0,
      text: {
        content: 'The ancient lost study of the Hypercube shows that Geometry is an exercise in "direct perception" a way of seeing into the heart of reality and beyond it to the realm of ideal or ultimate truths. When we learn to visualize we wake up an inner sense that there is a higher, more real dimensionally complex world above our own. Through proper practice the hypernaut can begin to previously invisible 4d objects overlaid in 3d space, and even to pass between those dimensions.',
        // position: new THREE.Vector3(0.25, 1.25, -0.9),
        position: new THREE.Vector3(0.35, 1.45, -0.9),
        rotation: new THREE.Euler(0, -0.1, 0),
        width: 75,
      },
      objects: [
        {
          type: 'chair',
          active: true, colored: true,
          interactive: false,
          scale:  new THREE.Vector3(1, 1, 1),
          bwURL: '', colorURL: 'models/gltf/chair/scene.gltf',
          position: new THREE.Vector3(-0.1625, 0.025, 0.899999),
          rotation: new THREE.Euler(0, 2.1000000000000005, 0),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(1, 1, 1),
          selectedPosition: new THREE.Vector3(),
          selectedRotation: new THREE.Euler(),
          selectedScale: new THREE.Vector3(1, 1, 1),
        },
        {
          type: 'pedestal',
          active: true, colored: true,
          interactive: false,
          scale:  new THREE.Vector3(1, 1, 1),
          bwURL: '', colorURL: 'models/gltf/pedestal/scene.gltf',
          position: new THREE.Vector3(-1.5, -0.2, -1.2),
          rotation: new THREE.Euler(),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(1, 1, 1),
          selectedPosition: new THREE.Vector3(),
          selectedRotation: new THREE.Euler(),
          selectedScale: new THREE.Vector3(1, 1, 1),
        },
        {
          type: 'book',
          active: true, colored: true,
          interactive: true,
          scale:  new THREE.Vector3(0.010, 0.010, 0.010),
          bwURL: 'models/gltf/book_open/scene.gltf', colorURL: 'models/gltf/book_open_color/scene.gltf',
          position: new THREE.Vector3(0, -0.0009, -1),
          rotation: new THREE.Euler(-3.325, -4.699, -3),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(0.0107, 0.0107, 0.0107),
          selectedPosition: new THREE.Vector3(-0.35, 1.199, -0.949),
          selectedRotation: new THREE.Euler(0.175, 1.475, -4.9),
          selectedScale: new THREE.Vector3(0.010, 0.010, 0.010),
        },
        {
          type: 'cube', 
          enabled: true, colored: true,
          interactive: false,
          active: true,
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
          position: new THREE.Vector3(-1, 1, -2),
          rotation: new THREE.Euler(),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(0.8, 0.8, 0.8),
        },
        {
          type: 'cube',
          enabled: false, colored: true,
          interactive: false,
          active: false,
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
          position: new THREE.Vector3(0, 1, -2),
          rotation: new THREE.Euler(),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(0.8, 0.8, 0.8),
        },
        {
          type: 'cube',
          enabled: false, colored: true,
          interactive: false,
          active: false,
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
          position: new THREE.Vector3(1, 1, -2),
          rotation: new THREE.Euler(),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(0.8, 0.8, 0.8),
        },
      ],
      musicURL: '',
    },
    {
      id: 1, name: 'The Drawing Room',
      type: 'gltf',
      text: {
        content: 'Do you remember the first I ever played that song for you? I could feel the corners of our Euclidian Geometry melting along with my heart. I\'ve encoded the key to the next room in the instrument I played for you. Come to me darling!',
        // position: new THREE.Vector3(0.25, 1.25, -0.9),
        position: new THREE.Vector3(0.35, 1.45, -0.9),
        rotation: new THREE.Euler(0, -0.1, 0),
        width: 75,
      },
      enabled: false, colored: false,
      bwURL: 'models/gltf/the_great_drawing_room/scene.gltf',
      colorURL: 'models/gltf/the_great_drawing_room/textures/model_Material_u1_v1_baseColor.jpeg',
      position: new THREE.Vector3(-1.6, -0.57, -4.5),
      rotation: new THREE.Euler(0, 4.5, 0),
      scale: 0.5,
      objects: [
        {
          type: 'cube',
          active: true, colored: true,
          interactive: false,
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
          position: new THREE.Vector3(3.75, 2, -0.75),
          rotation: new THREE.Euler(),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(0.5, 0.5, 0.5),
          selectedPosition: new THREE.Vector3(0.5, 1.55, -1.300),
          selectedRotation: new THREE.Euler(),
          selectedScale: new THREE.Vector3(0.5, 0.5, 0.5),
        },
        {
          type: 'book',
          active: true, colored: true,
          interactive: true,
          scale:  new THREE.Vector3(0.010, 0.010, 0.010),
          bwURL: 'models/gltf/book_open/scene.gltf', colorURL: 'models/gltf/book_open_color/scene.gltf',
          position: new THREE.Vector3(-3.225, 1.199, -5.149),
          rotation: new THREE.Euler(-1.825, -4.699, -3.000),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(0.0107, 0.0107, 0.0107),
          selectedPosition: new THREE.Vector3(-0.35, 1.199, -0.949),
          selectedRotation: new THREE.Euler(0.175, 1.475, -4.9),
          selectedScale: new THREE.Vector3(0.010, 0.010, 0.010),
        },
        {
          type: 'violin',
          active: true, colored: true,
          interactive: true,
          scale: new THREE.Vector3(0.01, 0.01, 0.01),
          bwURL: 'models/gltf/violin/scene.gltf', colorURL: 'models/gltf/violin_color/scene.gltf',
          position: new THREE.Vector3(4, 1, -3.65),
          rotation: new THREE.Euler(0, -1, 0),
          highlightOffset: new THREE.Vector3(0, 0, -0.025), // 0.9875
          highlightScale: new THREE.Vector3(0.0106, 0.0106, 0.0106),
          selectedPosition: new THREE.Vector3(-0.5, 1.149, -1),
          selectedRotation: new THREE.Euler(0, 0.199, 0),
          selectedScale: new THREE.Vector3(0.01, 0.01, 0.01),
        },
        {
          type: 'mandolin',
          active: true, colored: true,
          interactive: true,
          scale: new THREE.Vector3(0.0015, 0.0015, 0.0015),
          bwURL: 'models/gltf/f-style-mandolin/scene.gltf', colorURL: 'models/gltf/f-style-mandolin_color/scene.gltf',
          position: new THREE.Vector3(-4.4, 0.25, -4.5),
          rotation: new THREE.Euler(-4.6, 3.2, 7.79),
          highlightOffset: new THREE.Vector3(-4.412, 0.25, -5),
          highlightScale: new THREE.Vector3(0.001544, 0.001544, 0.001544),
          selectedPosition: new THREE.Vector3(-0.5, 1.4, -1),
          selectedRotation: new THREE.Euler(-4.699, 3.2, 6.490),
          selectedScale: new THREE.Vector3(0.0012, 0.0012, 0.0012),
        },
        {
          type: 'flute',
          active: true, colored: true,
          interactive: true,
          scale: new THREE.Vector3(0.1, 0.1, 0.1),
          bwURL: 'models/gltf/maori_nguru_nose_flute/scene.gltf', colorURL: 'models/gltf/maori_nguru_nose_flute_color/scene.gltf',
          position: new THREE.Vector3(2.05, 0.925, -0.200),
          rotation: new THREE.Euler(0, 0, 1.5),
          highlightOffset: new THREE.Vector3(1.75, 0.925, -2),
          highlightScale: new THREE.Vector3(0.104, 0.104, 0.104),
          selectedPosition: new THREE.Vector3(0.099, 2.350, -0.500),
          selectedRotation: new THREE.Euler(-0.899, 3.600, 2.600),
          selectedScale: new THREE.Vector3(0.15, 0.15, 0.15),
        },
      ],
      musicURL: '',
    },
    {
      id: 2, name: 'The Armoury',
      type: 'gltf',
      text: {
        content: 'Do you remember the battle my darling? We just escaped Hypernia with our lives. You were brave to defend me from those pirates. the decree that life feeds on life seems to be written in the orbit of the planets themselves...  I have put the key in the weapon you used that day. - Yvonne',
        // position: new THREE.Vector3(-0.100, -4.163, -0.049),
        position: new THREE.Vector3(0.25, 1.25, -0.889),
        rotation: new THREE.Euler(0, -0.1, 0),
        width: 75,
      },
      enabled: false, colored: false,
      bwURL: 'models/gltf/the_armoury/scene.gltf', colorURL: 'models/gltf/the_armoury/textures/model_Material_u1_v1_baseColor_color.jpeg',
      position: new THREE.Vector3(0.2, -0.35, -2.4),
      rotation: new THREE.Euler(0, 0.8, 0),
      scale: 0.28,
      objects: [
        {
          type: 'cube',
          active: true, colored: true,
          interactive: true,
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
          position: new THREE.Vector3(-3.5, 2, -0.5),
          rotation: new THREE.Euler(),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(0.6, 0.6, 0.6),
          selectedPosition: new THREE.Vector3(-3.5, 2, -0.5),
          selectedRotation: new THREE.Euler(),
          selectedScale: new THREE.Vector3(0.5, 0.5, 0.5),
        },
        {
          type: 'book',
          active: true, colored: true,
          interactive: true,
          scale:  new THREE.Vector3(0.010, 0.010, 0.010),
          bwURL: 'models/gltf/book_open/scene.gltf', colorURL: 'models/gltf/book_open_color/scene.gltf',
          position: new THREE.Vector3(0.375, 1.199, -2.449),
          rotation: new THREE.Euler(0.175, -1.700, 0),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(0.0107, 0.0107, 0.0107),
          selectedPosition: new THREE.Vector3(-0.35, 1.199, -0.949),
          selectedRotation: new THREE.Euler(0.175, 1.475, -4.9),
          selectedScale: new THREE.Vector3(0.010, 0.010, 0.010),
        },
        {
          type: 'sword',
          active: true, colored: true,
          interactive: true,
          scale: new THREE.Vector3(0.002, 0.002, 0.002),
          bwURL: 'models/gltf/kama_dagger/scene.gltf', colorURL: 'models/gltf/kama_dagger_color/scene.gltf',
          position: new THREE.Vector3(2.55, 1.5, 1.16),
          rotation: new THREE.Euler(0, Math.PI/2, Math.PI/2),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(0.002, 0.002, 0.002),
          selectedPosition: new THREE.Vector3(0, 1.5, -1),
          selectedRotation: new THREE.Euler(0, Math.PI/2, Math.PI/2),
          selectedScale: new THREE.Vector3(0.002, 0.002, 0.002,),
        },
        {
          type: 'gun',
          active: true, colored: true,
          interactive: true,
          scale: new THREE.Vector3(0.01, 0.01, 0.01),
          bwURL: 'models/gltf/flintlock_pistol/scene.gltf', colorURL: 'models/gltf/flintlock_pistol_color/scene.gltf',
          position: new THREE.Vector3(2.600, 0.675, -4.349),
          rotation: new THREE.Euler(1.570, 0, -3.085),
          highlightOffset: new THREE.Vector3(0.8, 1.01, -2.37),
          highlightScale: new THREE.Vector3(0.0105, 0.0105, 0.0105),
          selectedPosition: new THREE.Vector3(0, 1.275, -1),
          selectedRotation: new THREE.Euler(-3.23, 0, -3.085),
          selectedScale: new THREE.Vector3(0.01, 0.01, 0.01),
        },
        {
          type: 'axe',
          active: true, colored: true,
          interactive: true,
          scale: new THREE.Vector3(0.005, 0.005, 0.005),
          bwURL: 'models/gltf/decorative_battle_axe/scene.gltf', colorURL: 'models/gltf/decorative_battle_axe_color/scene.gltf',
          position: new THREE.Vector3(-2.1, 1.55, -3.25),
          rotation: new THREE.Euler(0, 0, Math.PI/2-0.34),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(0.005, 0.005, 0.005),
          selectedPosition: new THREE.Vector3(0, 1.55, -1),
          selectedRotation: new THREE.Euler(),
          selectedScale: new THREE.Vector3(0.005, 0.005, 0.005),
        },
      ],
      musicURL: '',
    },
    {
      id: 3, name: 'The Void Storm',
      type: 'empty',
      enabled: false, colored: false,
      bwURL: '', colorURL: '',
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(),
      scale: 0,
      objects: [
        {
          type: 'chair',
          active: true, colored: true,
          interactive: false,
          scale:  new THREE.Vector3(1, 1, 1),
          bwURL: '', colorURL: 'models/gltf/chair/scene.gltf',
          position: new THREE.Vector3(-0.1625, 0.025, 0.899999),
          rotation: new THREE.Euler(0, 2.1000000000000005, 0),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(1, 1, 1),
          selectedPosition: new THREE.Vector3(),
          selectedRotation: new THREE.Euler(),
          selectedScale: new THREE.Vector3(1, 1, 1),
        },
        {
          type: 'pedestal',
          active: true, colored: true,
          interactive: false,
          scale:  new THREE.Vector3(1, 1, 1),
          bwURL: '', colorURL: 'models/gltf/pedestal/scene.gltf',
          position: new THREE.Vector3(-1.5, -0.2, -1.2),
          rotation: new THREE.Euler(),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(1, 1, 1),
          selectedPosition: new THREE.Vector3(),
          selectedRotation: new THREE.Euler(),
          selectedScale: new THREE.Vector3(1, 1, 1),
        },
        {
          type: 'cube', 
          enabled: true, colored: true,
          interactive: false,
          active: true,
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
          position: new THREE.Vector3(-1, 1, -2),
          rotation: new THREE.Euler(),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(0.8, 0.8, 0.8),
        },
        {
          type: 'cube',
          enabled: false, colored: true,
          interactive: false,
          active: true,
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
          position: new THREE.Vector3(0, 1, -2),
          rotation: new THREE.Euler(),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(0.8, 0.8, 0.8),
        },
        {
          type: 'cube',
          enabled: false, colored: true,
          interactive: false,
          active: false,
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
          position: new THREE.Vector3(1, 1, -2),
          rotation: new THREE.Euler(),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(0.8, 0.8, 0.8),
        },
      ],
      musicURL: '',
    },
    {
      id: 4, name: 'Castle Batenburg',
      type: 'gltf',
      enabled: false, colored: true,
      bwURL: 'models/gltf/castle_batenburg_netherlands/scene.gltf', colorURL: '',
      position: new THREE.Vector3(5, 11.05, 15),
      rotation: new THREE.Euler(),
      scale: 1.528,
      objects: [
        {
          type: 'chair',
          active: true, colored: true,
          interactive: false,
          scale:  new THREE.Vector3(1, 1, 1),
          bwURL: '', colorURL: 'models/gltf/chair/scene.gltf',
          position: new THREE.Vector3(-0.1625, 0.025, 0.899999),
          rotation: new THREE.Euler(0, 2.1000000000000005, 0),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(1, 1, 1),
          selectedPosition: new THREE.Vector3(),
          selectedRotation: new THREE.Euler(),
          selectedScale: new THREE.Vector3(1, 1, 1),
        },
        {
          type: 'pedestal',
          active: true, colored: true,
          interactive: false,
          scale:  new THREE.Vector3(1, 1, 1),
          bwURL: '', colorURL: 'models/gltf/pedestal/scene.gltf',
          position: new THREE.Vector3(-1.5, -0.2, -1.2),
          rotation: new THREE.Euler(),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(1, 1, 1),
          selectedPosition: new THREE.Vector3(),
          selectedRotation: new THREE.Euler(),
          selectedScale: new THREE.Vector3(1, 1, 1),
        },
        // {
        //   type: 'kinect', active: false,
        //   colored: true,
        //   scale: 1,
        //   position: new THREE.Vector3(0, 1, -2),
        //   rotation: new THREE.Euler(),
        //   highlightOffset: new THREE.Vector3(),
        //   highlightScale: new THREE.Vector3(0.8, 0.8, 0.8),
        // },
      ],
      musicURL: '',
    },
  ],
  fonts: [
    {
        name: 'bold',
        json: 'bmFont/lato-bold.json',
        png: 'bmFont/lato-bold.png',
    },
    {
        name: 'regular',
        json: 'bmFont/lato-regular.json',
        png: 'bmFont/lato-regular.png',
    },
  ],
};

module.exports = defaults;
