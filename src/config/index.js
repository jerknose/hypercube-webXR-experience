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
      colorURL: '', bwURL: '',
      position: new THREE.Vector3(0, -0.575, 0), scale: 0.5,
      objects: [
        { type: 'cube', active: true },
        { type: 'cube', active: false },
        { type: 'cube', active: false },
      ],
      musicURL: '',
    },
    {
      id: 1, name: 'The Armoury',
      type: 'gltf',
      enabled: false, colored: false,
      colorURL: 'models/gltf/the_armoury/scene.gltf', bwURL: 'models/gltf/the_armoury/textures/model_Material_u1_v1_baseColor_bw.jpeg',
      position: new THREE.Vector3(0, -0.575, 0), scale: 0.5,
      objects: [
        { type: 'cube', active: false },
        { type: 'sword', active: false },
        { type: 'musket', active: false },
        { type: 'axe', active: false },
      ],
      musicURL: '',
    },
    {
      id: 2, name: 'The Drawing Room',
      type: 'gltf',
      enabled: false, colored: false,
      colorURL: 'models/gltf/the_great_drawing_room/scene.gltf', bwURL: 'models/gltf/the_great_drawing_room/textures/model_Material_u1_v1_baseColor_bw.jpeg',
      position: new THREE.Vector3(0, -0.32, 0), scale: 0.3,
      objects: [
        { type: 'cube', active: false },
        { type: 'lute', active: false },
        { type: 'flute', active: false },
        { type: 'harp', active: false },
      ],
      musicURL: '',
    },
    {
      id: 3, name: 'The Void Storm',
      type: 'empty',
      enabled: false, colored: false,
      colorURL: '', bwURL: '',
      position: new THREE.Vector3(0, -0.345, 0), scale: 0.3,
      objects: [
        { type: 'cube', active: true },
        { type: 'cube', active: true },
        { type: 'cube', active: false },
      ],
      musicURL: '',
    },
    {
      id: 4, name: 'Mow Cop Castle',
      type: 'gltf',
      enabled: false, colored: true,
      colorURL: 'models/gltf/mow_cop_castle/scene.gltf', bwURL: '',
      position: new THREE.Vector3(0, 0, 0), scale: 1,
      objects: [
        { type: 'cube', active: false },
        { type: 'lute', active: false },
        { type: 'flute', active: false },
        { type: 'harp', active: false },
      ],
      musicURL: '',
    },
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
