class Shapes {
  drawRectangleShape(shape, width, height, padding, outline) {
    let s = this.drawRectangle(shape, 0, 0, width, height);
    let outlineSize = 0.01;
    if (outline === true) {
      let holeW = width-outlineSize;
      let holeH = height-outlineSize;
      s.holes = [this.drawRectangle(new THREE.Shape(), (width-holeW)/2, (height-holeH)/2, holeW, holeH)]
    }
    return s;
  }
 
  drawRectangle(shape, x, y, width, height) {
    shape.moveTo(
      0 + x,
      0 + y,
    );
    shape.lineTo(
      width + x,
      0 + y,
    );
    shape.lineTo(
      width + x,
      height + y,
    );
    shape.lineTo(
      0 + x,
      height + y,
    );
    return shape;
  }

  drawRoundedRectangleShape(shape, width, height, padding, radii, outline) {
    // padding: top, right, bottom, left
    let s = this.drawRoundedRectangle(shape, 0, 0, width, height, padding, radii);
    let outlineSize = 0.01;
    if (outline === true) {
      let holeW = width - outlineSize;
      let holeH = height - outlineSize;
      s.holes = [this.drawRoundedRectangle(new THREE.Shape(), (width-holeW)/2, (height-holeH)/2, holeW, holeH, padding, radii)]
    }
    return s;
  }

  drawRoundedRectangle(shape, x, y, width, height, padding, radii) {
    // padding: top, right, bottom, left
    shape.moveTo(x, y);
    shape.lineTo(
      0 + x,
      ((height + (padding[0] + padding[2])) - radii[0]) + y,
    );
    shape.quadraticCurveTo( // top left curve
      0 + x,
      (height + (padding[0] + padding[2])) + y,
      radii[0] + x,
      (height + (padding[0] + padding[2])) + y,
    );

    shape.lineTo(
      ((width + (padding[1] + padding[3])) - radii[1]) + x,
      (height + (padding[0] + padding[2])) + y,
    );
    shape.quadraticCurveTo( // top right curve
      (width + (padding[1] + padding[3])) + x,
      (height + (padding[0] + padding[2])) + y,
      (width + (padding[1] + padding[3])) + x,
      ((height + (padding[0] + padding[2])) - radii[1]) + y,
    );

    shape.lineTo(
      (width + (padding[1] + padding[3])) + x,
      radii[2] + y,
    );
    shape.quadraticCurveTo(
      (width + (padding[1] + padding[3])) + x,
      0 + y,
      ((width + (padding[1] + padding[3])) - radii[2]) + x,
      0 + y,
    );

    shape.lineTo(
      radii[3] + x,
      0 + y,
    );
    shape.quadraticCurveTo(
      0 + x,
      0 + y,
      0 + x,
      radii[3] + y,
    );
    return shape;
  }

  /* Shapes for Charts */
  drawEnvelopeShape(shape) {
    shape.moveTo(35.3, 0.0);
    shape.lineTo(3.9, 0.0);
    shape.bezierCurveTo(1.8, 0.0, 0.0, 1.8, 0.0, 3.9);
    shape.lineTo(0.0, 27.4);
    shape.bezierCurveTo(0.0, 29.6, 1.8, 31.3, 3.9, 31.3);
    shape.lineTo(35.3, 31.3);
    shape.bezierCurveTo(37.4, 31.3, 39.2, 29.6, 39.2, 27.4);
    shape.lineTo(39.2, 3.9);
    shape.bezierCurveTo(39.2, 1.8, 37.4, 0.0, 35.3, 0.0);
    shape.lineTo(35.3, 0.0);

    const hole = new THREE.Shape();
    hole.moveTo(35.3, 7.8);
    hole.lineTo(19.6, 17.6);
    hole.lineTo(3.9, 7.8);
    hole.lineTo(3.9, 3.9);
    hole.lineTo(19.6, 13.7);
    hole.lineTo(35.3, 3.9);
    hole.lineTo(35.3, 7.8);
    hole.lineTo(35.3, 7.8);

    shape.holes = [hole];

    return shape;
  }

  drawVideoShape(shape) {
    shape.moveTo(31.3, 0.0);
    shape.lineTo(35.3, 7.8);
    shape.lineTo(29.4, 7.8);
    shape.lineTo(25.5, 0.0);
    shape.lineTo(21.5, 0.0);
    shape.lineTo(25.5, 7.8);
    shape.lineTo(19.6, 7.8);
    shape.lineTo(15.7, 0.0);
    shape.lineTo(11.8, 0.0);
    shape.lineTo(15.7, 7.8);
    shape.lineTo(9.8, 7.8);
    shape.lineTo(5.9, 0.0);
    shape.lineTo(3.9, 0.0);
    shape.bezierCurveTo(1.8, 0.0, 0.0, 1.8, 0.0, 3.9);
    shape.lineTo(0.0, 27.4);
    shape.bezierCurveTo(0.0, 29.6, 1.8, 31.3, 3.9, 31.3);
    shape.lineTo(35.3, 31.3);
    shape.bezierCurveTo(37.4, 31.3, 39.2, 29.6, 39.2, 27.4);
    shape.lineTo(39.2, 0.0);
    shape.lineTo(31.3, 0.0);
    shape.lineTo(31.3, 0.0);
    return shape;
  }

  drawDocShape(shape) {
    shape.moveTo(3.9, 0.0);
    shape.bezierCurveTo(1.8, 0.0, 0.0, 1.8, 0.0, 3.9);
    shape.lineTo(0.0, 35.3);
    shape.bezierCurveTo(0.0, 37.4, 1.7, 39.2, 3.9, 39.2);
    shape.lineTo(27.4, 39.2);
    shape.bezierCurveTo(29.6, 39.2, 31.3, 37.4, 31.3, 35.3);
    shape.lineTo(31.3, 11.8);
    shape.lineTo(19.6, 0.0);
    shape.lineTo(3.9, 0.0);
    shape.lineTo(3.9, 0.0);

    const hole = new THREE.Shape();
    hole.moveTo(17.6, 13.7);
    hole.lineTo(17.6, 2.9);
    hole.lineTo(28.4, 13.7);
    hole.lineTo(17.6, 13.7);
    hole.lineTo(17.6, 13.7);

    shape.holes = [hole];

    return shape;
  }

  drawXLSShape(shape) {
    shape.moveTo(10.1, 3.7);
    shape.lineTo(10.1, 0.5);
    shape.lineTo(0.5, 0.5);
    shape.lineTo(0.5, 18.1);
    shape.lineTo(26.9, 18.1);
    shape.lineTo(26.9, 3.7);
    shape.lineTo(10.1, 3.7);

    let hole1 = new THREE.Shape();
    hole1.moveTo(2.1, 2.1);
    hole1.lineTo(8.5, 2.1);
    hole1.lineTo(8.5, 3.7);
    hole1.lineTo(2.1, 3.7);
    hole1.lineTo(2.1, 2.1);

    let hole2 = new THREE.Shape();
    hole2.moveTo(2.1, 5.3);
    hole2.lineTo(8.5, 5.3);
    hole2.lineTo(8.5, 6.9);
    hole2.lineTo(2.1, 6.9);
    hole2.lineTo(2.1, 5.3);

    let hole3 = new THREE.Shape();
    hole3.moveTo(2.1, 8.5);
    hole3.lineTo(8.5, 8.5);
    hole3.lineTo(8.5, 10.1);
    hole3.lineTo(2.1, 10.1);
    hole3.lineTo(2.1, 8.5);

    let hole4 = new THREE.Shape();
    hole4.moveTo(2.1, 11.7);
    hole4.lineTo(8.5, 11.7);
    hole4.lineTo(8.5, 13.3);
    hole4.lineTo(2.1, 13.3);
    hole4.lineTo(2.1, 11.7);

    let hole5 = new THREE.Shape();
    hole5.moveTo(8.5, 16.5);
    hole5.lineTo(2.1, 16.5);
    hole5.lineTo(2.1, 14.9);
    hole5.lineTo(8.5, 14.9);
    hole5.lineTo(8.5, 16.5);

    let hole6 = new THREE.Shape();
    hole6.moveTo(25.3, 16.5);
    hole6.lineTo(10.1, 16.5);
    hole6.lineTo(10.1, 14.9);
    hole6.lineTo(25.3, 14.9);
    hole6.lineTo(25.3, 16.5);

    let hole7 = new THREE.Shape();
    hole7.moveTo(25.3, 13.3);
    hole7.lineTo(10.1, 13.3);
    hole7.lineTo(10.1, 11.7);
    hole7.lineTo(25.3, 11.7);
    hole7.lineTo(25.3, 13.3);

    let hole8 = new THREE.Shape();
    hole8.moveTo(25.3, 10.1);
    hole8.lineTo(10.1, 10.1);
    hole8.lineTo(10.1, 8.5);
    hole8.lineTo(25.3, 8.5);
    hole8.lineTo(25.3, 10.1);

    let hole9 = new THREE.Shape();
    hole9.moveTo(10.1, 5.3);
    hole9.lineTo(25.3, 5.3);
    hole9.lineTo(25.3, 6.9);
    hole9.lineTo(10.1, 6.9);
    hole9.lineTo(10.1, 5.3);

    shape.holes = [hole1, hole2, hole3, hole4, hole5, hole6, hole7, hole8, hole9];

    return shape;
  }

  drawTXTShape(shape) {
    // first row
    shape.moveTo(5.6, 1.6);
    shape.lineTo(0.8, 1.6);
    shape.bezierCurveTo(0.4, 1.6, 0.0, 1.2, 0.0, 0.8);
    shape.bezierCurveTo(0.0, 0.4, 0.4, 0.0, 0.8, 0.0);
    shape.lineTo(5.6, 0.0);
    shape.bezierCurveTo(6.0, 0.0, 6.4, 0.4, 6.4, 0.8);
    shape.bezierCurveTo(6.4, 1.2, 6.0, 1.6, 5.6, 1.6);
    shape.closePath();
    
    // second row
    shape.moveTo(8.0, 5.6);
    shape.lineTo(0.8, 5.6);
    shape.bezierCurveTo(0.4, 5.6, 0.0, 5.2, 0.0, 4.8);
    shape.bezierCurveTo(0.0, 4.4, 0.4, 4.0, 0.8, 4.0);
    shape.lineTo(8.0, 4.0);
    shape.bezierCurveTo(8.4, 4.0, 8.8, 4.4, 8.8, 4.8);
    shape.bezierCurveTo(8.8, 5.2, 8.4, 5.6, 8.0, 5.6);
    shape.closePath();
    
    shape.bezierCurveTo(11.0, 5.6, 10.8, 5.5, 10.6, 5.4);
    shape.bezierCurveTo(10.5, 5.2, 10.4, 5.0, 10.4, 4.8);
    shape.bezierCurveTo(10.4, 4.6, 10.5, 4.4, 10.6, 4.2);
    shape.bezierCurveTo(10.9, 3.9, 11.5, 3.9, 11.8, 4.2);
    shape.bezierCurveTo(11.9, 4.4, 12.0, 4.6, 12.0, 4.8);
    shape.bezierCurveTo(12.0, 5.0, 11.9, 5.2, 11.8, 5.4);
    shape.bezierCurveTo(11.6, 5.5, 11.4, 5.6, 11.2, 5.6);
    shape.closePath();
    
    shape.moveTo(20.8, 5.6);
    shape.lineTo(14.4, 5.6);
    shape.bezierCurveTo(14.0, 5.6, 13.6, 5.2, 13.6, 4.8);
    shape.bezierCurveTo(13.6, 4.4, 14.0, 4.0, 14.4, 4.0);
    shape.lineTo(20.8, 4.0);
    shape.bezierCurveTo(21.2, 4.0, 21.6, 4.4, 21.6, 4.8);
    shape.bezierCurveTo(21.6, 5.2, 21.2, 5.6, 20.8, 5.6);
    shape.closePath();
    
    shape.moveTo(25.6, 5.6);
    shape.lineTo(24.0, 5.6);
    shape.bezierCurveTo(23.6, 5.6, 23.2, 5.2, 23.2, 4.8);
    shape.bezierCurveTo(23.2, 4.4, 23.6, 4.0, 24.0, 4.0);
    shape.lineTo(25.6, 4.0);
    shape.bezierCurveTo(26.0, 4.0, 26.4, 4.4, 26.4, 4.8);
    shape.bezierCurveTo(26.4, 5.2, 26.0, 5.6, 25.6, 5.6);
    shape.closePath();
    
    // third row
    shape.moveTo(18.4, 9.6);
    shape.lineTo(0.8, 9.6);
    shape.bezierCurveTo(0.4, 9.6, 0.0, 9.2, 0.0, 8.8);
    shape.bezierCurveTo(0.0, 8.4, 0.4, 8.0, 0.8, 8.0);
    shape.lineTo(18.4, 8.0);
    shape.bezierCurveTo(18.8, 8.0, 19.2, 8.4, 19.2, 8.8);
    shape.bezierCurveTo(19.2, 9.2, 18.8, 9.6, 18.4, 9.6);
    shape.closePath();
    
    shape.moveTo(25.6, 9.6);
    shape.lineTo(20.8, 9.6);
    shape.bezierCurveTo(20.4, 9.6, 20.0, 9.2, 20.0, 8.8);
    shape.bezierCurveTo(20.0, 8.4, 20.4, 8.0, 20.8, 8.0);
    shape.lineTo(25.6, 8.0);
    shape.bezierCurveTo(26.0, 8.0, 26.4, 8.4, 26.4, 8.8);
    shape.bezierCurveTo(26.4, 9.2, 26.0, 9.6, 25.6, 9.6);
    shape.closePath();
    
    // fourth row
    shape.moveTo(4.0, 13.6);
    shape.lineTo(0.8, 13.6);
    shape.bezierCurveTo(0.4, 13.6, 0.0, 13.2, 0.0, 12.8);
    shape.bezierCurveTo(0.0, 12.4, 0.4, 12.0, 0.8, 12.0);
    shape.lineTo(4.0, 12.0);
    shape.bezierCurveTo(4.4, 12.0, 4.8, 12.4, 4.8, 12.8);
    shape.bezierCurveTo(4.8, 13.2, 4.4, 13.6, 4.0, 13.6);
    shape.closePath();
    
    shape.moveTo(15.2, 13.6);
    shape.lineTo(7.2, 13.6);
    shape.bezierCurveTo(6.8, 13.6, 6.4, 13.2, 6.4, 12.8);
    shape.bezierCurveTo(6.4, 12.4, 6.8, 12.0, 7.2, 12.0);
    shape.lineTo(15.2, 12.0);
    shape.bezierCurveTo(15.6, 12.0, 16.0, 12.4, 16.0, 12.8);
    shape.bezierCurveTo(16.0, 13.2, 15.6, 13.6, 15.2, 13.6);
    shape.closePath();
    
    shape.moveTo(25.6, 13.6);
    shape.lineTo(18.4, 13.6);
    shape.bezierCurveTo(18.0, 13.6, 17.6, 13.2, 17.6, 12.8);
    shape.bezierCurveTo(17.6, 12.4, 18.0, 12.0, 18.4, 12.0);
    shape.lineTo(25.6, 12.0);
    shape.bezierCurveTo(26.0, 12.0, 26.4, 12.4, 26.4, 12.8);
    shape.bezierCurveTo(26.4, 13.2, 26.0, 13.6, 25.6, 13.6);
    shape.closePath();

    // fifth row
    shape.moveTo(0.8, 17.6);
    shape.bezierCurveTo(0.6, 17.6, 0.4, 17.5, 0.2, 17.4);
    shape.bezierCurveTo(0.1, 17.2, 0.0, 17.0, 0.0, 16.8);
    shape.bezierCurveTo(0.0, 16.6, 0.1, 16.4, 0.2, 16.2);
    shape.bezierCurveTo(0.5, 15.9, 1.1, 15.9, 1.4, 16.2);
    shape.bezierCurveTo(1.5, 16.4, 1.6, 16.6, 1.6, 16.8);
    shape.bezierCurveTo(1.6, 17.0, 1.5, 17.2, 1.4, 17.4);
    shape.bezierCurveTo(1.2, 17.5, 1.0, 17.6, 0.8, 17.6);
    shape.closePath();
    
    shape.moveTo(10.4, 17.6);
    shape.lineTo(4.0, 17.6);
    shape.bezierCurveTo(3.6, 17.6, 3.2, 17.2, 3.2, 16.8);
    shape.bezierCurveTo(3.2, 16.4, 3.6, 16.0, 4.0, 16.0);
    shape.lineTo(10.4, 16.0);
    shape.bezierCurveTo(10.8, 16.0, 11.2, 16.4, 11.2, 16.8);
    shape.bezierCurveTo(11.2, 17.2, 10.8, 17.6, 10.4, 17.6);
    shape.closePath();
    
    return shape;
  }

  drawPPTShape(shape) {
    shape.moveTo(22.7, 2.8);
    shape.lineTo(12.3, 2.8);
    shape.lineTo(12.3, 0.9);
    shape.bezierCurveTo(12.3, 0.4, 11.9, 0.0, 11.4, 0.0);
    shape.bezierCurveTo(10.8, 0.0, 10.4, 0.4, 10.4, 0.9);
    shape.lineTo(10.4, 2.8);
    shape.lineTo(0.0, 2.8);
    shape.lineTo(0.0, 18.0);
    shape.lineTo(5.9, 18.0);
    shape.lineTo(3.9, 21.3);
    shape.bezierCurveTo(3.6, 21.7, 3.8, 22.3, 4.2, 22.6);
    shape.bezierCurveTo(4.4, 22.7, 4.6, 22.7, 4.7, 22.7);
    shape.bezierCurveTo(5.1, 22.7, 5.4, 22.5, 5.5, 22.2);
    shape.lineTo(8.1, 18.0);
    shape.lineTo(14.6, 18.0);
    shape.lineTo(17.2, 22.2);
    shape.bezierCurveTo(17.3, 22.5, 17.7, 22.7, 18.0, 22.7);
    shape.bezierCurveTo(18.1, 22.7, 18.3, 22.7, 18.5, 22.6);
    shape.bezierCurveTo(18.9, 22.3, 19.1, 21.7, 18.8, 21.3);
    shape.lineTo(16.8, 18.0);
    shape.lineTo(22.7, 18.0);
    shape.lineTo(22.7, 2.8);
    shape.closePath();

    let hole = new THREE.Shape();
    hole.moveTo(1.9, 16.1);
      hole.lineTo(20.8, 16.1);
      hole.lineTo(20.8, 4.7);
      hole.lineTo(1.9, 4.7);
      hole.lineTo(1.9, 16.1);
      hole.closePath();

    shape.holes = [hole];

    return shape;
  }

  drawPDFShape(shape) {
    shape.moveTo(2.2, 21.6);
    shape.bezierCurveTo(1.9, 21.6, 1.6, 21.5, 1.4, 21.4);
    shape.bezierCurveTo(0.6, 20.7, 0.5, 20.1, 0.5, 19.6);
    shape.bezierCurveTo(0.7, 18.3, 2.3, 16.9, 5.3, 15.5);
    shape.bezierCurveTo(6.5, 12.9, 7.6, 9.6, 8.3, 6.9);
    shape.bezierCurveTo(7.5, 5.2, 6.8, 2.9, 7.3, 1.6);
    shape.bezierCurveTo(7.5, 1.1, 7.8, 0.8, 8.2, 0.6);
    shape.bezierCurveTo(8.4, 0.6, 8.9, 0.5, 9.0, 0.5);
    shape.bezierCurveTo(9.4, 0.5, 9.8, 1.0, 10.1, 1.3);
    shape.bezierCurveTo(10.3, 1.6, 10.8, 2.3, 9.7, 6.8);
    shape.bezierCurveTo(10.8, 9.0, 12.4, 11.3, 13.8, 12.8);
    shape.bezierCurveTo(14.9, 12.6, 15.8, 12.5, 16.5, 12.5);
    shape.bezierCurveTo(17.8, 12.5, 18.5, 12.8, 18.8, 13.4);
    shape.bezierCurveTo(19.1, 13.9, 19.0, 14.5, 18.5, 15.2);
    shape.bezierCurveTo(18.1, 15.8, 17.5, 16.1, 16.7, 16.1);
    shape.bezierCurveTo(15.8, 16.1, 14.6, 15.5, 13.4, 14.3);
    shape.bezierCurveTo(11.1, 14.8, 8.5, 15.6, 6.3, 16.5);
    shape.bezierCurveTo(5.6, 18.0, 5.0, 19.1, 4.4, 19.9);
    shape.bezierCurveTo(3.6, 21.1, 2.9, 21.6, 2.2, 21.6);
    shape.closePath();

    let hole1 = new THREE.Shape();
    hole1.moveTo(3.8, 17.0);
    hole1.bezierCurveTo(2.1, 18.0, 1.4, 18.8, 1.4, 19.2);
    hole1.bezierCurveTo(1.3, 19.3, 1.3, 19.5, 1.7, 19.8);
    hole1.bezierCurveTo(1.8, 19.7, 2.5, 19.4, 3.8, 17.0);

    let hole2 = new THREE.Shape();
    hole2.moveTo(14.7, 13.5);
    hole2.bezierCurveTo(15.4, 14.0, 15.5, 14.2, 16.0, 14.2);
    hole2.bezierCurveTo(16.1, 14.2, 16.7, 14.2, 16.9, 13.9);
    hole2.bezierCurveTo(17.0, 13.7, 17.1, 13.6, 17.1, 13.5);
    hole2.bezierCurveTo(17.0, 13.5, 16.9, 13.4, 16.2, 13.4);
    hole2.bezierCurveTo(15.8, 13.4, 15.3, 13.4, 14.7, 13.5);

    let hole3 = new THREE.Shape();
    hole3.moveTo(8.7, 8.2);
    hole3.bezierCurveTo(8.2, 10.2, 7.4, 12.3, 6.6, 14.3);
    hole3.bezierCurveTo(8.3, 13.6, 10.1, 13.0, 11.8, 12.6);
    hole3.bezierCurveTo(10.7, 11.4, 9.6, 9.8, 8.7, 8.2);

    let hole4 = new THREE.Shape();
    hole4.moveTo(8.3, 1.4);
    hole4.bezierCurveTo(8.2, 1.5, 7.2, 2.8, 8.3, 4.0);
    hole4.bezierCurveTo(9.1, 2.3, 8.3, 1.4, 8.3, 1.4);

    shape.holes = [hole1, hole2, hole3, hole4];

    return shape;
  }

  drawMediaShape(shape) {
    shape.moveTo(12.0, 24.0);
    shape.bezierCurveTo(5.4, 24.0, 0.0, 18.6, 0.0, 12.0);
    shape.bezierCurveTo(0.0, 5.4, 5.4, 0.0, 12.0, 0.0);
    shape.bezierCurveTo(18.6, 0.0, 24.0, 5.4, 24.0, 12.0);
    shape.bezierCurveTo(24.0, 18.6, 18.6, 24.0, 12.0, 24.0);

    let shapeInner = new THREE.Shape();
    shapeInner.moveTo(12.0, 1.6);
    shapeInner.bezierCurveTo(6.3, 1.6, 1.6, 6.3, 1.6, 12.0);
    shapeInner.bezierCurveTo(1.6, 17.7, 6.3, 22.4, 12.0, 22.4);
    shapeInner.bezierCurveTo(17.7, 22.4, 22.4, 17.7, 22.4, 12.0);
    shapeInner.bezierCurveTo(22.4, 6.3, 17.7, 1.6, 12.0, 1.6);

    shape.holes = [shapeInner];

    let playOuter = new THREE.Shape();
    playOuter.moveTo(8.8, 18.4);
    playOuter.bezierCurveTo(8.7, 18.4, 8.5, 18.4, 8.4, 18.3);
    playOuter.bezierCurveTo(8.2, 18.2, 8.0, 17.9, 8.0, 17.6);
    playOuter.lineTo(8.0, 6.4);
    playOuter.bezierCurveTo(8.0, 6.1, 8.2, 5.8, 8.4, 5.7);
    playOuter.bezierCurveTo(8.7, 5.6, 9.0, 5.6, 9.2, 5.7);
    playOuter.lineTo(18.0, 11.3);
    playOuter.bezierCurveTo(18.3, 11.5, 18.4, 11.7, 18.4, 12.0);
    playOuter.bezierCurveTo(18.4, 12.3, 18.3, 12.5, 18.0, 12.7);
    playOuter.lineTo(9.2, 18.3);
    playOuter.bezierCurveTo(9.1, 18.4, 8.9, 18.4, 8.8, 18.4);
    shape.add(playOuter);

    let playInner = new THREE.Shape();
    playInner.moveTo(9.6, 7.9);
    playInner.lineTo(9.6, 16.1);
    playInner.lineTo(16.1, 12.0);
    playInner.lineTo(9.6, 7.9);
    playInner.closePath();
    
    shape.holes.push(playInner);

    return shape;
  }

  drawImgShape(shape) {
    shape.moveTo(0.5, 19.0);
    shape.lineTo(27.8, 19.0);
    shape.lineTo(27.8, 0.5);
    shape.lineTo(0.5, 0.5);
    shape.lineTo(0.5, 19.0);
    shape.closePath();

    let shape2 = new THREE.Shape();
    shape2.moveTo(8.4, 0.5);
    shape2.bezierCurveTo(10.0, 0.5, 11.3, 1.8, 11.3, 3.4);
    shape2.bezierCurveTo(11.3, 5.0, 10.0, 6.3, 8.4, 6.3);
    shape2.bezierCurveTo(6.8, 6.3, 5.5, 5.0, 5.5, 3.4);
    shape2.bezierCurveTo(5.5, 1.8, 6.8, 0.5, 8.4, 0.5);
    shape2.lineTo(0.5, 0.5);
    shape2.lineTo(0.5, 19.0);
    shape2.lineTo(11.3, 9.8);
    shape2.lineTo(14.8, 13.3);
    shape2.lineTo(21.5, 6.0);
    shape2.lineTo(27.8, 12.0);
    shape2.lineTo(27.8, 0.5);
    shape2.lineTo(8.4, 0.5);
    shape2.closePath();

    shape.holes = [shape2];

    return shape;
  }

  drawDocShape(shape) {
    shape.moveTo(0.0, 8.3);
    shape.lineTo(7.9, 8.3);
    shape.lineTo(7.9, 7.3);
    shape.lineTo(0.0, 7.3);
    shape.lineTo(0.0, 8.3);
    shape.closePath();

    // layer1/Path
    
    shape.moveTo(7.9, 3.8);
    shape.lineTo(0.0, 3.8);
    shape.lineTo(0.0, 4.8);
    shape.lineTo(7.9, 4.8);
    shape.lineTo(7.9, 3.8);
    shape.closePath();

    // layer1/Path
    
    shape.moveTo(0.0, 1.3);
    shape.lineTo(7.9, 1.3);
    shape.lineTo(7.9, 0.3);
    shape.lineTo(0.0, 0.3);
    shape.lineTo(0.0, 1.3);
    shape.closePath();

    // layer1/Path
    
    shape.moveTo(0.0, 22.3);
    shape.lineTo(26.2, 22.3);
    shape.lineTo(26.2, 21.3);
    shape.lineTo(0.0, 21.3);
    shape.lineTo(0.0, 22.3);
    shape.closePath();

    // layer1/Path
    
    shape.moveTo(0.0, 11.8);
    shape.lineTo(7.9, 11.8);
    shape.lineTo(7.9, 10.8);
    shape.lineTo(0.0, 10.8);
    shape.lineTo(0.0, 11.8);
    shape.closePath();

    // layer1/Path
    
    shape.moveTo(0.0, 15.3);
    shape.lineTo(26.2, 15.3);
    shape.lineTo(26.2, 14.3);
    shape.lineTo(0.0, 14.3);
    shape.lineTo(0.0, 15.3);
    shape.closePath();

    // layer1/Path
    
    shape.moveTo(0.0, 18.8);
    shape.lineTo(26.2, 18.8);
    shape.lineTo(26.2, 17.8);
    shape.lineTo(0.0, 17.8);
    shape.lineTo(0.0, 18.8);
    shape.closePath();

    // layer1/Compound Path
    

    // layer1/Compound Path/Path
    // shape.moveTo(26.3, 12.5);
    // shape.lineTo(9.9, 12.5);
    // shape.lineTo(9.9, 0.0);
    // shape.lineTo(26.3, 0.0);
    // shape.lineTo(26.3, 12.5);
    // shape.closePath();

    // // layer1/Compound Path/Path
    shape.moveTo(10.8, 11.6);
    shape.lineTo(25.4, 11.6);
    shape.lineTo(25.4, 0.9);
    shape.lineTo(10.8, 0.9);
    shape.lineTo(10.8, 11.6);
    shape.closePath();

    // layer1/Compound Path
    

    // layer1/Compound Path/Path
    // shape.moveTo(26.3, 12.5);
    // shape.lineTo(9.9, 12.5);
    // shape.lineTo(9.9, 0.0);
    // shape.lineTo(26.3, 0.0);
    // shape.lineTo(26.3, 12.5);
    // shape.closePath();

    // // layer1/Compound Path/Path
    // shape.moveTo(10.8, 11.6);
    // shape.lineTo(25.4, 11.6);
    // shape.lineTo(25.4, 0.9);
    // shape.lineTo(10.8, 0.9);
    // shape.lineTo(10.8, 11.6);
    // shape.closePath();

    // layer1/Group

    // layer1/Group/Path
    
    // moon?
    // shape.moveTo(16.6, 3.6);
    // shape.bezierCurveTo(16.6, 4.5, 15.8, 5.2, 15.0, 5.2);
    // shape.bezierCurveTo(14.1, 5.2, 13.4, 4.5, 13.4, 3.6);
    // shape.bezierCurveTo(13.4, 2.7, 14.1, 2.0, 15.0, 2.0);
    // shape.bezierCurveTo(15.8, 2.0, 16.6, 2.7, 16.6, 3.6);
    // shape.closePath();

    // layer1/Group/Path
    
    // mountain
    // shape.moveTo(10.7, 11.6);
    // shape.lineTo(25.5, 11.6);
    // shape.lineTo(25.5, 7.8);
    // shape.lineTo(22.0, 4.5);
    // shape.lineTo(18.4, 8.5);
    // shape.lineTo(16.6, 6.6);
    // shape.lineTo(10.7, 11.6);
    // shape.closePath();

    return shape;
  }

  drawZipShape(shape) {
    // shape.moveTo(27.4, 18.6);
    // shape.lineTo(0.0, 18.6);
    // shape.lineTo(0.0, 0.0);
    // shape.lineTo(27.4, 0.0);
    // shape.lineTo(27.4, 18.6);
    // shape.closePath();

    // let shape2 = new THREE.Shape();
    // shape2.moveTo(26.5, 17.8);
    // shape2.lineTo(0.9, 17.8);
    // shape2.lineTo(0.9, 0.8);
    // shape2.lineTo(26.5, 0.8);
    // shape2.lineTo(26.5, 17.8);
    // shape2.closePath();

    // shape.holes.push(shape2);

    let shape3 = new THREE.Shape();
    shape3.moveTo(10.5, 10.1);
    shape3.lineTo(12.1, 10.1);
    shape3.lineTo(12.1, 11.7);
    shape3.lineTo(13.7, 11.7);
    shape3.lineTo(13.7, 10.1);
    shape3.lineTo(15.3, 10.1);
    shape3.lineTo(15.3, 11.7);
    shape3.lineTo(16.9, 11.7);
    shape3.lineTo(16.9, 10.1);
    shape3.lineTo(18.5, 10.1);
    shape3.lineTo(18.5, 11.7);
    shape3.lineTo(20.1, 11.7);
    shape3.lineTo(20.1, 10.1);
    shape3.lineTo(21.7, 10.1);
    shape3.lineTo(21.7, 11.7);
    shape3.lineTo(23.3, 11.7);
    shape3.lineTo(23.3, 10.1);
    shape3.lineTo(24.9, 10.1);
    shape3.lineTo(24.9, 8.5);
    shape3.lineTo(23.3, 8.5);
    shape3.lineTo(23.3, 6.9);
    shape3.lineTo(21.7, 6.9);
    shape3.lineTo(21.7, 8.5);
    shape3.lineTo(20.1, 8.5);
    shape3.lineTo(20.1, 6.9);
    shape3.lineTo(18.5, 6.9);
    shape3.lineTo(18.5, 8.5);
    shape3.lineTo(16.9, 8.5);
    shape3.lineTo(16.9, 6.9);
    shape3.lineTo(15.3, 6.9);
    shape3.lineTo(15.3, 8.5);
    shape3.lineTo(13.7, 8.5);
    shape3.lineTo(13.7, 6.9);
    shape3.lineTo(12.1, 6.9);
    shape3.lineTo(12.1, 8.5);
    shape3.lineTo(10.5, 8.5);
    shape3.lineTo(10.5, 5.3);
    shape3.lineTo(6.5, 5.3);
    shape3.bezierCurveTo(4.3, 5.3, 2.5, 7.1, 2.5, 9.3);
    shape3.bezierCurveTo(2.5, 11.5, 4.3, 13.3, 6.5, 13.3);
    shape3.lineTo(10.5, 13.3);
    shape3.lineTo(10.5, 10.1);
    shape3.closePath();

    shape.add(shape3);

    let shape4 = new THREE.Shape();
    shape4.moveTo(6.5, 11.7);
    shape4.bezierCurveTo(5.2, 11.7, 4.1, 10.6, 4.1, 9.3);
    shape4.bezierCurveTo(4.1, 8.0, 5.2, 6.9, 6.5, 6.9);
    shape4.lineTo(8.9, 6.9);
    shape4.lineTo(8.9, 11.7);
    shape4.lineTo(6.5, 11.7);
    shape4.closePath();

    shape.holes.push(shape4);

    // let shape2 = new THREE.Shape();
    // shape2.moveTo(3.2, 3.2);
    // shape2.bezierCurveTo(3.2, 2.8, 3.6, 2.4, 4.0, 2.4);
    // shape2.bezierCurveTo(4.4, 2.4, 4.8, 2.8, 4.8, 3.2);
    // shape2.lineTo(4.8, 4.8);
    // shape2.bezierCurveTo(4.8, 5.2, 4.4, 5.6, 4.0, 5.6);
    // shape2.bezierCurveTo(3.6, 5.6, 3.2, 5.2, 3.2, 4.8);
    // shape2.lineTo(3.2, 3.2);

    // shape.add(shape2);

    return shape;
  }

  drawSalesShape(shape) {
    shape.moveTo(84.4, 12.9);
    shape.bezierCurveTo(82.4, 11.6, 79.6, 10.3, 76.4, 9.4);
    shape.bezierCurveTo(74.6, 8.8, 72.9, 8.4, 71.2, 8.2);
    shape.lineTo(71.2, 8.2);
    shape.bezierCurveTo(69.4, 7.9, 67.9, 7.9, 66.6, 8.0);
    shape.bezierCurveTo(64.3, 8.2, 62.9, 8.9, 62.5, 10.2);
    shape.bezierCurveTo(62.3, 10.9, 62.4, 11.7, 62.8, 12.4);
    shape.bezierCurveTo(62.4, 12.2, 62.0, 12.0, 61.7, 11.6);
    shape.bezierCurveTo(60.5, 10.2, 60.7, 8.2, 62.1, 7.1);
    shape.bezierCurveTo(63.3, 6.0, 65.2, 6.1, 66.4, 7.3);
    shape.lineTo(66.4, 7.3);
    shape.bezierCurveTo(67.7, 7.1, 69.3, 7.2, 71.1, 7.5);
    shape.lineTo(71.1, 7.2);
    shape.bezierCurveTo(71.2, 5.0, 69.6, 3.1, 67.4, 2.8);
    shape.lineTo(46.1, 0.0);
    shape.bezierCurveTo(44.9, -0.1, 43.6, 0.2, 42.7, 1.0);
    shape.lineTo(1.6, 35.8);
    shape.bezierCurveTo(-0.3, 37.3, -0.5, 40.1, 1.0, 41.9);
    shape.lineTo(22.4, 67.3);
    shape.bezierCurveTo(24.0, 69.1, 26.8, 69.4, 28.6, 67.8);
    shape.lineTo(69.7, 33.1);
    shape.bezierCurveTo(70.7, 32.3, 71.3, 31.1, 71.3, 29.8);
    shape.lineTo(71.2, 17.9);
    shape.bezierCurveTo(72.0, 18.2, 72.8, 18.4, 73.6, 18.7);
    shape.bezierCurveTo(77.3, 19.8, 83.2, 20.9, 86.1, 19.5);
    shape.bezierCurveTo(86.8, 19.1, 87.3, 18.6, 87.6, 17.8);
    shape.bezierCurveTo(88.0, 16.3, 87.0, 14.6, 84.4, 12.9);
    shape.closePath();

    let hole1 = new THREE.Shape();
    hole1.moveTo(66.2, 12.0);
    hole1.bezierCurveTo(66.1, 12.0, 66.0, 12.0, 66.0, 12.1);
    hole1.bezierCurveTo(65.4, 11.7, 65.1, 11.3, 65.0, 11.1);
    hole1.bezierCurveTo(65.1, 11.0, 65.2, 11.0, 65.3, 10.9);
    hole1.bezierCurveTo(65.6, 10.8, 66.2, 10.7, 67.1, 10.6);
    hole1.bezierCurveTo(66.9, 11.1, 66.6, 11.6, 66.2, 12.0);
    hole1.closePath();

    shape.holes.push(hole1);

    let hole2 = new THREE.Shape();
    hole2.moveTo(74.4, 16.1);
    hole2.bezierCurveTo(73.2, 15.7, 72.2, 15.4, 71.2, 15.0);
    hole2.lineTo(71.2, 10.9);
    hole2.bezierCurveTo(72.5, 11.1, 74.0, 11.5, 75.7, 12.0);
    hole2.bezierCurveTo(81.6, 13.7, 84.9, 16.3, 85.0, 17.0);
    hole2.bezierCurveTo(84.5, 17.6, 80.3, 17.9, 74.4, 16.1);
    hole2.closePath();

    shape.holes.push(hole2);

    return shape;
  }
  drawOperationsShape(shape) {
    shape.moveTo(43.8, 47.9);
    shape.bezierCurveTo(43.8, 46.1, 43.6, 44.4, 43.1, 42.7);
    shape.lineTo(49.5, 37.3);
    shape.lineTo(46.4, 32.1);
    shape.lineTo(38.6, 35.0);
    shape.bezierCurveTo(37.4, 33.8, 36.1, 32.7, 34.6, 31.9);
    shape.lineTo(35.2, 23.4);
    shape.lineTo(29.4, 21.9);
    shape.lineTo(25.9, 29.6);
    shape.bezierCurveTo(24.2, 29.6, 22.5, 29.8, 21.0, 30.3);
    shape.lineTo(15.4, 23.7);
    shape.lineTo(10.2, 26.7);
    shape.lineTo(13.2, 34.8);
    shape.bezierCurveTo(12.0, 35.9, 11.0, 37.2, 10.2, 38.6);
    shape.lineTo(1.5, 37.9);
    shape.lineTo(0.0, 43.8);
    shape.lineTo(7.8, 47.4);
    shape.bezierCurveTo(7.8, 49.0, 8.0, 50.6, 8.4, 52.2);
    shape.lineTo(1.8, 57.8);
    shape.lineTo(4.8, 63.0);
    shape.lineTo(12.8, 60.0);
    shape.bezierCurveTo(13.9, 61.2, 15.3, 62.3, 16.7, 63.1);
    shape.lineTo(16.0, 71.7);
    shape.lineTo(21.8, 73.2);
    shape.lineTo(25.3, 65.6);
    shape.bezierCurveTo(27.1, 65.6, 28.8, 65.4, 30.4, 65.0);
    shape.lineTo(35.9, 71.4);
    shape.lineTo(41.1, 68.4);
    shape.lineTo(38.2, 60.6);
    shape.bezierCurveTo(39.5, 59.4, 40.6, 58.0, 41.4, 56.5);
    shape.lineTo(49.7, 57.2);
    shape.lineTo(51.2, 51.4);
    shape.lineTo(43.8, 47.9);
    shape.closePath();

    let hole1 = new THREE.Shape();
    hole1.moveTo(25.6, 56.2);
    hole1.bezierCurveTo(20.9, 56.2, 17.0, 52.3, 17.0, 47.6);
    hole1.bezierCurveTo(17.0, 42.8, 20.9, 38.9, 25.6, 38.9);
    hole1.bezierCurveTo(30.4, 38.9, 34.2, 42.8, 34.2, 47.6);
    hole1.bezierCurveTo(34.2, 52.3, 30.4, 56.2, 25.6, 56.2);
    
    shape.holes.push(hole1);

    shape.moveTo(74.0, 22.5);
    shape.bezierCurveTo(74.2, 21.0, 74.1, 19.6, 73.8, 18.1);
    shape.lineTo(79.5, 14.1);
    shape.lineTo(77.3, 9.6);
    shape.lineTo(70.7, 11.4);
    shape.bezierCurveTo(69.8, 10.3, 68.7, 9.3, 67.5, 8.5);
    shape.lineTo(68.6, 1.7);
    shape.lineTo(63.9, 0.0);
    shape.lineTo(60.5, 6.0);
    shape.bezierCurveTo(59.1, 5.9, 57.7, 6.0, 56.3, 6.2);
    shape.lineTo(52.1, 0.5);
    shape.lineTo(47.7, 2.7);
    shape.lineTo(49.5, 9.5);
    shape.bezierCurveTo(48.5, 10.4, 47.5, 11.4, 46.8, 12.5);
    shape.lineTo(39.7, 11.4);
    shape.lineTo(38.1, 16.1);
    shape.lineTo(44.3, 19.6);
    shape.bezierCurveTo(44.2, 20.9, 44.2, 22.3, 44.5, 23.6);
    shape.lineTo(38.6, 27.8);
    shape.lineTo(40.8, 32.3);
    shape.lineTo(47.6, 30.4);
    shape.bezierCurveTo(48.5, 31.5, 49.5, 32.4, 50.6, 33.1);
    shape.lineTo(49.4, 40.3);
    shape.lineTo(54.1, 41.9);
    shape.lineTo(57.6, 35.8);
    shape.bezierCurveTo(59.0, 35.9, 60.4, 35.9, 61.7, 35.6);
    shape.lineTo(65.9, 41.4);
    shape.lineTo(70.4, 39.2);
    shape.lineTo(68.5, 32.5);
    shape.bezierCurveTo(69.7, 31.6, 70.6, 30.6, 71.4, 29.4);
    shape.lineTo(78.3, 30.5);
    shape.lineTo(80.0, 25.8);
    shape.lineTo(74.0, 22.5);
    shape.closePath();

    let hole2 = new THREE.Shape();
    hole2.moveTo(59.0, 28.1);
    hole2.bezierCurveTo(55.1, 28.1, 51.9, 24.9, 51.9, 21.0);
    hole2.bezierCurveTo(51.9, 17.0, 55.1, 13.8, 59.0, 13.8);
    hole2.bezierCurveTo(63.0, 13.8, 66.1, 17.0, 66.1, 21.0);
    hole2.bezierCurveTo(66.1, 24.9, 63.0, 28.1, 59.0, 28.1);

    shape.holes.push(hole2);
    
    shape.moveTo(76.1, 53.8);
    shape.lineTo(80.4, 51.3);
    shape.lineTo(79.1, 47.9);
    shape.lineTo(74.3, 48.8);
    shape.bezierCurveTo(73.7, 47.9, 73.0, 47.1, 72.1, 46.5);
    shape.lineTo(73.4, 41.6);
    shape.lineTo(70.1, 40.1);
    shape.lineTo(67.3, 44.3);
    shape.bezierCurveTo(66.3, 44.1, 65.2, 44.0, 64.2, 44.2);
    shape.lineTo(61.6, 39.8);
    shape.lineTo(58.2, 41.1);
    shape.lineTo(59.1, 46.1);
    shape.bezierCurveTo(58.3, 46.6, 57.6, 47.3, 57.0, 48.1);
    shape.lineTo(51.9, 46.8);
    shape.lineTo(50.4, 50.1);
    shape.lineTo(54.7, 53.0);
    shape.bezierCurveTo(54.5, 54.0, 54.5, 55.0, 54.6, 55.9);
    shape.lineTo(50.1, 58.6);
    shape.lineTo(51.4, 62.0);
    shape.lineTo(56.5, 61.0);
    shape.bezierCurveTo(57.0, 61.9, 57.7, 62.6, 58.4, 63.2);
    shape.lineTo(57.1, 68.3);
    shape.lineTo(60.4, 69.7);
    shape.lineTo(63.3, 65.5);
    shape.bezierCurveTo(64.3, 65.7, 65.3, 65.8, 66.3, 65.7);
    shape.lineTo(68.9, 70.1);
    shape.lineTo(72.3, 68.8);
    shape.lineTo(71.4, 63.9);
    shape.bezierCurveTo(72.2, 63.3, 73.0, 62.6, 73.7, 61.8);
    shape.lineTo(78.6, 63.1);
    shape.lineTo(80.0, 59.8);
    shape.lineTo(76.0, 57.0);
    shape.bezierCurveTo(76.2, 56.0, 76.2, 54.9, 76.1, 53.8);

    let hole3 = new THREE.Shape();
    hole3.moveTo(65.2, 59.9);
    hole3.bezierCurveTo(62.5, 59.9, 60.3, 57.7, 60.3, 54.9);
    hole3.bezierCurveTo(60.3, 52.2, 62.5, 50.0, 65.2, 50.0);
    hole3.bezierCurveTo(68.0, 50.0, 70.2, 52.2, 70.2, 54.9);
    hole3.bezierCurveTo(70.2, 57.7, 68.0, 59.9, 65.2, 59.9);

    shape.holes.push(hole3);
    
    return shape;
  }
  drawOthersShape(shape) {
    shape.moveTo(26.1, 51.1);
    shape.lineTo(28.8, 49.5);
    shape.lineTo(28.0, 47.5);
    shape.lineTo(25.0, 48.0);
    shape.bezierCurveTo(24.7, 47.5, 24.2, 47.0, 23.7, 46.6);
    shape.lineTo(24.5, 43.7);
    shape.lineTo(22.5, 42.8);
    shape.lineTo(20.7, 45.3);
    shape.bezierCurveTo(20.1, 45.2, 19.5, 45.1, 18.9, 45.2);
    shape.lineTo(17.3, 42.5);
    shape.lineTo(15.2, 43.3);
    shape.lineTo(15.8, 46.4);
    shape.bezierCurveTo(15.3, 46.7, 14.8, 47.1, 14.5, 47.6);
    shape.lineTo(11.4, 46.8);
    shape.lineTo(10.5, 48.8);
    shape.lineTo(13.1, 50.6);
    shape.bezierCurveTo(13.0, 51.2, 13.0, 51.8, 13.0, 52.4);
    shape.lineTo(10.3, 54.0);
    shape.lineTo(11.1, 56.1);
    shape.lineTo(14.2, 55.5);
    shape.bezierCurveTo(14.5, 56.0, 14.9, 56.4, 15.4, 56.8);
    shape.lineTo(14.6, 59.9);
    shape.lineTo(16.6, 60.8);
    shape.lineTo(18.3, 58.2);
    shape.bezierCurveTo(18.9, 58.3, 19.5, 58.4, 20.1, 58.3);
    shape.lineTo(21.8, 61.0);
    shape.lineTo(23.8, 60.2);
    shape.lineTo(23.2, 57.2);
    shape.bezierCurveTo(23.8, 56.9, 24.2, 56.5, 24.6, 56.0);
    shape.lineTo(27.6, 56.7);
    shape.lineTo(28.5, 54.7);
    shape.lineTo(26.0, 53.0);
    shape.bezierCurveTo(26.2, 52.4, 26.2, 51.8, 26.1, 51.1);
    shape.closePath();
    
    let hole1 = new THREE.Shape();
    hole1.moveTo(19.5, 54.8);
    hole1.bezierCurveTo(17.8, 54.8, 16.5, 53.5, 16.5, 51.8);
    hole1.bezierCurveTo(16.5, 50.1, 17.8, 48.7, 19.5, 48.7);
    hole1.bezierCurveTo(21.2, 48.7, 22.6, 50.1, 22.6, 51.8);
    hole1.bezierCurveTo(22.6, 53.5, 21.2, 54.8, 19.5, 54.8);
    hole1.closePath();

    shape.holes.push(hole1);

    shape.moveTo(12.2, 12.5);
    shape.bezierCurveTo(9.2, 12.5, 6.1, 13.4, 2.8, 15.4);
    shape.lineTo(0.0, 5.6);
    shape.bezierCurveTo(5.7, 1.9, 12.5, 0.0, 20.3, 0.0);
    shape.bezierCurveTo(25.5, 0.0, 29.9, 1.1, 33.5, 3.2);
    shape.bezierCurveTo(38.7, 6.2, 41.3, 10.0, 41.3, 14.5);
    shape.bezierCurveTo(41.3, 16.6, 40.7, 18.8, 39.6, 21.2);
    shape.bezierCurveTo(37.8, 24.9, 34.5, 28.1, 29.7, 30.9);
    shape.lineTo(25.8, 41.4);
    shape.bezierCurveTo(24.4, 40.6, 22.6, 40.1, 20.4, 40.1);
    shape.bezierCurveTo(18.3, 40.1, 16.2, 40.6, 14.0, 41.4);
    shape.lineTo(9.9, 30.8);
    shape.bezierCurveTo(12.7, 28.7, 14.9, 26.6, 16.5, 24.5);
    shape.bezierCurveTo(18.1, 22.5, 19.0, 20.9, 19.1, 19.9);
    shape.lineTo(19.4, 18.5);
    shape.bezierCurveTo(19.4, 16.3, 18.6, 14.7, 17.1, 13.8);
    shape.bezierCurveTo(15.6, 12.9, 14.0, 12.5, 12.2, 12.5);
    shape.closePath();

    return shape;
  }
  drawAnalyticsShape(shape) {
    shape.moveTo(7.5, 88.6);
    shape.lineTo(24.4, 88.6);
    shape.lineTo(24.4, 54.4);
    shape.lineTo(7.5, 54.4);
    shape.lineTo(7.5, 88.6);
    shape.closePath();

    shape.moveTo(30.2, 88.6);
    shape.lineTo(47.1, 88.6);
    shape.lineTo(47.1, 42.3);
    shape.lineTo(30.2, 42.3);
    shape.lineTo(30.2, 88.6);
    shape.closePath();
    
    shape.moveTo(52.9, 88.6);
    shape.lineTo(69.8, 88.6);
    shape.lineTo(69.8, 46.9);
    shape.lineTo(52.9, 46.9);
    shape.lineTo(52.9, 88.6);
    shape.closePath();
    
    shape.moveTo(75.6, 88.6);
    shape.lineTo(92.5, 88.6);
    shape.lineTo(92.5, 35.8);
    shape.lineTo(75.6, 35.8);
    shape.lineTo(75.6, 88.6);
    shape.closePath();

    shape.moveTo(15.9, 44.4);
    shape.bezierCurveTo(19.6, 44.4, 22.7, 41.3, 22.7, 37.5);
    shape.bezierCurveTo(22.7, 37.0, 22.7, 36.4, 22.6, 35.9);
    shape.lineTo(33.7, 29.6);
    shape.bezierCurveTo(35.0, 30.8, 36.7, 31.6, 38.5, 31.6);
    shape.bezierCurveTo(41.1, 31.6, 43.4, 30.2, 44.6, 28.0);
    shape.lineTo(54.4, 30.3);
    shape.bezierCurveTo(54.5, 33.9, 57.6, 36.8, 61.2, 36.8);
    shape.bezierCurveTo(65.0, 36.8, 68.1, 33.7, 68.1, 29.9);
    shape.bezierCurveTo(68.1, 29.5, 68.1, 29.0, 68.0, 28.6);
    shape.lineTo(78.9, 23.0);
    shape.bezierCurveTo(80.2, 24.3, 81.9, 25.2, 83.9, 25.2);
    shape.bezierCurveTo(87.7, 25.2, 90.8, 22.1, 90.8, 18.3);
    shape.bezierCurveTo(90.8, 14.5, 87.7, 11.4, 83.9, 11.4);
    shape.bezierCurveTo(80.1, 11.4, 77.0, 14.5, 77.0, 18.3);
    shape.bezierCurveTo(77.0, 18.7, 77.1, 19.2, 77.1, 19.6);
    shape.lineTo(66.2, 25.2);
    shape.bezierCurveTo(65.0, 23.9, 63.2, 23.0, 61.2, 23.0);
    shape.bezierCurveTo(58.6, 23.0, 56.4, 24.5, 55.2, 26.6);
    shape.lineTo(45.4, 24.3);
    shape.bezierCurveTo(45.2, 20.7, 42.2, 17.8, 38.5, 17.8);
    shape.bezierCurveTo(34.8, 17.8, 31.7, 20.9, 31.7, 24.7);
    shape.bezierCurveTo(31.7, 25.3, 31.7, 25.8, 31.8, 26.3);
    shape.lineTo(20.7, 32.6);
    shape.bezierCurveTo(19.4, 31.4, 17.7, 30.6, 15.9, 30.6);
    shape.bezierCurveTo(12.1, 30.6, 9.0, 33.7, 9.0, 37.5);
    shape.bezierCurveTo(9.0, 41.3, 12.1, 44.4, 15.9, 44.4);
    return shape;
  }
  drawMarketingShape(shape) {
    // outer
    shape.moveTo(61.4, 50.8);
    shape.bezierCurveTo(68.7, 39.1, 68.0, 23.8, 59.5, 12.9);
    shape.bezierCurveTo(50.9, 1.7, 35.7, -2.8, 22.3, 1.8);
    shape.bezierCurveTo(9.4, 6.3, 0.4, 18.6, 0.0, 32.2);
    shape.bezierCurveTo(-0.4, 46.0, 8.1, 59.0, 20.9, 64.1);
    shape.bezierCurveTo(33.9, 69.3, 49.0, 65.6, 58.2, 55.1);
    shape.bezierCurveTo(59.4, 53.8, 60.5, 52.3, 61.4, 50.8);
    shape.bezierCurveTo(61.5, 50.8, 59.4, 54.2, 61.4, 50.8);
    shape.closePath();

    let hole1 = new THREE.Shape(); 
    hole1.moveTo(57.3, 17.7);
    hole1.bezierCurveTo(64.3, 28.6, 63.0, 43.1, 54.3, 52.6);
    hole1.bezierCurveTo(46.1, 61.5, 32.9, 64.3, 21.9, 59.5);
    hole1.bezierCurveTo(12.5, 55.4, 5.9, 46.4, 4.8, 36.3);
    hole1.bezierCurveTo(3.5, 24.1, 10.3, 12.2, 21.5, 7.1);
    hole1.bezierCurveTo(32.6, 2.1, 46.0, 4.9, 54.3, 13.8);
    hole1.bezierCurveTo(55.4, 15.0, 56.4, 16.3, 57.3, 17.7);
    hole1.bezierCurveTo(57.4, 17.8, 56.9, 17.1, 57.3, 17.7);
    hole1.closePath();

    shape.holes.push(hole1);

    // second
    shape.moveTo(58.6, 29.1);
    shape.bezierCurveTo(56.8, 18.1, 47.7, 9.3, 36.7, 7.8);
    shape.bezierCurveTo(27.0, 6.5, 17.2, 11.0, 11.8, 19.2);
    shape.bezierCurveTo(5.6, 28.7, 6.5, 41.5, 13.9, 50.0);
    shape.bezierCurveTo(20.3, 57.4, 30.7, 60.6, 40.2, 57.9);
    shape.bezierCurveTo(52.6, 54.4, 60.6, 41.8, 58.6, 29.1);
    shape.bezierCurveTo(58.5, 29.0, 58.7, 29.7, 58.6, 29.1);
    shape.closePath();

    let hole2 = new THREE.Shape(); 
    hole2.moveTo(50.0, 21.5);
    hole2.bezierCurveTo(55.5, 29.4, 54.8, 40.1, 48.3, 47.1);
    hole2.bezierCurveTo(42.1, 53.7, 32.1, 55.6, 24.1, 51.5);
    hole2.bezierCurveTo(17.2, 48.1, 12.7, 40.9, 12.7, 33.2);
    hole2.bezierCurveTo(12.7, 25.6, 17.2, 18.4, 24.0, 14.9);
    hole2.bezierCurveTo(32.9, 10.4, 44.3, 13.2, 50.0, 21.5);
    hole2.closePath();

    shape.holes.push(hole2);
    
    shape.moveTo(49.5, 26.6);
    shape.bezierCurveTo(46.6, 19.5, 39.1, 15.0, 31.4, 15.8);
    shape.bezierCurveTo(24.7, 16.5, 18.9, 21.2, 16.7, 27.6);
    shape.bezierCurveTo(14.5, 34.1, 16.3, 41.4, 21.3, 46.0);
    shape.bezierCurveTo(26.5, 50.8, 34.3, 52.1, 40.7, 49.0);
    shape.bezierCurveTo(48.9, 45.1, 52.9, 35.2, 49.5, 26.6);
    shape.bezierCurveTo(49.4, 26.5, 49.6, 27.0, 49.5, 26.6);
    shape.closePath();

    let hole3 = new THREE.Shape(); 
    hole3.moveTo(39.8, 44.3);
    hole3.bezierCurveTo(34.9, 47.2, 28.5, 46.5, 24.4, 42.6);
    hole3.bezierCurveTo(20.5, 38.9, 19.3, 33.0, 21.4, 28.1);
    hole3.bezierCurveTo(23.3, 23.7, 27.5, 20.7, 32.3, 20.4);
    hole3.bezierCurveTo(37.6, 20.0, 42.7, 23.0, 44.9, 27.8);
    hole3.bezierCurveTo(47.7, 33.8, 45.4, 41.0, 39.8, 44.3);
    hole3.bezierCurveTo(39.1, 44.7, 41.5, 43.3, 39.8, 44.3);
    hole3.closePath();

    shape.holes.push(hole3);

    shape.moveTo(42.8, 35.8);
    shape.bezierCurveTo(43.9, 31.6, 42.1, 27.0, 38.3, 24.7);
    shape.bezierCurveTo(35.0, 22.7, 30.6, 22.9, 27.4, 25.2);
    shape.bezierCurveTo(24.3, 27.5, 22.7, 31.5, 23.6, 35.3);
    shape.bezierCurveTo(24.5, 39.6, 28.2, 42.8, 32.6, 43.1);
    shape.bezierCurveTo(37.2, 43.4, 41.6, 40.3, 42.8, 35.8);
    shape.bezierCurveTo(42.8, 35.7, 42.7, 36.1, 42.8, 35.8);
    shape.closePath();

    let hole4 = new THREE.Shape(); 
    hole4.moveTo(38.9, 33.2);
    hole4.bezierCurveTo(38.9, 36.4, 36.4, 38.9, 33.2, 38.9);
    hole4.bezierCurveTo(30.1, 38.9, 27.5, 36.4, 27.5, 33.2);
    hole4.bezierCurveTo(27.5, 30.1, 30.1, 27.5, 33.2, 27.5);
    hole4.bezierCurveTo(33.6, 27.5, 34.0, 27.6, 34.4, 27.7);
    hole4.lineTo(61.4, 3.1);
    hole4.lineTo(65.5, 7.5);
    hole4.lineTo(38.7, 31.8);
    hole4.bezierCurveTo(38.9, 32.2, 38.9, 32.7, 38.9, 33.2);
    hole4.closePath();

    shape.holes.push(hole4);

    shape.moveTo(63.1, 11.9);
    shape.lineTo(68.4, 7.1);
    shape.lineTo(64.9, 6.7);
    shape.lineTo(64.9, 6.6);
    shape.lineTo(62.2, 3.7);
    shape.lineTo(62.2, 3.7);
    shape.lineTo(62.0, 0.2);
    shape.lineTo(56.8, 5.1);
    shape.lineTo(57.0, 8.4);
    shape.lineTo(33.3, 29.9);
    shape.bezierCurveTo(33.3, 29.9, 33.3, 29.9, 33.3, 29.9);
    shape.bezierCurveTo(31.6, 29.9, 30.2, 31.3, 30.2, 33.0);
    shape.bezierCurveTo(30.2, 34.7, 31.6, 36.1, 33.3, 36.1);
    shape.bezierCurveTo(35.0, 36.1, 36.3, 34.7, 36.3, 33.0);
    shape.bezierCurveTo(36.3, 32.9, 36.3, 32.8, 36.3, 32.7);
    shape.lineTo(59.7, 11.4);
    shape.lineTo(63.1, 11.9);
    shape.closePath();

    return shape;
  }
  drawCustomerSuccessShape(shape) {
    shape.moveTo(56.3, 30.8);
    shape.lineTo(61.6, 22.6);
    shape.lineTo(52.9, 18.1);
    shape.lineTo(53.4, 8.3);
    shape.lineTo(43.6, 8.7);
    shape.lineTo(39.1, 0.0);
    shape.lineTo(30.8, 5.3);
    shape.lineTo(22.6, 0.0);
    shape.lineTo(18.1, 8.7);
    shape.lineTo(8.3, 8.3);
    shape.lineTo(8.7, 18.1);
    shape.lineTo(0.0, 22.6);
    shape.lineTo(5.3, 30.8);
    shape.lineTo(0.0, 39.1);
    shape.lineTo(8.7, 43.6);
    shape.lineTo(8.3, 53.4);
    shape.lineTo(14.4, 53.1);
    shape.lineTo(7.0, 75.5);
    shape.lineTo(16.3, 71.9);
    shape.lineTo(21.7, 80.4);
    shape.lineTo(29.3, 57.3);
    shape.lineTo(30.8, 56.3);
    shape.lineTo(32.8, 57.6);
    shape.lineTo(40.2, 80.4);
    shape.lineTo(45.6, 71.9);
    shape.lineTo(54.9, 75.5);
    shape.lineTo(47.6, 53.1);
    shape.lineTo(53.4, 53.4);
    shape.lineTo(52.9, 43.6);
    shape.lineTo(61.6, 39.1);
    shape.lineTo(56.3, 30.8);
    shape.closePath();

    let hole3 = new THREE.Shape();
    hole3.moveTo(29.1, 57.4);
    hole3.lineTo(22.6, 61.6);
    hole3.lineTo(18.1, 52.9);
    hole3.lineTo(14.4, 53.1);
    hole3.lineTo(13.7, 55.1);
    hole3.lineTo(16.9, 55.0);
    hole3.lineTo(20.8, 62.5);
    hole3.lineTo(21.8, 64.5);
    hole3.lineTo(23.6, 63.3);
    hole3.lineTo(28.3, 60.3);
    hole3.lineTo(29.1, 57.4);
    hole3.closePath();
      
    shape.holes.push(hole3);

    let hole4 = new THREE.Shape();
    hole4.moveTo(33.7, 60.6);
    hole4.lineTo(38.0, 63.3);
    hole4.lineTo(39.8, 64.5);
    hole4.lineTo(40.8, 62.5);
    hole4.lineTo(44.8, 55.0);
    hole4.lineTo(48.2, 55.1);
    hole4.lineTo(47.6, 53.1);
    hole4.lineTo(43.6, 52.9);
    hole4.lineTo(39.1, 61.6);
    hole4.lineTo(32.8, 57.6);
    hole4.lineTo(33.7, 60.6);
    hole4.closePath();

    shape.holes.push(hole4);

    let hole1 = new THREE.Shape();
    hole1.moveTo(30.8, 47.4);
    hole1.bezierCurveTo(21.7, 47.4, 14.3, 40.0, 14.3, 30.8);
    hole1.bezierCurveTo(14.3, 21.7, 21.7, 14.3, 30.8, 14.3);
    hole1.bezierCurveTo(40.0, 14.3, 47.4, 21.7, 47.4, 30.8);
    hole1.bezierCurveTo(47.4, 40.0, 40.0, 47.4, 30.8, 47.4);

    shape.holes.push(hole1);

    shape.moveTo(30.8, 15.9);
    shape.bezierCurveTo(22.6, 15.9, 15.9, 22.6, 15.9, 30.8);
    shape.bezierCurveTo(15.9, 39.0, 22.6, 45.7, 30.8, 45.7);
    shape.bezierCurveTo(39.0, 45.7, 45.7, 39.0, 45.7, 30.8);
    shape.bezierCurveTo(45.7, 22.6, 39.0, 15.9, 30.8, 15.9);

    let hole2 = new THREE.Shape();
    hole2.moveTo(36.7, 39.0);
    hole2.lineTo(30.7, 35.0);
    hole2.lineTo(24.8, 39.1);
    hole2.lineTo(26.9, 32.2);
    hole2.lineTo(21.1, 27.9);
    hole2.lineTo(28.3, 27.7);
    hole2.lineTo(30.6, 20.9);
    hole2.lineTo(33.0, 27.7);
    hole2.lineTo(40.3, 27.8);
    hole2.lineTo(34.5, 32.2);
    hole2.lineTo(36.7, 39.0);
    hole2.closePath();

    shape.holes.push(hole2);

    return shape;
  }
  drawProductShape(shape) {
    shape.moveTo(30.9, 63.0);
    shape.lineTo(0.0, 47.7);
    shape.lineTo(0.0, 16.8);
    shape.lineTo(30.9, 32.1);
    shape.lineTo(30.9, 63.0);
    shape.closePath();

    shape.moveTo(32.7, 63.0);
    shape.lineTo(63.6, 47.7);
    shape.lineTo(63.6, 16.8);
    shape.lineTo(32.7, 32.1);
    shape.lineTo(32.7, 63.0);
    shape.closePath();

    shape.moveTo(0.9, 15.2);
    shape.lineTo(31.8, 30.5);
    shape.lineTo(62.3, 15.2);
    shape.lineTo(31.5, 0.0);
    shape.lineTo(0.9, 15.2);
    shape.lineTo(0.9, 15.2);
    shape.closePath();

    return shape;
  }
  drawLegalShape(shape) {
    // arms
    shape.moveTo(78.3, 32.9);
    shape.lineTo(76.3, 32.9);
    shape.lineTo(66.1, 14.4);
    shape.bezierCurveTo(67.4, 13.5, 68.3, 12.1, 68.3, 10.4);
    shape.bezierCurveTo(68.3, 7.8, 66.2, 5.7, 63.6, 5.7);
    shape.bezierCurveTo(61.6, 5.7, 59.9, 7.0, 59.3, 8.7);
    shape.bezierCurveTo(57.8, 8.4, 56.3, 7.4, 54.2, 5.9);
    shape.bezierCurveTo(51.9, 4.2, 49.3, 2.2, 46.0, 1.9);
    shape.bezierCurveTo(44.6, 1.7, 43.3, 1.8, 42.2, 2.0);
    shape.bezierCurveTo(41.4, 0.8, 40.0, 0.0, 38.4, 0.0);
    shape.bezierCurveTo(36.8, 0.0, 35.4, 0.8, 34.5, 2.0);
    shape.bezierCurveTo(33.4, 1.8, 32.2, 1.7, 30.8, 1.9);
    shape.bezierCurveTo(27.4, 2.2, 24.8, 4.2, 22.5, 5.9);
    shape.bezierCurveTo(20.9, 7.1, 19.6, 8.0, 18.4, 8.5);
    shape.bezierCurveTo(17.7, 6.9, 16.1, 5.7, 14.2, 5.7);
    shape.bezierCurveTo(11.6, 5.7, 9.5, 7.8, 9.5, 10.4);
    shape.bezierCurveTo(9.5, 12.0, 10.3, 13.4, 11.5, 14.3);
    shape.lineTo(2.5, 32.9);
    shape.lineTo(0.0, 32.9);
    shape.bezierCurveTo(0.0, 33.0, 0.0, 33.1, 0.0, 33.2);
    shape.bezierCurveTo(0.0, 40.3, 6.6, 46.0, 14.7, 46.0);
    shape.bezierCurveTo(22.8, 46.0, 29.3, 40.3, 29.3, 33.2);
    shape.bezierCurveTo(29.3, 33.1, 29.3, 33.0, 29.3, 32.9);
    shape.lineTo(27.4, 32.9);
    shape.lineTo(17.0, 14.1);
    shape.bezierCurveTo(17.7, 13.6, 18.2, 12.9, 18.6, 12.1);
    shape.bezierCurveTo(20.8, 11.5, 22.7, 10.1, 24.6, 8.7);
    shape.bezierCurveTo(26.7, 7.1, 28.8, 5.6, 31.1, 5.3);
    shape.bezierCurveTo(32.2, 5.2, 33.0, 5.3, 33.8, 5.4);
    shape.bezierCurveTo(34.1, 7.7, 36.0, 9.4, 38.4, 9.4);
    shape.bezierCurveTo(40.7, 9.4, 42.6, 7.7, 43.0, 5.4);
    shape.bezierCurveTo(43.7, 5.3, 44.6, 5.2, 45.6, 5.3);
    shape.bezierCurveTo(48.0, 5.6, 50.0, 7.1, 52.1, 8.7);
    shape.bezierCurveTo(54.3, 10.3, 56.6, 12.0, 59.3, 12.3);
    shape.bezierCurveTo(59.6, 13.0, 60.1, 13.5, 60.6, 14.0);
    shape.lineTo(51.5, 32.9);
    shape.lineTo(49.0, 32.9);
    shape.bezierCurveTo(49.0, 33.0, 49.0, 33.1, 49.0, 33.2);
    shape.bezierCurveTo(49.0, 40.3, 55.5, 46.0, 63.7, 46.0);
    shape.bezierCurveTo(71.8, 46.0, 78.3, 40.3, 78.3, 33.2);
    shape.bezierCurveTo(78.3, 33.1, 78.3, 33.0, 78.3, 32.9);

    let hole1 = new THREE.Shape();
    hole1.moveTo(24.4, 32.9);
    hole1.lineTo(5.4, 32.9);
    hole1.lineTo(14.0, 15.1);
    hole1.bezierCurveTo(14.1, 15.1, 14.1, 15.1, 14.2, 15.1);
    hole1.bezierCurveTo(14.3, 15.1, 14.4, 15.1, 14.5, 15.1);
    hole1.lineTo(24.4, 32.9);
    hole1.closePath();

    shape.holes.push(hole1);

    let hole2 = new THREE.Shape();
    hole2.moveTo(54.4, 32.9);
    hole2.lineTo(63.0, 15.0);
    hole2.bezierCurveTo(63.2, 15.1, 63.4, 15.1, 63.5, 15.1);
    hole2.lineTo(73.4, 32.9);
    hole2.lineTo(54.4, 32.9);
    hole2.closePath();

    shape.holes.push(hole2);
    
    shape.moveTo(54.6, 61.9);
    shape.lineTo(48.0, 61.9);
    shape.bezierCurveTo(47.5, 58.2, 44.9, 55.2, 41.4, 54.1);
    shape.lineTo(41.4, 17.1);
    shape.bezierCurveTo(43.6, 16.0, 45.2, 13.8, 45.2, 11.2);
    shape.lineTo(31.9, 11.2);
    shape.bezierCurveTo(32.0, 13.8, 33.5, 16.0, 35.7, 17.1);
    shape.lineTo(35.7, 54.1);
    shape.bezierCurveTo(32.3, 55.2, 29.7, 58.2, 29.2, 61.9);
    shape.lineTo(23.4, 61.9);
    shape.bezierCurveTo(20.8, 61.9, 18.6, 64.1, 18.6, 66.7);
    shape.lineTo(18.6, 67.9);
    shape.lineTo(59.4, 67.9);
    shape.lineTo(59.4, 66.7);
    shape.bezierCurveTo(59.4, 64.1, 57.3, 61.9, 54.6, 61.9);

    return shape;
  }
  drawITShape(shape) {
    shape.moveTo(72.0, 43.3);
    shape.lineTo(72.0, 0.0);
    shape.lineTo(0.0, 0.0);
    shape.lineTo(0.0, 43.3);
    shape.lineTo(30.0, 43.3);
    shape.lineTo(30.0, 53.3);
    shape.lineTo(12.8, 53.3);
    shape.bezierCurveTo(10.0, 53.3, 7.8, 55.6, 7.8, 58.3);
    shape.lineTo(64.8, 58.3);
    shape.bezierCurveTo(64.8, 55.6, 62.5, 53.3, 59.8, 53.3);
    shape.lineTo(42.0, 53.3);
    shape.lineTo(42.0, 43.3);
    shape.lineTo(72.0, 43.3);
    shape.closePath();

    let hole1 = new THREE.Shape();
    hole1.moveTo(4.0, 4.3);
    hole1.lineTo(68.0, 4.3);
    hole1.lineTo(68.0, 39.0);
    hole1.lineTo(4.0, 39.0);
    hole1.lineTo(4.0, 4.3);
    hole1.closePath();

    shape.holes.push(hole1);

    // first gear
    shape.moveTo(36.5, 26.8);
    shape.bezierCurveTo(36.5, 26.1, 36.4, 25.3, 36.2, 24.6);
    shape.lineTo(38.8, 22.4);
    shape.lineTo(37.6, 20.3);
    shape.lineTo(34.4, 21.5);
    shape.bezierCurveTo(33.9, 21.0, 33.3, 20.5, 32.7, 20.2);
    shape.lineTo(32.9, 16.7);
    shape.lineTo(30.5, 16.1);
    shape.lineTo(29.1, 19.2);
    shape.bezierCurveTo(28.4, 19.2, 27.7, 19.3, 27.1, 19.5);
    shape.lineTo(24.7, 16.8);
    shape.lineTo(22.6, 18.1);
    shape.lineTo(23.8, 21.4);
    shape.bezierCurveTo(23.4, 21.8, 23.0, 22.4, 22.6, 23.0);
    shape.lineTo(19.0, 22.7);
    shape.lineTo(18.4, 25.1);
    shape.lineTo(21.6, 26.6);
    shape.bezierCurveTo(21.6, 27.2, 21.7, 27.9, 21.9, 28.6);
    shape.lineTo(19.1, 30.9);
    shape.lineTo(20.4, 33.0);
    shape.lineTo(23.7, 31.8);
    shape.bezierCurveTo(24.2, 32.3, 24.7, 32.7, 25.3, 33.1);
    shape.lineTo(25.0, 36.6);
    shape.lineTo(27.4, 37.2);
    shape.lineTo(28.9, 34.1);
    shape.bezierCurveTo(29.6, 34.1, 30.3, 34.0, 31.0, 33.8);
    shape.lineTo(33.2, 36.5);
    shape.lineTo(35.4, 35.2);
    shape.lineTo(34.2, 32.0);
    shape.bezierCurveTo(34.7, 31.6, 35.1, 31.0, 35.5, 30.3);
    shape.lineTo(38.9, 30.6);
    shape.lineTo(39.6, 28.2);
    shape.lineTo(36.5, 26.8);
    shape.closePath();

    let hole2 = new THREE.Shape();
    hole2.moveTo(29.0, 30.2);
    hole2.bezierCurveTo(27.0, 30.2, 25.4, 28.6, 25.4, 26.6);
    hole2.bezierCurveTo(25.4, 24.7, 27.0, 23.1, 29.0, 23.1);
    hole2.bezierCurveTo(30.9, 23.1, 32.5, 24.7, 32.5, 26.6);
    hole2.bezierCurveTo(32.5, 28.6, 30.9, 30.2, 29.0, 30.2);
    hole2.closePath();

    shape.holes.push(hole2);

    shape.moveTo(49.0, 16.3);
    shape.bezierCurveTo(49.0, 15.7, 49.0, 15.1, 48.9, 14.5);
    shape.lineTo(51.2, 12.8);
    shape.lineTo(50.3, 11.0);
    shape.lineTo(47.6, 11.7);
    shape.bezierCurveTo(47.2, 11.3, 46.8, 10.8, 46.3, 10.5);
    shape.lineTo(46.7, 7.7);
    shape.lineTo(44.8, 7.0);
    shape.lineTo(43.4, 9.5);
    shape.bezierCurveTo(42.8, 9.4, 42.2, 9.5, 41.6, 9.6);
    shape.lineTo(39.9, 7.2);
    shape.lineTo(38.1, 8.1);
    shape.lineTo(38.9, 10.9);
    shape.bezierCurveTo(38.4, 11.3, 38.0, 11.7, 37.7, 12.2);
    shape.lineTo(34.8, 11.7);
    shape.lineTo(34.1, 13.7);
    shape.lineTo(36.7, 15.1);
    shape.bezierCurveTo(36.6, 15.6, 36.7, 16.2, 36.8, 16.8);
    shape.lineTo(34.3, 18.5);
    shape.lineTo(35.2, 20.4);
    shape.lineTo(38.1, 19.6);
    shape.bezierCurveTo(38.4, 20.0, 38.8, 20.4, 39.3, 20.7);
    shape.lineTo(38.8, 23.6);
    shape.lineTo(40.8, 24.3);
    shape.lineTo(42.2, 21.8);
    shape.bezierCurveTo(42.8, 21.8, 43.3, 21.8, 43.9, 21.7);
    shape.lineTo(45.6, 24.1);
    shape.lineTo(47.5, 23.2);
    shape.lineTo(46.7, 20.4);
    shape.bezierCurveTo(47.2, 20.1, 47.6, 19.6, 47.9, 19.2);
    shape.lineTo(50.7, 19.6);
    shape.lineTo(51.4, 17.7);
    shape.lineTo(49.0, 16.3);
    shape.closePath();

    let hole3 = new THREE.Shape();
    hole3.moveTo(42.8, 18.6);
    hole3.bezierCurveTo(41.1, 18.6, 39.8, 17.3, 39.8, 15.7);
    hole3.bezierCurveTo(39.8, 14.0, 41.1, 12.7, 42.8, 12.7);
    hole3.bezierCurveTo(44.4, 12.7, 45.7, 14.0, 45.7, 15.7);
    hole3.bezierCurveTo(45.7, 17.3, 44.4, 18.6, 42.8, 18.6);
    hole3.closePath();
    
    shape.holes.push(hole3);

    shape.moveTo(49.8, 29.2);
    shape.lineTo(51.6, 28.2);
    shape.lineTo(51.1, 26.8);
    shape.lineTo(49.1, 27.2);
    shape.bezierCurveTo(48.8, 26.8, 48.5, 26.5, 48.2, 26.2);
    shape.lineTo(48.7, 24.2);
    shape.lineTo(47.3, 23.6);
    shape.lineTo(46.2, 25.3);
    shape.bezierCurveTo(45.8, 25.2, 45.3, 25.2, 44.9, 25.2);
    shape.lineTo(43.8, 23.4);
    shape.lineTo(42.4, 24.0);
    shape.lineTo(42.8, 26.0);
    shape.bezierCurveTo(42.5, 26.3, 42.2, 26.6, 41.9, 26.9);
    shape.lineTo(39.8, 26.3);
    shape.lineTo(39.2, 27.7);
    shape.lineTo(41.0, 28.9);
    shape.bezierCurveTo(40.9, 29.3, 40.9, 29.7, 40.9, 30.1);
    shape.lineTo(39.1, 31.2);
    shape.lineTo(39.6, 32.6);
    shape.lineTo(41.7, 32.2);
    shape.bezierCurveTo(41.9, 32.6, 42.2, 32.9, 42.5, 33.1);
    shape.lineTo(42.0, 35.2);
    shape.lineTo(43.3, 35.8);
    shape.lineTo(44.5, 34.1);
    shape.bezierCurveTo(44.9, 34.1, 45.4, 34.2, 45.8, 34.1);
    shape.lineTo(46.9, 36.0);
    shape.lineTo(48.3, 35.4);
    shape.lineTo(47.9, 33.4);
    shape.bezierCurveTo(48.2, 33.2, 48.5, 32.9, 48.8, 32.5);
    shape.lineTo(50.8, 33.1);
    shape.lineTo(51.5, 31.7);
    shape.lineTo(49.8, 30.5);
    shape.bezierCurveTo(49.9, 30.1, 49.9, 29.7, 49.8, 29.2);
    shape.closePath();

    let hole4 = new THREE.Shape();
    hole4.moveTo(45.3, 31.8);
    hole4.bezierCurveTo(44.2, 31.8, 43.3, 30.8, 43.3, 29.7);
    hole4.bezierCurveTo(43.3, 28.6, 44.2, 27.6, 45.3, 27.6);
    hole4.bezierCurveTo(46.5, 27.6, 47.4, 28.6, 47.4, 29.7);
    hole4.bezierCurveTo(47.4, 30.8, 46.5, 31.8, 45.3, 31.8);
    hole4.closePath();

    shape.holes.push(hole4);
    
    return shape;
  }
  drawHRShape(shape) {
    // shape.moveTo(25.4, 13.0);
    // shape.bezierCurveTo(25.4, 5.8, 31.3, 0.0, 38.4, 0.0);
    // shape.bezierCurveTo(45.6, 0.0, 51.4, 5.8, 51.4, 13.0);
    // shape.bezierCurveTo(51.4, 20.1, 45.6, 26.0, 38.4, 26.0);
    // shape.bezierCurveTo(31.3, 26.0, 25.4, 20.1, 25.4, 13.0);

    // shape.moveTo(3.0, 17.9);
    // shape.bezierCurveTo(3.0, 23.8, 7.7, 28.5, 13.6, 28.5);
    // shape.bezierCurveTo(19.5, 28.5, 24.2, 23.8, 24.2, 17.9);
    // shape.bezierCurveTo(24.2, 12.1, 19.5, 7.3, 13.6, 7.3);
    // shape.bezierCurveTo(7.7, 7.3, 3.0, 12.1, 3.0, 17.9);

    shape.moveTo(66.9, 30.3);
    shape.lineTo(59.7, 30.3);
    shape.bezierCurveTo(57.7, 30.3, 55.8, 30.9, 54.3, 31.9);
    shape.bezierCurveTo(55.1, 33.7, 55.7, 35.7, 55.7, 37.8);
    shape.lineTo(55.7, 57.7);
    shape.bezierCurveTo(63.6, 55.2, 70.7, 51.1, 76.9, 45.8);
    shape.lineTo(76.9, 40.3);
    shape.bezierCurveTo(76.9, 34.8, 72.4, 30.3, 66.9, 30.3);

    // shape.moveTo(63.3, 28.5);
    // shape.bezierCurveTo(69.1, 28.5, 73.9, 23.8, 73.9, 17.9);
    // shape.bezierCurveTo(73.9, 12.1, 69.1, 7.3, 63.3, 7.3);
    // shape.bezierCurveTo(57.4, 7.3, 52.7, 12.1, 52.7, 17.9);
    // shape.bezierCurveTo(52.7, 23.8, 57.4, 28.5, 63.3, 28.5);

    shape.moveTo(21.2, 58.1);
    shape.lineTo(21.2, 37.8);
    shape.bezierCurveTo(21.2, 35.7, 21.7, 33.7, 22.6, 31.9);
    shape.bezierCurveTo(21.0, 30.9, 19.2, 30.3, 17.2, 30.3);
    shape.lineTo(10.0, 30.3);
    shape.bezierCurveTo(4.5, 30.3, 0.0, 34.8, 0.0, 40.3);
    shape.lineTo(0.0, 47.2);
    shape.bezierCurveTo(6.2, 52.1, 13.4, 55.9, 21.2, 58.1);

    shape.moveTo(54.3, 58.5);
    shape.lineTo(54.3, 38.8);
    shape.bezierCurveTo(54.3, 32.3, 49.1, 27.0, 42.6, 27.0);
    shape.lineTo(34.3, 27.0);
    shape.bezierCurveTo(27.8, 27.0, 22.5, 32.3, 22.5, 38.8);
    shape.lineTo(22.5, 59.0);
    shape.bezierCurveTo(27.5, 60.3, 32.5, 60.9, 37.6, 60.9);
    shape.bezierCurveTo(43.3, 60.9, 48.9, 60.1, 54.3, 58.5);
    
    return shape;
  }
}

export default Shapes;
