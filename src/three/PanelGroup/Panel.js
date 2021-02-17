import PanelContent from './PanelContent';
import PanelBG from './PanelBG';

class Panel {
  drawPanel(contentList, options) {
    // defaults
    let padding = (options.padding !== undefined) ?
      options.padding : 25;
    const thickness = (options.thickness !== undefined) ?
      options.thickness : 0.1 || 0.01;
    const color = (options.color !== undefined) ?
      options.color : 0x002947;
    const opacity = (options.opacity !== undefined) ?
      options.opacity : 0.75;
    const shape = (options.shape !== undefined) ?
      options.shape : 'roundedRect';
    let cornerRadius = (options.cornerRadius !== undefined) ?
      options.cornerRadius : [0, 0, 0, 0];
    const width = (options.width !== undefined) ?
      options.width : 'auto';
    const position = (options.position !== undefined) ?
      options.position : new THREE.Vector3(0, 0, 0);
    const align = (options.align !== undefined) ?
      options.align : 'bottom center';
    const fonts = (options.fonts !== undefined) ?
      options.fonts : [];
    const layerSeparation = (options.layerSeparation !== undefined) ?
      options.layerSeparation : 0.0075;
    const outline = (options.outline !== undefined) ?
      options.outline : true;

    const panelGroup = new THREE.Object3D();

    const scaleFactor = 0.0088; // scale to cm

    // scale down for bg usage
    padding = _.map(padding, p => p * scaleFactor);
    cornerRadius = _.map(cornerRadius, c => c * scaleFactor);

    const content = new PanelContent(
      width,
      {
        contents: contentList,
        fonts: fonts,
        layerSeparation: layerSeparation,
        scaleFactor: scaleFactor,
        shape: shape,
        padding: padding,
        cornerRadius: cornerRadius,
        color: color,
        opacity: opacity,
        thickness: thickness,
      },
    );

    panelGroup.add(content.getContent());

    // move content into position
    const bgMesh = new PanelBG(
      shape,
      content.getWidth(),
      content.getHeight(),
      padding,
      cornerRadius,
      color,
      opacity,
      thickness,
      outline,
    );
    panelGroup.add(bgMesh);

    _.each(align, (a) => {
      switch (a) {
        default:
        case 'left':
          break;
        case 'bottom':
          panelGroup.position.y = 0;
          break;
        case 'center':
          panelGroup.position.x = -(bgMesh.geometry.boundingBox.max.x / 2);
          break;
        case 'right':
          panelGroup.position.x = -(bgMesh.geometry.boundingBox.max.x);
          break;
        case 'top':
          panelGroup.position.y = -content.getHeight();
          break;
      }
    });

    panelGroup.defaults = {
      original: panelGroup.position.clone(),
    };

    panelGroup.position.add(position.clone());

    panelGroup.defaults.position = panelGroup.position.clone();

    return panelGroup;
  }
}

export default Panel;
