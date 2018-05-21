precision highp float;

varying vec3 vNormal;
varying float vAlpha;

void main () {
  gl_FragColor = vec4(vNormal, 1.0);
  gl_FragColor.w = vAlpha;
  if ( gl_FragColor.a < 0.01 ) discard;
}