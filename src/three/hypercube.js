class Hypercube {
  constructor() {
    this.hypercube = new THREE.Object3D();
    this.hypercubeData = null;
    this.cubeShadowGeometry = null;
    this.shadowBuffer = null;
    this.shadowVerts = null;

    this.lastTime = 0;

    this.drawHypercube();
  }

  getHypercube() {
    return this.hypercube;
  }

  drawHypercube() {
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ccff,
      transparent: true,
      opacity: 0.6,
    });

    this.hypercubeData = this.hypercubeMeshGemometry(1);
    this.cubeShadowGeometry = this.hypercubeData.clone();

    this.shadowBuffer = new THREE.BufferGeometry();

    this.shadowVerts = new THREE.Line(this.cubeShadowGeometry, lineMaterial);
    this.shadowBuffer.setFromObject(this.shadowVerts);
    this.shadowBuffer.setIndex(new THREE.BufferAttribute(this.hypercubeData.userData.indices, 1));

    const line = new THREE.LineSegments(this.shadowBuffer, lineMaterial);
    this.hypercube.add(line);

    const hypermaterial = new THREE.MeshBasicMaterial({
      color: 0xff,
      opacity: 0.2,
      transparent: true,
      // side: THREE.DoubleSide,
      // depthTest: false,
    });

    const meshBuffer = new THREE.BufferGeometry();
    const shadowMesh = new THREE.Mesh(this.cubeShadowGeometry, hypermaterial);

    this.hypercube.add(shadowMesh);
  }

  hypercubeGemometry(size) {
    const o = size / 2;  
    let output = new THREE.Geometry();

    output.vertices.push(
      new THREE.Vector4(-o, -o, -o, -o),
      new THREE.Vector4(o, -o, -o, -o),
      new THREE.Vector4(o, o, -o, -o),
      new THREE.Vector4(-o, o, -o, -o),

      new THREE.Vector4(-o, o, o, -o),
      new THREE.Vector4(o, o, o, -o),
      new THREE.Vector4(o, -o, o, -o),
      new THREE.Vector4(-o, -o, o, -o),

      new THREE.Vector4(-o, -o, o, o),
      new THREE.Vector4(o, -o, o, o),
      new THREE.Vector4(o, o, o, o),
      new THREE.Vector4(-o, o, o, o),

      new THREE.Vector4(-o, o, -o, o),
      new THREE.Vector4(o, o, -o, o),
      new THREE.Vector4(o, -o, -o, o),
      new THREE.Vector4(-o, -o, -o, o),
    );

    output.indices = new Uint16Array([
      0, 1, 1, 2, 2, 3, 3, 4,
      4, 5, 5, 6, 6, 7, 7, 8,
      8, 9, 9, 10, 10, 11, 11, 12,
      12, 13, 13, 14, 14, 15, 15, 0,

      0, 3, 2, 5, 4, 7, 6, 9,
      8, 11, 10, 13, 12, 15, 14, 1,

      0, 7, 1, 6, 2, 13, 3, 12,
      4, 11, 5, 10, 8, 15, 9, 14,
    ]);

    return output;
  }

  hypercubeMeshGemometry(size) {
    const o = size / 2;
    let output = new THREE.Geometry();

    output.vertices.push(
      new THREE.Vector4(-o, -o, -o, -o),
      new THREE.Vector4(o, -o, -o, -o),
      new THREE.Vector4(-o, o, -o, -o),
      new THREE.Vector4(o, o, -o, -o),

      new THREE.Vector4(-o, -o, o, -o),
      new THREE.Vector4(o, -o, o, -o),
      new THREE.Vector4(-o, o, o, -o),
      new THREE.Vector4(o, o, o, -o),

      new THREE.Vector4(-o, -o, -o, o),
      new THREE.Vector4(o, -o, -o, o),
      new THREE.Vector4(-o, o, -o, o),
      new THREE.Vector4(o, o, -o, o),

      new THREE.Vector4(-o, -o, o, o),
      new THREE.Vector4(o, -o, o, o),
      new THREE.Vector4(-o, o, o, o),
      new THREE.Vector4(o, o, o, o),
    );

    for (let i = 0; i < 9; i += 8) {
      output.faces.push(
        // back
        new THREE.Face3(i + 1, i + 2, i + 3),
        new THREE.Face3(i + 1, i + 0, i + 2),
        // front
        new THREE.Face3(i + 4, i + 7, i + 6),
        new THREE.Face3(i + 4, i + 5, i + 7),
        // left
        new THREE.Face3(i + 0, i + 6, i + 2),
        new THREE.Face3(i + 0, i + 4, i + 6),
        // right
        new THREE.Face3(i + 5, i + 3, i + 7),
        new THREE.Face3(i + 5, i + 1, i + 3),
        // bottom
        new THREE.Face3(i + 0, i + 5, i + 4),
        new THREE.Face3(i + 0, i + 1, i + 5),
        // top
        new THREE.Face3(i + 6, i + 3, i + 2),
        new THREE.Face3(i + 6, i + 7, i + 3),
      )
    };

    output.userData = {};
    output.userData.indices = new Uint16Array([
      0, 1, 0, 2, 1, 3, 2, 3,
      4, 5, 4, 6, 5, 7, 6, 7,
      8, 9, 8, 10, 9, 11, 10, 11,
      12, 13, 12, 14, 13, 15, 14, 15,

      0, 4, 1, 5, 2, 6, 3, 7,
      8, 12, 9, 13, 10, 14, 11, 15,

      0, 8, 1, 9, 2, 10, 3, 11,
      4, 12, 5, 13, 6, 14, 7, 15,
    ]);

    output.elementsNeedUpdate = true;
    output.computeFaceNormals();
    output.computeBoundingSphere();

    return output;
  }

  project3DShadow(source, output) {
    for (let i = 0; i < source.vertices.length; i++) {
      let d = 2 / (source.vertices[i].w + 2);
      output.vertices[i] = new THREE.Vector3(
        source.vertices[i].x * d,
        source.vertices[i].y * d,
        source.vertices[i].z * d,
      );
    }

    output.verticesNeedUpdate = true;
    output.elementsNeedUpdate = true;
    output.computeFaceNormals();
    output.computeBoundingSphere();
    return output
  }

  rotateXYMatrix4(angle = 0) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    return new THREE.Matrix4().set(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, c, s,
      0, 0, -s, c,
    );
  }

  rotateYMatrix4(angle = 0) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    return new THREE.Matrix4().set(
      c, 0, -s, 0,
      0, 1, 0, 0,
      s, 0, c, 0,
      0, 0, 0, 1,
    );
  }

  update(timestamp) {
    const deltaTime = (timestamp - this.lastTime);

    this.hypercubeData.applyMatrix(this.rotateXYMatrix4(0.001 * deltaTime));
    this.project3DShadow(this.hypercubeData, this.cubeShadowGeometry);
    this.shadowBuffer.updateFromObject(this.shadowVerts);

    this.lastTime = timestamp;
  }
}

export default Hypercube;