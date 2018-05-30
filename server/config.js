//Store server config values here

const config = {
  server: {
    port: 9000,
  },
  app: {
    port: 8080,
  },
  favicon: __dirname + './../dist/images/favicon.ico',
  // input sockets
  kinectTransport: {
    enabled: true,
    ports: {
      incoming: 3000,
      outgoing: 9999,
    },
    dataRate: 30.0,
  },
  copy: {
    html: {
      src: './src/html/index.html',
      dest: './dist/index.html',
    },
    fonts: {
      src: './src/fonts',
      dest: './dist/fonts',
    },
    images: {
      src: './src/images',
      dest: './dist/images',
    },
    models: {
      src: './src/models',
      dest: './dist/models',
    },
    textures: {
      src: './src/textures',
      dest: './dist/textures',
    },
    bmfonts: {
      src: './src/bmfont',
      dest: './dist/bmfont',
    },
  },
};

module.exports = config;
