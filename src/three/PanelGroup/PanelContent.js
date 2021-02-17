import createText from './bmfont';
import MSDFShader from './bmfont/shaders/msdf';
import PanelBG from './PanelBG';
import Shapes from './Shapes';


class PanelContent {
  constructor(width, options) {
    this.width = width;
    this.options = options;

    this.scale = 0.0104;

    this.shapes = new Shapes();
    this.contentMeshes = new THREE.Object3D();
    this.totalHeight = 0;
    this.widest = 0;

    _.each(_.reverse(this.options.contents), (c) => {
      switch (c.type) {
        default:
        case 'text':
          this.drawText(c, this.options);
          break;
        case 'header':
          this.drawHeader(c, this.options);
          break;
        case 'barChart':
          this.drawBarChart(c, this.options);
          break;
        case 'image':
          this.drawImage(c, this.options);
          break;
        case 'icon':
          this.drawIcon(c, this.options);
          break;
        case 'department':
          this.drawDepartment(c, this.options);
          break;
      }
    });
  }

  getContent() {
    return this.contentMeshes;
  }

  getWidth() {
    return (this.width === 'auto' || this.width === 0) ? this.widest + (this.options.padding[1] + this.options.padding[3]) : (this.width * this.scale) + (this.options.padding[1] + this.options.padding[3]);
  }

  getHeight() {
    return this.totalHeight + this.options.padding[0] + this.options.padding[2];
  }

  updateWidest(widthVal) {
    if (this.widest < widthVal) {
      this.widest = widthVal;
    }
  }

  drawImage(contentObj, options) {
    const s = 0.0104;
    const w = (this.width * s) - (options.padding[1] + options.padding[3]);

    const imgCanvas = document.createElement('canvas');
    const imgGeo = new THREE.PlaneBufferGeometry(w, w, 1);
    const imgMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 1,
      map: new THREE.Texture(imgCanvas),
      side: THREE.DoubleSide,
    });
    const imgMesh = new THREE.Mesh(imgGeo, imgMat);
    imgMesh.defaults = {
      opacity: 1,
    };

    // scale down for bg usage
    const padding = _.map(options.padding, p => p * 2500);
    const cornerRadius = _.map(options.cornerRadius, c => c * 2500);

    this.cropImageTexture(
      imgCanvas,
      contentObj.value,
      padding,
      cornerRadius,
      contentObj.crop,
      (canvas) => {
        imgMesh.material.map.needsUpdate = true;
      },
    );

    imgMesh.position.x += (w / 2);
    imgMesh.position.y += (w / 2);
    imgMesh.position.z = options.layerSeparation;

    this.contentMeshes.add(imgMesh);

    this.totalHeight += w;
    this.updateWidest(w);
  }

  drawIcon(contentObj, options) {
    const s = 0.0104;
    const h = 0.03;
    const barPadding = 0.0075;

    if (contentObj.value) {
      let iconShape = this.shapes.drawVideoShape(new THREE.Shape());
      switch (contentObj.value.toLowerCase()) {
        case 'sales':
          iconShape = this.shapes.drawSalesShape(new THREE.Shape());
          break;
        case 'operations':
          iconShape = this.shapes.drawOperationsShape(new THREE.Shape());
          break;
        default:
        case 'others':
        case 'null':
          iconShape = this.shapes.drawOthersShape(new THREE.Shape());
          break;
        case 'analytics':
          iconShape = this.shapes.drawAnalyticsShape(new THREE.Shape());
          break;
        case 'marketing':
          iconShape = this.shapes.drawMarketingShape(new THREE.Shape());
          break;
        case 'customer success':
          iconShape = this.shapes.drawCustomerSuccessShape(new THREE.Shape());
          break;
        case 'product':
          iconShape = this.shapes.drawProductShape(new THREE.Shape());
          break;
        case 'legal':
          iconShape = this.shapes.drawLegalShape(new THREE.Shape());
          break;
        case 'it':
          iconShape = this.shapes.drawITShape(new THREE.Shape());
          break;
        case 'hr':
          iconShape = this.shapes.drawHRShape(new THREE.Shape());
          break;
      }

      let xPos = 0.01;
      if (iconShape !== null) {
        const iconGeo = new THREE.ExtrudeBufferGeometry(
          iconShape,
          {
            bevelEnabled: false,
            bevelSegments: 0,
            steps: 1,
            amount: 1,
          },
        );
        const icon = new THREE.Mesh(iconGeo, new THREE.MeshBasicMaterial({
          color: contentObj.style.color,
          transparent: false,
          opacity: 1,
          side: THREE.DoubleSide,
        }));
        icon.defaults = {
          opacity: 1,
        };
        icon.geometry.computeBoundingBox();
        icon.rotation.x = Math.PI;
        const s = 0.0025;
        icon.scale.set(s, s, s);
        icon.position.x = (this.getWidth() / 2)  - ((icon.geometry.boundingBox.max.x * s) / 2);
        icon.position.y = this.totalHeight + options.padding[2] + ((icon.geometry.boundingBox.max.y - contentObj.padding[0]) * s);
        icon.position.z = options.layerSeparation;

        this.contentMeshes.add(icon);

        const w = (icon.geometry.boundingBox.max.x * s) + (options.padding[1] + options.padding[3]);
        // const textScale = 0.00023 * contentObj.style.size;
        // const fontObj = _.filter(options.fonts, { name: contentObj.style.weight })[0];

        this.totalHeight += options.padding[0] + ((icon.geometry.boundingBox.max.y - contentObj.padding[0]) * s);
        this.updateWidest(w);
      }
    }
  }

  drawBarChart(contentObj, options) {
    const s = 0.0104;
    const h = 0.03;
    const barPadding = 0.0075;

    _.each(contentObj.data, (d) => {
      let w = (this.width + options.padding[1] + options.padding[3]) * s;
      w *= (d.value / 100);
      const barGeo = new THREE.PlaneBufferGeometry(
        w,
        h,
        1,
      );
      const barMat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 1,
        color: d.color,
        side: THREE.DoubleSide,
      });
      const bar = new THREE.Mesh(barGeo, barMat);
      bar.defaults = {
        opacity: 1,
      };
      bar.geometry.computeBoundingBox();

      bar.position.x = (w / 2) + options.padding[3];
      bar.position.y = this.totalHeight + options.padding[2] + bar.geometry.boundingBox.max.y;
      bar.position.z = options.layerSeparation;

      this.contentMeshes.add(bar);

      // add icon
      if (d.showIcon) {
        let iconShape = this.shapes.drawVideoShape(new THREE.Shape());
        switch (d.type.toLowerCase()) {
          default:
          case 'xls':
          case 'excel':
            iconShape = this.shapes.drawXLSShape(new THREE.Shape());
            break;
          case 'txt':
          case 'text':            
            iconShape = this.shapes.drawTXTShape(new THREE.Shape());
            break;
          case 'ppt':
            iconShape = this.shapes.drawPPTShape(new THREE.Shape());
            break;
          case 'pdf':
            iconShape = this.shapes.drawPDFShape(new THREE.Shape());
            break;
          case 'media':
            iconShape = this.shapes.drawMediaShape(new THREE.Shape());
            break;
          case 'image':
          case 'img':
            iconShape = this.shapes.drawImgShape(new THREE.Shape());
            break;
          case 'doc':
          case 'docs':
            iconShape = this.shapes.drawDocShape(new THREE.Shape());
            break;
          case 'zip':
            iconShape = this.shapes.drawZipShape(new THREE.Shape());
            break;
          case 'others':
            iconShape = null;
            break;
        }

        let xPos = 0.01;
        if (iconShape !== null) {
          const iconGeo = new THREE.ExtrudeBufferGeometry(
            iconShape,
            {
              bevelEnabled: false,
              bevelSegments: 0,
              steps: 1,
              amount: 0.1,
            },
          );
          const icon = new THREE.Mesh(iconGeo, new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 1,
          }));
          icon.defaults = {
            opacity: 1,
          };
          icon.geometry.computeBoundingBox();
          icon.rotation.x = Math.PI;
          const s = h / 60;
          icon.scale.set(s, s, s);
          xPos += options.padding[3] - 0.005;
          icon.position.x = xPos;
          icon.position.y = this.totalHeight + options.padding[2] + bar.geometry.boundingBox.max.y +
          ((icon.geometry.boundingBox.max.y * s) / 2);
          icon.position.z = options.layerSeparation * 2;

          this.contentMeshes.add(icon);
        }

        const w = (this.width * this.scale) + (options.padding[1] + options.padding[3]);
        const textScale = 0.00023 * contentObj.style.size;
        const fontObj = _.filter(options.fonts, { name: contentObj.style.weight })[0];

          // draw text first to get dimensions
        const labelMesh = this.createTextMesh(
          fontObj.font,
          fontObj.texture,
          d.type,
          contentObj.align,
          contentObj.style.color,
          fontObj.font.common.lineHeight,
          (this.width === 'auto' || this.width === 0) ? null : w * (4300 / contentObj.style.size),
        );

        labelMesh.scale.set(textScale, textScale, textScale);

        labelMesh.children[0].geometry.computeBoundingBox();
        labelMesh.position.x = xPos + 0.016;
        labelMesh.position.y = (this.totalHeight + options.padding[0] + options.padding[2]/2)
          - (options.padding[0] / 2)
          - ((labelMesh.children[0].totalHeight * textScale) / 2);

        labelMesh.position.z = options.layerSeparation * 2;
        labelMesh.rotation.x = Math.PI;

        // this.layer2.push(textMesh);
        this.contentMeshes.add(labelMesh);

        const percentMesh = this.createTextMesh(
          fontObj.font,
          fontObj.texture,
          (d.value.toString().indexOf('.') == -1) ? d.value : d.value.toFixed(2) + "%",
          "right",
          contentObj.style.color,
          fontObj.font.common.lineHeight,
          (this.width === 'auto' || this.width === 0) ? null : w * (4300 / contentObj.style.size),
        );

        percentMesh.scale.set(textScale, textScale, textScale);

        percentMesh.children[0].geometry.computeBoundingBox();
        percentMesh.position.x = -options.padding[3] - 0.001;
        percentMesh.position.y = (this.totalHeight + options.padding[0] + options.padding[2]/2)
          - (options.padding[0] / 2)
          - ((percentMesh.children[0].totalHeight * textScale) / 2);

          percentMesh.position.z = options.layerSeparation * 2;
          percentMesh.rotation.x = Math.PI;

        // this.layer2.push(textMesh);
        this.contentMeshes.add(percentMesh);
      }

      this.totalHeight += (bar.geometry.boundingBox.max.y * 2) + barPadding;
      this.updateWidest(w);
    });
  }

  drawHeader(contentObj, options) {
    const w = (this.width * this.scale) + (options.padding[1] + options.padding[3]);

    const textScale = 0.00023 * contentObj.style.size;
    const fontObj = _.filter(options.fonts, { name: contentObj.style.weight })[0];

      // draw text first to get dimensions
    const textMesh = this.createTextMesh(
      fontObj.font,
      fontObj.texture,
      contentObj.value,
      contentObj.align,
      contentObj.style.color,
      fontObj.font.common.lineHeight,
      (this.width === 'auto' || this.width === 0) ? null : w * (4300 / contentObj.style.size),
    );

    textMesh.scale.set(textScale, textScale, textScale);

    textMesh.children[0].geometry.computeBoundingBox();
    textMesh.position.x = 0;
    textMesh.position.y = (this.totalHeight + options.padding[0] + options.padding[2])
      - (options.padding[0] / 2)
      - ((textMesh.children[0].totalHeight * textScale) / 2);

    textMesh.position.z = options.layerSeparation * 2;
    textMesh.rotation.x = Math.PI;

    let textH = (textMesh.children[0].geometry.layout.height * textScale)
      + (contentObj.padding[0] * options.scaleFactor)
      + (contentObj.padding[2] * options.scaleFactor);
    let h = options.padding[0];
    
    if ((textMesh.children[0].geometry.layout.height * textScale) > h) {
      h = textH;
      textMesh.position.y = (this.totalHeight + options.padding[0] + options.padding[2])
        - (options.padding[0] / 2)
        - ((textMesh.children[0].totalHeight * textScale) / 2)
        + (contentObj.padding[0] * options.scaleFactor);

      this.totalHeight += ((textH - h)
          + (contentObj.padding[0] * options.scaleFactor)
          + (contentObj.padding[2] * options.scaleFactor));
    }

    this.contentMeshes.add(textMesh);

    if (contentObj.backgroundColor !== 'none') {
      const cornerRadius = _.clone(options.cornerRadius);
      cornerRadius[2] = 0;
      cornerRadius[3] = 0;
      const bgMesh = new PanelBG(
        options.shape,
        w,
        h,
        [0, 0, 0, 0],
        cornerRadius,
        contentObj.backgroundColor,
        contentObj.backgroundOpacity,
        contentObj.backgroundThickness,
        false);
      
      if ((textMesh.children[0].geometry.layout.height * textScale) > h) {
        bgMesh.position.y = this.totalHeight - (textH)
          + (bgMesh.geometry.boundingBox.max.y / 2)
          + options.padding[0]
          - (textH / 2)
          + (contentObj.padding[0] * options.scaleFactor);
      } else {
        bgMesh.position.y = this.totalHeight - (textH)
          + (bgMesh.geometry.boundingBox.max.y / 2)
          + options.padding[0]
          - (textH / 2)
          + (contentObj.padding[0] * options.scaleFactor)
          + (contentObj.padding[0] * options.scaleFactor) / 2
      }
      bgMesh.position.z = options.layerSeparation;

      this.contentMeshes.add(bgMesh);
    }

    this.updateWidest(this.width);
  }

  drawDepartment(contentObj, options) {
    const textScale = 0.0003 * contentObj.style.size;
    const fontObj = _.filter(options.fonts, { name: contentObj.style.weight })[0];

    let val = contentObj.value.toLowerCase();
    switch(val) {
      default:
      case 'analytics': // A = Analytics
        val = 'A';
        break;
      case 'customer success': // C = Customer Success
        val = 'C';
        break;
      case 'engineering': // E = Engineering
        val = 'E';
        break;
      case 'hr': // H = HR
        val = 'H';
        break;
      case 'it': // I = IT
        val = 'I';
        break;
      case 'legal': // L = Legal
        val = 'L';
        break;
      case 'marketing': // M = Marketing
        val = 'M';
        break;
      case 'others':
      case ' ':
      case 'none':
      case undefined:
      case 'null': // N = Null
        val = 'N';
        break;
      case 'operations': // O = Operations
        val = 'O';
        break;
      case 'product': // P = Product
        val = 'P';
        break;
      case 'sales': // S = Sales
        val = 'S';
        break;
    }

    // draw text first to get dimensions
    const textMesh = this.createTextMesh(
      fontObj.font,
      fontObj.texture,
      val,
      contentObj.align,
      contentObj.style.color,
      fontObj.font.common.lineHeight,
      (this.width === 'auto' || this.width === 0) ? null : this.width * (34 / contentObj.style.size),
    );

    textMesh.scale.set(textScale, textScale, textScale);

    textMesh.children[0].geometry.computeBoundingBox();
    textMesh.position.x = options.padding[3];
    textMesh.position.y = this.totalHeight + options.padding[2] + 0.09
      + (contentObj.padding[2] * options.scaleFactor);
    textMesh.position.z = options.layerSeparation;
    textMesh.rotation.x = Math.PI;

    // this.layer2.push(textMesh);
    this.contentMeshes.add(textMesh);

    this.totalHeight += (textMesh.children[0].totalHeight * textScale) + 0.2
      + (contentObj.padding[0] * options.scaleFactor)
      + (contentObj.padding[2] * options.scaleFactor);
    this.updateWidest(textMesh.children[0].totalWidth * textScale);
  }

  drawText(contentObj, options) {
    const textScale = 0.0003 * contentObj.style.size;
    const fontObj = _.filter(options.fonts, { name: contentObj.style.weight })[0];

    // draw text first to get dimensions
    const textMesh = this.createTextMesh(
      fontObj.font,
      fontObj.texture,
      contentObj.value,
      contentObj.align,
      contentObj.style.color,
      fontObj.font.common.lineHeight,
      (this.width === 'auto' || this.width === 0) ? null : this.width * (34 / contentObj.style.size),
    );

    textMesh.scale.set(textScale, textScale, textScale);

    textMesh.children[0].geometry.computeBoundingBox();
    textMesh.position.x = options.padding[3];
    textMesh.position.y = this.totalHeight + options.padding[2]
      + (contentObj.padding[2] * options.scaleFactor);
    textMesh.position.z = options.layerSeparation;
    textMesh.rotation.x = Math.PI;

    // this.layer2.push(textMesh);
    this.contentMeshes.add(textMesh);

    this.totalHeight += (textMesh.children[0].totalHeight * textScale)
      + (contentObj.padding[0] * options.scaleFactor)
      + (contentObj.padding[2] * options.scaleFactor);
    this.updateWidest(textMesh.children[0].totalWidth * textScale);
  }

  createTextMesh(font, texture, text, align, color, lineHeight, width) {
    const textOptions = {
      text: text,
      font: font,
      align: align,
      lineHeight: lineHeight,
    };

    if (width !== undefined || width !== null) {
      textOptions.width = width;
    }

    const textMesh = new THREE.Mesh(
      createText(textOptions),
      new THREE.RawShaderMaterial(
        MSDFShader(
          {
            map: texture,
            transparent: true,
            color: color,
            side: THREE.DoubleSide,
            opacity: 1,
          },
        ),
      ),
    );
    textMesh.defaults = {
      opacity: 1,
    };

    textMesh.geometry.computeBoundingBox();
    textMesh.totalHeight = textMesh.geometry.layout.height
      - textMesh.geometry.boundingBox.max.y
      - (textMesh.geometry.layout.descender * 2);
    textMesh.totalWidth = textMesh.geometry.boundingBox.max.x;
    textMesh.geometry.computeBoundingBox();
    textMesh.position.set(0, textMesh.geometry.layout.descender * 2, 0);

    return new THREE.Object3D().add(textMesh);
  }

  drawRoundedRectangleCanvas(ctx, width, height, padding, radii) {
    padding = _.reverse(padding);
    radii = _.reverse(radii);
    // padding: top, right, bottom, left
    // radii: top-left, top-right, bottom-right, bottom-left
    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.beginPath();
    ctx = this.shapes.drawRoundedRectangleShape(ctx, width, height, padding, radii);
    ctx.closePath();
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fill();
    ctx.restore();
    return ctx;
  }

  cropImageTexture(canvas, imgSrc, padding, cornerRadius, crop, callback) {
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    const img = new Image();

    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;

      canvas.width = w;
      canvas.height = h;

      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      canvas.style.position = 'absolute';
      canvas.style.top = 0;

      ctx.save();
      if (crop) {
        this.drawRoundedRectangleCanvas(ctx, w, h, padding, cornerRadius);
        ctx.clip();
      }
      ctx.drawImage(img, 0, 0, w, h);
      ctx.restore();

      callback(canvas);
    };

    img.src = imgSrc;
  }
}

export default PanelContent;
