import { Vector2, ShaderMaterial } from 'three';

export default class extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        texture: { value: null },
        resolution: { value: new Vector2() },
        direction: { value: new Vector2() },
      },
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        // gaussian kernel
        // σ = 1, [ 0.06136, 0.24477, 0.38774, 0.24477, 0.06136 ]

        varying vec2 vUv;

        uniform sampler2D texture;
        uniform vec2 resolution;
        uniform vec2 direction;

        void main() {
          gl_FragColor = ((texture2D(texture, vUv + (direction * resolution *  2.0)) * 0.06136) + 
                          (texture2D(texture, vUv + (direction * resolution *  1.0)) * 0.24477) +
                          (texture2D(texture, vUv + (direction * resolution *  0.0)) * 0.38774) + 
                          (texture2D(texture, vUv + (direction * resolution * -1.0)) * 0.24477) + 
                          (texture2D(texture, vUv + (direction * resolution * -2.0)) * 0.06136));
        }
      `,
    });
  }
}
