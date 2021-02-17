// // KinectTransport Source: https://github.com/stimulant/MS-Cube-SDK/tree/research/KinectTransport

// const net = require('net');

// const WebSocketServer = require('ws').Server;

// const config = require('./../config.js').kinectTransport;

// let outgoingSocket = null;
// const outgoingServer = new WebSocketServer({ port: config.ports.outgoing });

// // maximum size of frame is 247815 bytes (512x424 + 7)
// let parseCommandId = -1;
// const parseBuffer = new Buffer(247815);
// let parseDataOffset = 0;
// let parseDataLength = 0;

// const boneList = ['SpineBase', 'SpineMid', 'Neck', 'Head', 'ShoulderLeft',
//   'ElbowLeft', 'WristLeft', 'HandLeft', 'ShoulderRight', 'ElbowRight',
//   'WristRight', 'HandRight', 'HipLeft', 'KneeLeft', 'AnkleLeft',
//   'FootLeft', 'HipRight', 'KneeRight', 'AnkleRight', 'FootRight',
//   'SpineShoulder', 'HandTipLeft', 'ThumbLeft', 'HandTipRight', 'ThumbRight'];

// let lastBodyData = {
//   type: 'bodies',
//   knownBoundries: null,
//   bodies: {
//     count: 0,
//     trackingIds: null,
//     bodies: null,
//   },
// };

// let kinectData = {};

// function readInt64LEasFloat(buffer, offset) {
//   const low = buffer.readUInt32LE(offset + 4);
//   let n = (buffer.readUInt32LE(offset) * 4294967296.0) + low;
//   if (low < 0) {
//     n += 4294967296;
//   }
//   return n;
// }

// function parseBodies(data) {
//   const bodies = [];
//   const trackingIds = [];

//   const knownBoundries = {
//     near: 0,
//     far: 0,
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//   };

//   let offset = 0;

//   // body count
//   const bodyCount = parseInt(data.readUInt16LE(offset), 10); offset += 2;

//   for (let s = 0; s < 6; s++) {
//     const joints = [];
//     let isValid = 0;

//     const trackingId = readInt64LEasFloat(data, offset); offset += 8;
//     // parse joint data
//     for (let j = 0; j < 25; j++) {
//       const pos = {};

//       pos.x = data.readFloatLE(offset).toFixed(5);
//       offset += 4;

//       pos.y = data.readFloatLE(offset).toFixed(5);
//       offset += 4;

//       pos.z = data.readFloatLE(offset).toFixed(5);
//       offset += 4;

//       joints.push({
//         name: boneList[j],
//         position: pos,
//       });

//       if (pos.x !== 0 && pos.y !== 0 && pos.z !== 0) {
//         if (pos.x < knownBoundries.left) { knownBoundries.left = pos.x; }
//         if (pos.x > knownBoundries.right) { knownBoundries.right = pos.x; }
//         if (pos.y < knownBoundries.bottom) { knownBoundries.bottom = pos.y; }
//         if (pos.y > knownBoundries.top) { knownBoundries.top = pos.y; }
//         if (pos.z < knownBoundries.near) { knownBoundries.near = pos.z; }
//         if (pos.z > knownBoundries.far) { knownBoundries.far = pos.z; }

//         isValid++;
//       }
//     }

//     if (isValid > 5 && trackingId !== 0) {
//       trackingIds.push(trackingId);
//       bodies.push({
//         id: trackingId,
//         joints: joints,
//       });
//     }
//   }

//   if (bodies.length > 0) {
//     lastBodyData = {
//       type: 'bodies',
//       knownBoundries: knownBoundries,
//       bodies: {
//         count: bodyCount,
//         trackingIds: trackingIds,
//         bodies: bodies,
//       },
//     };
//   }
//   return lastBodyData;
// }

// function parseDepth(data) {
//   kinectData = {};
//   kinectData.depthBuffer = new Buffer(217088);

//   let offset = 0;

//   kinectData.depthWidth = data.readUInt16LE(offset); offset += 2;
//   kinectData.depthHeight = data.readUInt16LE(offset); offset += 2;

//   // copy buffer data to kinectData
//   // console.log("parsing depth: " + kinectData.depthWidth + ", " + kinectData.depthHeight);
//   data.copy(
//     kinectData.depthBuffer,
//     0,
//     offset,
//     (kinectData.depthWidth * kinectData.depthHeight) + offset,
//   );
//   offset += kinectData.depthWidth * kinectData.depthHeight;

//   return { type: 'depth', depth: { buffer: kinectData.depthBuffer } };
// }

// function parseCommand(data, dataOffset) {
//   // parse out main header
//   parseCommandId = data.readUInt8(dataOffset);
//   dataOffset += 1;
//   if (parseCommandId !== 0 && parseCommandId !== 1) {
//     throw parseCommandId;
//   }
//   parseDataLength = data.readUInt32LE(dataOffset);
//   dataOffset += 4;

//   if (parseDataLength > 247815) {
//     throw parseDataLength;
//   }
//   // console.log("parseCommandId: " + parseCommandId + ", parseDataLength: " + parseDataLength);
//   return dataOffset;
// }

// function parseData(data, dataOffset) {
//   // keep adding to parseBuffer until we have entire frame
//   const dataLength = data.length - dataOffset;
//   const copyLength = Math.min(parseDataLength - parseDataOffset, dataLength);
//   // console.log("parseDataOffset: " + parseDataOffset + " dataOffset: " + dataOffset + " copyLength: " + copyLength);
//   data.copy(parseBuffer, parseDataOffset, dataOffset, dataOffset + copyLength);
//   parseDataOffset += copyLength;
//   return dataOffset + copyLength;
// }

// function listen(port) {
//   net.createServer((socket) => {
//     const remoteAddress = socket.remoteAddress;
//     const remotePort = socket.remotePort;

//     console.log('KinectTransport listening on: ' + port);

//     socket.on('data', (data) => {
//       let dataOffset = 0;
//       let dataLeft = data.length;

//       while (dataLeft > 0) {
//         // if we don't have a command yet, parse it out of data
//         if (parseCommandId === -1) {
//           try {
//             dataOffset = parseCommand(data, dataOffset);
//           } catch (e) {
//             // skip this data message as we are unable to parse a command
//             parseCommandId = -1; parseDataOffset = 0; parseDataLength = 0;
//             dataLeft = 0;
//           }
//         }

//         if (parseCommandId !== -1) {
//           // parse command's data
//           dataOffset = parseData(data, dataOffset);

//           // if we are done receiving the buffer, go ahead and parse bodies or depth
//           if (parseDataOffset >= parseDataLength - 1) {
//             // console.log("parseDataOffset: " + parseDataOffset + " parseDataLength: " + parseDataLength);
//             if (parseCommandId === 0) {
//               kinectData.bodies = parseBodies(parseBuffer);
//             } else if (parseCommandId === 1) {
//               kinectData.depth = parseDepth(parseBuffer);
//             }

//             // reset command
//             parseCommandId = -1; parseDataOffset = 0; parseDataLength = 0;
//           }

//           // check if we have any data left in packet
//           dataLeft -= dataOffset;
//         }
//       }
//     });

//     socket.on('close', (data) => {
//       console.log('CLOSED: ' + remoteAddress + ' ' + remotePort);
//     });
//   }).listen(port, '0.0.0.0');
// }

// function broadcast(port) {
//   outgoingServer.on('connection', (socket) => {
//     outgoingSocket = socket;
//     console.log('KinectTransport broadcasting on: ' + port);
//     // clientSocket.on('message', function incoming(message) {
//     //   console.log('received: %s', message);
//     // });
//   });
// }

// function sendData() {
//   if (outgoingSocket && kinectData) { // broadcast if outgoingSocket and data are available
//     outgoingSocket.send(JSON.stringify(kinectData), (err) => {});
//   }
// }

// if (config.enabled) {
//   listen(config.ports.incoming);
//   broadcast(config.ports.outgoing);
//   // throttle output to 30fps
//   setInterval(sendData, 1000.0 / config.dataRate);
// }
