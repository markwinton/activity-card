import { AdditiveBlending, ShaderMaterial } from 'three';

export default class extends ShaderMaterial {
  constructor() {
    super({
      blending: AdditiveBlending,
      transparent: true,
      uniforms: {
        textures: { value: null },
      },
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;

        uniform sampler2D textures[5];

        void main() {
          gl_FragColor = (texture2D(textures[0], vUv) +
                          texture2D(textures[1], vUv) +
                          texture2D(textures[2], vUv) +
                          texture2D(textures[3], vUv) +
                          texture2D(textures[4], vUv));
        }
      `,
    });
  }
}
