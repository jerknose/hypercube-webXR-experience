import loadFont from 'load-bmfont';
import Panel from './Panel';

class PanelGroup {
  constructor() {
    this.panelsGroup = new THREE.Object3D();
    this.panelsGroup.visible = false;

    this.panel = null;
    this.panels = [];

    this.isOpen = false;
    this.tweenCount = 0;

    this.chartColors = {
      doc: 0x0061D5,
      excel: 0x5FC9CF,
      image: 0xFC627A,
      media: 0x002947,
      ppt: 0x151F26,
      pdf: 0x72848E,
      text: 0x8EA6B2,
      zip: 0xC3D1D9,
      others: 0xDDE6ED,
    }

    this.sidePanelWidth = 22;

    this.layerSeparation = 0.025;

    this.styles = {
      h1: {
        size: 3, // cap height in cm
        color: 0xFFFFFF,
        weight: 'bold', // bold or regular
      },
      h2: {
        size: 2.5, // cap height in cm
        color: 0xFFFFFF,
        weight: 'regular', // bold or regular
      },
      h3: {
        size: 2, // cap height in cm
        color: 0xFFFFFF,
        weight: 'bold', // bold or regular
      },
      p: {
        size: 1.5, // cap height in cm
        color: 0xFFFFFF,
        weight: 'regular', // bold or regular
      },
    };

    this.isAnimating = false;

    this.panel = new Panel();
  }

  drawPanels(content, panel, fonts) {
    this.destroyPanels();
    if (this.panel !== null && fonts !== undefined && _.filter(fonts, { name: 'regular' })[0] !== undefined) {
      this.panels = [
        this.panel.drawPanel(
          content,
          panel
        ),
      ];

      _.each(this.panels, (panel) => {
        this.panelsGroup.add(panel);
      });

      this.panelsGroup.visible = true;
      this.isAnimating = false;
      this.isOpen = false;
    }
  }

  clearMesh(object) {
    if (object && object.type === "Mesh") {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        if (object.material.map) object.material.map.dispose();
        object.material.dispose();
      }
    } else if (object && object.type === "Group") {
      let children = object.children;
      children.map(elem => {
        this.clearMesh(clearMesh)
        object.remove(map);
      });
    }
  }

  destroyPanels() {
    this.panelsGroup.visible = false;

    _.each(this.panels, (panel) => {
      this.clearMesh(panel);
      this.panelsGroup.remove(panel);
    });

    this.panels.length = 0;
  }

  getPanelsGroup() {
    return this.panelsGroup;
  }

  show() {
    this.panelsGroup.visible = true;
    // this.fadeByPanel('in', 1000, 250);
    // this.moveByPanel('in', 500, 250);
  }

  hide() {
    this.panelsGroup.visible = false;
    // this.fadeByPanel('out', 250, 125);
    // this.moveByPanel('out', 500, 100);
  }

  togglePanelOpen() {
    this.toggleFadeByPanel();
    this.toggleMoveByPanel();
    this.isOpen = !this.isOpen;
  }

  toggleFadeByPanel() {
    if (this.isOpen) {
      this.fadeByPanel('out', 500, 250);
    } else {
      this.fadeByPanel('in', 1000, 250);
    }
  }

  toggleMoveByPanel() {
    if (this.isOpen) {
      this.moveByPanel('out', 500, 100);
    } else {
      this.moveByPanel('in', 500, 250);
    }
  }

  fadeByPanel(dir, time, delay) {
    _.each(this.panelsGroup.children, (panel, idx) => {
      this.fade(panel, dir, time, delay * idx);
    });
  }

  moveByPanel(dir, time, delay) {
    _.each(this.panelsGroup.children, (panel, idx) => {
      this.move(panel, dir, time, delay * idx);
    });
  }

  fade(object, dir, time, delay) {
    if (!this.isAnimating) {
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          let target = 0;
          if (dir === 'in') {
            if (child.defaults) {
              target = child.defaults.opacity;
            } else {
              target = 1;
            }
          }
          if (child.material.uniforms) {
            new TWEEN.Tween({ alpha: child.material.uniforms.opacity.value })
              .to({ alpha: target }, time)
              .easing(TWEEN.Easing.Cubic.Out)
              .onUpdate(function () {
                this.isAnimating = true;
                child.material.uniforms.opacity.value = this.alpha;
                child.material.needsUpdate = true;
              })
              .onComplete(() => {
                this.tweenCount--;
                if (this.tweenCount == 0) {
                  this.isAnimating = false;
                  if (this.isOpen == true) {
                    this.destroyPanels();
                    this.isOpen = false;
                  } else {
                    this.isOpen = true;
                  }
                }
              })
              .delay(delay)
              .start();
          } else {
            new TWEEN.Tween({ alpha: child.material.opacity })
              .to({ alpha: target }, time)
              .easing(TWEEN.Easing.Cubic.Out)
              .onUpdate(function () {
                child.material.opacity = this.alpha;
                child.material.needsUpdate = true;
              })
              .onComplete(() => {
                this.tweenCount--;
                if (this.tweenCount == 0) {
                  this.isAnimating = false;
                  if (this.isOpen == true) {
                    this.destroyPanels();
                    this.isOpen = false;
                  } else {
                    this.isOpen = true;
                  }
                }
              })
              .delay(delay)
              .start();
          }
        }
      });
    }
  }

  move(object, dir, time, delay) {
    if (!this.isAnimating) {
      object.traverse((child) => {
        if (child.defaults && child.defaults.position) {
          let target = child.defaults.original.clone();
          if (dir === 'in') {
            target = child.defaults.position.clone();
          }
          this.tweenCount++;
          new TWEEN.Tween(child.position)
            .to(target, time)
            .easing(TWEEN.Easing.Cubic.Out)
            .onComplete(() => {
              this.tweenCount--;
              if (this.tweenCount == 0) {
                this.isAnimating = false;
                if (this.isOpen == true) {
                  this.destroyPanels();
                  this.isOpen = false;
                } else {
                  this.isOpen = true;
                }
              }
            })
            .delay(delay)
            .start();
        }
      });
    }
  }
}

export default PanelGroup;
