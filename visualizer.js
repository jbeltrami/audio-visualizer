function main() {
  const canvas = document.getElementById("my-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Bar {
    constructor(x, y, width, height, color) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
    }

    update(micInput) {
      // this.height = micInput;
      this.x++;
    }

    // Use context as an argument, to prevent manipulation on the global context
    draw(context) {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  const bar1 = new Bar(10, 10, 100, 200, "blue");

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bar1.draw(ctx);
    // generate audio samples from mic
    // update bars

    requestAnimationFrame(animate);
  }

  animate();
}
