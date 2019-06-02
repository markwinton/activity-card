import {
  Box3, SphereGeometry, MeshBasicMaterial, Mesh, AmbientLight,
} from 'three';
import clamp from './clamp';
import { mean, standardDeviation } from './statistics';
import { goldenAngle, vogelSpiral, easeOut } from './graphics';

const RADIUS = {
  min: 0.6,
  max: 0.7,
};

const OPACITY = {
  min: 0.2,
  max: 0.6,
};

const COLORS = [
  0x5CECB6,
  0xF58346,
  0xEA4065,
];

const ANIMATION = {
  duration: 0.9,
  delay: i => i * 0.04,
};

export default class {
  constructor(activities, scene, animated) {
    this.scene = scene;

    this.light = new AmbientLight(0xffffff);
    this.scene.add(this.light);

    this.spheres = [];

    const distances = activities.map(activity => activity.distance);
    const distanceMu = mean(distances);
    const distanceSigma = Math.max(standardDeviation(distances), 0.0001);

    const speeds = activities.map(activity => activity.speed);
    const speedMu = mean(speeds);
    const speedSigma = Math.max(standardDeviation(speeds), 0.0001);

    activities.forEach((activity, i) => {
      const distance = clamp(activity.distance - distanceMu, -distanceSigma, distanceSigma);
      const speed = clamp(activity.speed - speedMu, -speedSigma, speedSigma);

      const size = (distance + distanceSigma) / (distanceSigma * 2);
      const intensity = (speed + speedSigma) / (speedSigma * 2);

      const radius = RADIUS.min + size * (RADIUS.max - RADIUS.min);
      const opacity = OPACITY.min + intensity * (OPACITY.max - OPACITY.min);

      const position = vogelSpiral(i, goldenAngle);

      const color = COLORS[activity.type];

      const sphere = new Mesh(
        new SphereGeometry(radius, 64),
        new MeshBasicMaterial({ transparent: true, opacity: 0, color }),
      );
      sphere.position.set(position.x, position.y, 0);
      sphere.userData = { opacity };

      this.spheres.push(sphere);
      this.scene.add(sphere);
    });

    this.boundingBox = new Box3().setFromObject(this.scene);

    if (animated === true) {
      this.spheres.forEach(sphere => sphere.scale.set(0.1, 0.1, 0.1));

      this.start = new Date();
      this.animation = setInterval(() => {
        const now = new Date();
        const delta = (now - this.start) / 1000;

        this.spheres.forEach((sphere, i) => {
          const { material, userData: { opacity } } = sphere;

          const t = clamp((delta - ANIMATION.delay(i)) / ANIMATION.duration, 0, 1);
          const p = easeOut(t);

          material.opacity = opacity * p;

          sphere.scale.set(
            0.1 + p * 0.9,
            0.1 + p * 0.9,
            0.1 + p * 0.9,
          );
        });
      }, 1000 / 64);
    } else {
      this.spheres.forEach((sphere) => {
        const { material, userData: { opacity } } = sphere;
        material.opacity = opacity;
      });
    }
  }

  teardown() {
    this.scene.remove(this.light);
    this.spheres.forEach((sphere) => {
      this.scene.remove(sphere);
    });
    clearInterval(this.animation);
  }
}
