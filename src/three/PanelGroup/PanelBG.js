import Shapes from './Shapes';

class PanelBG {
  constructor(shape, width, height, padding, cornerRadius, color, opacity, thickness, outline) {
    this.shapes = new Shapes();
    // make shape to extrude
    let bgShape = null;
    switch (shape) {
      default:
      case 'rect':
        bgShape = this.shapes.drawRectangleShape(
          new THREE.Shape(),
          width,
          height,
          outline,
        );
        break;
      case 'roundedRect':
        bgShape = this.shapes.drawRoundedRectangleShape(
          new THREE.Shape(),
          width,
          height,
          [0, 0, 0, 0],
          cornerRadius,
          outline,
        );
        break;
      case 'heart':
        bgShape = this.shapes.drawHeartShape(
          new THREE.Shape(),
        );
        break;
    }

    // extrude geo
    const bgGeo = new THREE.ExtrudeBufferGeometry(
      bgShape,
      {
        bevelEnabled: false,
        bevelSegments: 0,
        steps: 1,
        amount: thickness,
      },
    );

    const bgMesh = new THREE.Mesh(bgGeo, new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: opacity,
      // depthWrite: false,
    }));
    bgMesh.defaults = {
      opacity: opacity,
    };

    bgMesh.geometry.computeBoundingBox();
    // bgMesh.position.y = -bgMesh.geometry.boundingBox.max.y;

    return bgMesh;
  }
}

export default PanelBG;
