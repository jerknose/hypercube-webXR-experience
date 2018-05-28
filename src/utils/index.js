import loadFont from 'load-bmfont';

class Utils {
  constructor() {
  }

  loadFonts(fontList, callback) {
    window.fonts = fontList;
    _.each(fontList, (fontDef) => {
        loadFont(fontDef.json, (err, font) => {
            if (err) throw err;
            THREE.ImageUtils.loadTexture(fontDef.png, undefined, (texture) => {
                fontDef.font = font;
                fontDef.texture = texture;
                if (_.filter(fontList, 'font').length === fontList.length) {
                    window.fontsReady = true;
                    callback(true);
                }
            });
        });
    });
  }

  loadObj(url, callback) { // Simple interface for loading OBJ files
    new THREE.OBJLoader(new THREE.LoadingManager()).load(url, callback, (xhr) => {
      if (xhr.lengthComputable) {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        // console.log(Math.round(percentComplete, 2) + '% downloaded');
      }
    }, (xhr) => {
      // console.log('OBJLoader Error: ', xhr);
    });
  }

  loadCollada(url, cb) { // Simple interface for loading DAE files
    new THREE.ColladaLoader(new THREE.LoadingManager()).load(url, callback);
  }

  loadGLTF(url, callback) { // Simple interface for loading gltf files
    new THREE.GLTFLoader().load(url, callback, (xhr) => {
      if (xhr.lengthComputable) {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        // console.log(Math.round(percentComplete, 2) + '% downloaded');
      }
    }, (xhr) => {
      // console.log('OBJLoader Error: ', xhr);
    });
  }
}

export default Utils;