//Store client config values here

import config from './../../server/config';

const defaults = {
  debug: true, //Includes stats and helpers
  kinecttransport: {
    ports: {
      outgoing: config.kinectTransport.ports.outgoing,
    },
  },
};

module.exports = defaults;
