export default class {
  constructor(element, notify) {
    this.anchor = null;

    element.addEventListener('mousedown', (event) => {
      if (event.buttons === 1) {
        this.anchor = {
          x: event.clientX,
          y: event.clientY,
        };
      }
    });

    document.addEventListener('mousemove', (event) => {
      if (event.buttons === 1 && this.anchor) {
        const position = {
          x: event.clientX,
          y: event.clientY,
        };
        notify({
          x: position.x - this.anchor.x,
          y: position.y - this.anchor.y,
        });
        this.anchor = position;
      }
    });

    document.addEventListener('mouseup', () => {
      this.anchor = null;
    });

    element.addEventListener('touchstart', (event) => {
      this.anchor = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    });

    element.addEventListener('touchmove', (event) => {
      const position = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
      notify({
        x: position.x - this.anchor.x,
        y: position.y - this.anchor.y,
      });
      this.anchor = position;
    });

    element.addEventListener('touchend', () => {
      this.anchor = null;
    });

    element.addEventListener('touchcancel', () => {
      this.anchor = null;
    });
  }
}
