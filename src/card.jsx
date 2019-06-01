import {
  Mesh, PlaneGeometry, MeshBasicMaterial, Scene, TextureLoader, WebGLRenderer,
} from 'three';
import React from 'react';
import Composition from './render/composition';
import Sunflower from './render/sunflower';
import Touch from './touch';
import './css/card.css';

const BACKGROUND_COLOR = 0x000209;

const LOGO = {
  width: 0.4,
  height: 0.1,
  verticalPadding: 0.013,
};

const textureLoader = new TextureLoader();

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.container = React.createRef();

    this.animate = this.animate.bind(this);

    this.scene = new Scene();

    this.composition = new Composition(this.scene);
    this.composition.setBackgroundColor(BACKGROUND_COLOR);
  }

  componentDidMount() {
    this.webGLRenderer = new WebGLRenderer();
    this.webGLRenderer.autoClear = false;
    this.webGLRenderer.setClearColor(0x000000, 0);
    this.webGLRenderer.setPixelRatio(window.devicePixelRatio);
    this.container.current.appendChild(this.webGLRenderer.domElement);

    const { branded } = this.props;
    if (branded) {
      this.logo = new Mesh(
        new PlaneGeometry(LOGO.width, LOGO.height),
        new MeshBasicMaterial({ transparent: true, map: textureLoader.load(`${env.ASSETS_URL}/powered-by-strava.png`) }),
      );
      this.logo.position.x = 0.5 - LOGO.width / 2;
      this.logo.position.y = -0.5 + LOGO.height / 2 - LOGO.verticalPadding;
      this.composition.addObject(this.logo);
    }

    this.touch = new Touch(this.container.current, (delta) => {
      this.scene.rotation.y += delta.x * 0.002;
    });

    const { activities } = this.props;

    this.visualization = new Sunflower(activities, this.scene);
    this.composition.fitBoundingBox(this.visualization.boundingBox);

    let timer = null;
    this.resizeListener = window.addEventListener('resize', () => {
      clearInterval(timer);
      timer = setTimeout(this.layout.bind(this), 200);
    });

    this.layout();
    this.animate();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  layout() {
    const height = this.container.current.offsetHeight;

    this.webGLRenderer.setSize(height, height);

    const bufferSize = this.webGLRenderer.getDrawingBufferSize();
    this.composition.setSize(bufferSize.width, bufferSize.height);
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.composition.render(this.webGLRenderer);
  }

  exportImage(width, height, callback) {
    const webGLRenderer = new WebGLRenderer();
    webGLRenderer.autoClear = false;
    webGLRenderer.setClearColor(0x000000, 0);
    webGLRenderer.setSize(width, height);

    const composition = new Composition(this.scene);
    composition.setSize(width, height);
    composition.fitBoundingBox(this.visualization.boundingBox);
    composition.setBackgroundColor(BACKGROUND_COLOR);

    const { branded } = this.props;
    if (branded) {
      composition.addObject(this.logo.clone());
    }

    composition.render(webGLRenderer);

    webGLRenderer.domElement.toBlob(callback);
  }

  render() {
    return <div className="card" ref={this.container} />;
  }
}
