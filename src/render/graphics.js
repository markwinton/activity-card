export const goldenAngle = 2.39996323;

export const radians = degrees => degrees * Math.PI / 180;

export const vogelSpiral = (n, angle) => {
  const r = Math.sqrt(n);
  const theta = n * angle;
  return {
    x: r * Math.cos(theta),
    y: r * Math.sin(theta),
  };
};

export const easeOut = t => ((t - 1) ** 3) + 1;
