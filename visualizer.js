function main() {
  const canvas = document.getElementById("my-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Bar {
    constructor(x, y, width, height, color, index) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.index = index;
    }

    update(micInput) {
      const sound = micInput * 1500;

      if (sound > this.height) {
        this.height = sound;
      } else {
        this.height -= this.height * 0.03;
      }
      // this.x++;
    }

    // Use context as an argument, to prevent manipulation on the global context
    draw(context, vol) {
      context.strokeStyle = this.color;
      context.save();

      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(this.index * 0.05);

      // Play with vol variable inside scale
      context.scale(2, 2);

      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(0, this.height);
      context.stroke();

      context.restore();
    }
  }

  const microphone = new Microphone();

  let bars = [];
  let barWidth = canvas.width / 256;

  function createBars() {
    for (let i = 0; i < 256; i++) {
      const color = `hsl(${i * 2}, 100%, 50%)`;
      const bar = bars.push(
        new Bar(i * barWidth, canvas.height / 2, 1, 200, color, i)
      );
    }
  }

  createBars();

  function animate() {
    if (microphone.initialized) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const samples = microphone.getSamples();
      const volume = microphone.getVolume();

      // generate audio samples from mic
      // update bars
      bars.forEach((bar, i) => {
        bar.update(samples[i]);
        bar.draw(ctx, volume);
      });
    }
    requestAnimationFrame(animate);
  }

  animate();
}
