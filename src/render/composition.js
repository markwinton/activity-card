import {
  Vector3, Color, PlaneGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera,
  OrthographicCamera, Scene, WebGLRenderTarget,
} from 'three';
import { radians } from './graphics';
import Bloom from './bloom';

const MARGIN_SCALAR = 1.2;

export default class {
  constructor(scene) {
    this.scene = scene;
    this.camera = new PerspectiveCamera(45, 1.0, 0.1, 1000);

    this.bloom = new Bloom();
    this.postprocessing = new WebGLRenderTarget();

    const quad = new Mesh(
      new PlaneGeometry(1, 1),
      new MeshBasicMaterial({ transparent: true, map: this.postprocessing.texture }),
    );

    this.compositeCamera = new OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, -1);

    this.layer1 = new Scene();
    this.layer1.add(quad);

    this.layer2 = new Scene();
  }

  setSize(width, height) {
    this.postprocessing.setSize(width, height);
  }

  setBackgroundColor(color) {
    this.layer1.background = new Color(color);
  }

  addObject(object) {
    this.layer2.add(object);
  }

  fitBoundingBox(box) {
    const center = new Vector3();
    const size = new Vector3();

    box.getCenter(center);
    box.getSize(size);

    const fov = radians(this.camera.fov);

    this.camera.position.x = center.x;
    this.camera.position.y = center.y;
    this.camera.position.z = box.max.z + ((size.y * MARGIN_SCALAR) / 2) / Math.tan(fov / 2);
  }

  render(renderer) {
    renderer.render(this.scene, this.camera, this.postprocessing, true);
    this.bloom.render(renderer, this.postprocessing);
    renderer.render(this.layer1, this.compositeCamera);
    renderer.render(this.layer2, this.compositeCamera);
  }
}
