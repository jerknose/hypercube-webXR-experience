//Store client config values here

import config from './../../server/config';

const defaults = {
  debug: true, //Includes stats and helpers
  kinecttransport: {
    ports: {
      outgoing: config.kinectTransport.ports.outgoing,
    },
  },
  rooms: [
    {
      id: 0, name: 'The Void Calm',
      type: 'empty',
      enabled: true, colored: false,
      bwURL: '', colorURL: '',
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(),
      scale: 0,
      objects: [
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
        content: 'At quite uncertain times and places, The atoms left their heavenly path,',
        // position: new THREE.Vector3(-0.100, -4.163, -0.049),
        position: new THREE.Vector3(0.25, 1.25, -0.9),
        rotation: new THREE.Euler(0, -0.1, 0),
        width: 50,
      },
      enabled: false, colored: false,
      bwURL: 'models/gltf/the_great_drawing_room/scene.gltf', colorURL: 'models/gltf/the_great_drawing_room/textures/model_Material_u1_v1_baseColor_color.jpeg',
      position: new THREE.Vector3(-1.6, -0.57, -5),
      rotation: new THREE.Euler(0, 4.5, 0),
      scale: 0.5,
      objects: [
        {
          type: 'cube', active: true,
          colored: true,
          scale: new THREE.Vector3(0.5, 0.5, 0.5),
          position: new THREE.Vector3(3.75, 2, -1.25),
          rotation: new THREE.Euler(),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(0.5, 0.5, 0.5),
          selectedPosition: new THREE.Vector3(0, 1.55, -1),
          selectedRotation: new THREE.Euler(),
          selectedScale: new THREE.Vector3(0.5, 0.5, 0.5),
        },
        {
          type: 'book', active: false,
          colored: true,
          scale:  new THREE.Vector3(0.010, 0.010, 0.010),
          bwURL: 'models/gltf/book_open/scene.gltf', colorURL: 'models/gltf/book_open_color/scene.gltf',
          position: new THREE.Vector3(-3.225, 1.199, -5.649),
          rotation: new THREE.Euler(-1.825, -4.699, -3.000),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(0.0107, 0.0107, 0.0107),
          selectedPosition: new THREE.Vector3(-0.35, 1.199, -0.949),
          selectedRotation: new THREE.Euler(0.175, 1.475, -4.9),
          selectedScale: new THREE.Vector3(0.010, 0.010, 0.010),
        },
        {
          type: 'violin', active: false,
          colored: true,
          scale: new THREE.Vector3(0.01, 0.01, 0.01),
          bwURL: 'models/gltf/violin/scene.gltf', colorURL: 'models/gltf/violin_color/scene.gltf',
          position: new THREE.Vector3(4, 1, -4.15),
          rotation: new THREE.Euler(0, -1, 0),
          highlightOffset: new THREE.Vector3(0, 0, -0.025), // 0.9875
          highlightScale: new THREE.Vector3(0.0106, 0.0106, 0.0106),
          selectedPosition: new THREE.Vector3(0, 1.55, -1),
          selectedRotation: new THREE.Euler(0, -1, 0),
          selectedScale: new THREE.Vector3(0.01, 0.01, 0.01),
        },
        {
          type: 'mandolin', active: false,
          colored: true,
          scale: new THREE.Vector3(0.0015, 0.0015, 0.0015),
          bwURL: 'models/gltf/f-style-mandolin/scene.gltf', colorURL: 'models/gltf/f-style-mandolin_color/scene.gltf',
          position: new THREE.Vector3(-4.4, 0.25, -5),
          rotation: new THREE.Euler(-4.6, 3.2, 7.79),
          highlightOffset: new THREE.Vector3(-4.412, 0.25, -5),
          highlightScale: new THREE.Vector3(0.001544, 0.001544, 0.001544),
          selectedPosition: new THREE.Vector3(0, 1.55, -1),
          selectedRotation: new THREE.Euler(-4.6, 3.2, 7.79),
          selectedScale: new THREE.Vector3(0.002, 0.002, 0.002),
        },
        {
          type: 'flute', active: false,
          colored: true,
          scale: new THREE.Vector3(0.1, 0.1, 0.1),
          bwURL: 'models/gltf/maori_nguru_nose_flute/scene.gltf', colorURL: 'models/gltf/maori_nguru_nose_flute_color/scene.gltf',
          position: new THREE.Vector3(1.75, 0.925, -0.8),
          rotation: new THREE.Euler(0, 0, 1.5),
          highlightOffset: new THREE.Vector3(1.75, 0.925, -2),
          highlightScale: new THREE.Vector3(0.104, 0.104, 0.104),
          selectedPosition: new THREE.Vector3(0, 1.55, -1),
          selectedRotation: new THREE.Euler(0, 0, 1.5),
          selectedScale: new THREE.Vector3(0.15, 0.15, 0.15),
        },
      ],
      musicURL: '',
    },
    {
      id: 2, name: 'The Armoury',
      type: 'gltf',
      text: {
        content: 'At quite uncertain times and places, The atoms left their heavenly path,',
        // position: new THREE.Vector3(-0.100, -4.163, -0.049),
        position: new THREE.Vector3(0.25, 1.25, -0.9),
        rotation: new THREE.Euler(0, -0.1, 0),
        width: 50,
      },
      enabled: false, colored: false,
      bwURL: 'models/gltf/the_armoury/scene.gltf', colorURL: 'models/gltf/the_armoury/textures/model_Material_u1_v1_baseColor_color.jpeg',
      position: new THREE.Vector3(0.2, -0.35, -2.4),
      rotation: new THREE.Euler(0, 0.8, 0),
      scale: 0.28,
      objects: [
        {
          type: 'cube', active: true,
          colored: true,
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
          type: 'book', active: false,
          colored: true,
          scale:  new THREE.Vector3(0.010, 0.010, 0.010),
          bwURL: 'models/gltf/book_open/scene.gltf', colorURL: 'models/gltf/book_open_color/scene.gltf',
          position: new THREE.Vector3(0.375, 1.199, -2.650),
          rotation: new THREE.Euler(0.175, -1.700, 0),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(0.0107, 0.0107, 0.0107),
          selectedPosition: new THREE.Vector3(-0.35, 1.199, -0.949),
          selectedRotation: new THREE.Euler(0.175, 1.475, -4.9),
          selectedScale: new THREE.Vector3(0.010, 0.010, 0.010),
        },
        {
          type: 'sword', active: false,
          colored: true,
          scale: new THREE.Vector3(0.002, 0.002, 0.002),
          bwURL: 'models/gltf/kama_dagger/scene.gltf', colorURL: 'models/gltf/kama_dagger_color/scene.gltf',
          position: new THREE.Vector3(2.55, 1.5, 0.96),
          rotation: new THREE.Euler(0, Math.PI/2, Math.PI/2),
          highlightOffset: new THREE.Vector3(),
          highlightScale: new THREE.Vector3(0.002, 0.002, 0.002),
          selectedPosition: new THREE.Vector3(0, 1.5, -1),
          selectedRotation: new THREE.Euler(0, Math.PI/2, Math.PI/2),
          selectedScale: new THREE.Vector3(0.002, 0.002, 0.002,),
        },
        {
          type: 'gun', active: false,
          colored: true,
          scale: new THREE.Vector3(0.01, 0.01, 0.01),
          bwURL: 'models/gltf/flintlock_pistol/scene.gltf', colorURL: 'models/gltf/flintlock_pistol_color/scene.gltf',
          position: new THREE.Vector3(2.600, 0.675, -4.649),
          rotation: new THREE.Euler(1.570, 0, -3.085),
          highlightOffset: new THREE.Vector3(0.8, 1.01, -2.37),
          highlightScale: new THREE.Vector3(0.0105, 0.0105, 0.0105),
          selectedPosition: new THREE.Vector3(0, 0.675, -1),
          selectedRotation: new THREE.Euler(1.570, 0, -3.085),
          selectedScale: new THREE.Vector3(0.01, 0.01, 0.01),
        },
        {
          type: 'axe', active: false,
          colored: true,
          scale: new THREE.Vector3(0.005, 0.005, 0.005),
          bwURL: 'models/gltf/decorative_battle_axe/scene.gltf', colorURL: 'models/gltf/decorative_battle_axe_color/scene.gltf',
          position: new THREE.Vector3(-2.1, 1.55, -3.45),
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
      enabled: true, colored: false,
      bwURL: '', colorURL: '',
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(),
      scale: 0,
      objects: [
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
          enabled: true, colored: true,
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
    // {
    //   id: 4, name: 'Mow Cop Castle',
    //   type: 'gltf',
    //   enabled: false, colored: true,
    //   bwURL: '', colorURL: 'models/gltf/mow_cop_castle/textures/model_Material_u1_v1_baseColor.jpeg',
    //   position: new THREE.Vector3(-34.99, -27.59, -26.4),
    //   rotation: new THREE.Euler(0, -1.43, 0),
    //   scale: 2,
    //   objects: [
    //     {
    //       type: 'kinect', active: false,
    //       colored: true,
    //       scale: 1,
    //       position: new THREE.Vector3(0,   1, -2),
    //       rotation: new THREE.Euler(),
    //       highlightOffset: new THREE.Vector3(),
    //       highlightScale: new THREE.Vector3(0.8, 0.8, 0.8),
    //     },
    //   ],
    //   musicURL: '',
    // },
  ],
  fonts: [
    {
        name: 'bold',
        json: '/bmFont/lato-bold.json',
        png: '/bmFont/lato-bold.png',
    },
    {
        name: 'regular',
        json: '/bmFont/lato-regular.json',
        png: '/bmFont/lato-regular.png',
    },
  ],
};

module.exports = defaults;
