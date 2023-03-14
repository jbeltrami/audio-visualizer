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
      this.height = micInput * 1000;
      // this.x++;
    }

    // Use context as an argument, to prevent manipulation on the global context
    draw(context) {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  const microphone = new Microphone();

  let bars = [];
  let barWidth = canvas.width / 256;

  function createBars() {
    for (let i = 0; i < 256; i++) {
      const color = `hsl(${i * 2}, 100%, 50%)`;
      const bar = bars.push(
        new Bar(i * barWidth, canvas.height / 2, 1, 20, color)
      );
    }
  }

  createBars();

  function animate() {
    if (microphone.initialized) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const samples = microphone.getSamples();

      // generate audio samples from mic
      // update bars
      bars.forEach((bar, i) => {
        bar.update(samples[i]);
        bar.draw(ctx);
      });
    }
    requestAnimationFrame(animate);
  }

  animate();
}
