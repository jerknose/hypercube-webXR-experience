const config = require('./config.js');

// init kinect server
if (config.kinectTransport.enabled) {
  const KTServer = require('./sockets/KinectTransport');
}