const vertexShader = `
  precision mediump float;
  attribute vec2 aVertexPosition;
  attribute vec2 aTextureCoord;
  uniform mat3 projectionMatrix;
  varying vec2 vTextureCoord;
  void main(void)
  {
      gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
      vTextureCoord = aTextureCoord;
  }`;

const fragmentShader = `
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec3 chromaColor;
uniform float tolerance;

void main(void)
{
    vec4 color = texture2D(uSampler, vTextureCoord);
    float distance = length(chromaColor - color.rgb);
    
    if (distance < tolerance) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); // Transparent pixel
    } else {
        gl_FragColor = color; // Non-transparent pixel
    }
}`;
const ChromaKeyFilter = new PIXI.Filter(vertexShader, fragmentShader);

const ChromaKeyConfig = {
    "colors": [
        new Float32Array([0.0, 0.0, 0.611764706]), // Freeport
        new Float32Array([0.0, 0.0, 0.407843137]), // Canary
        new Float32Array([0.0, 0.0, 0.294117647]), // Raven
    ],
    "Freeport I": 0,
    "Hummingbird": 0,
    "Freeport II": 0,
    "Finch": 0,
    "Freeport III": 0,
    "Sparrow": 0,
    "Canary": 1,
    "Vulture": 2,
    "The Pits": 2,
    "Raven": 2
}

ChromaKeyFilter.uniforms.chromaColor = ChromaKeyConfig.colors[0];
ChromaKeyFilter.uniforms.tolerance = 0.1;
dsj.graphics.drednot.filters = [ChromaKeyFilter];