class Microphone {
  constructor() {
    this.initialized = false;
    // mediaDevices: Read only property that returns an object that provides access to media input devices.
    // getUserMedia(): Returns a Promise that resolves to a MediaStream object representing the requested media.
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        // Create audio context to convert audio stream to audio data
        this.audioContext = new AudioContext();
        // Create a MediaStreamAudioSourceNode to represent the audio source
        this.microphone = this.audioContext.createMediaStreamSource(stream);
        // Create an AnalyserNode to analyze the audio data
        this.analyser = this.audioContext.createAnalyser();
        // Set the size of the FFT (Fast Fourier Transform) used to analyze the audio data
        this.analyser.fftSize = 512;
        // Create a Uint8Array to store the audio data
        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        // Connect the microphone input to the analyser
        this.microphone.connect(this.analyser);

        this.initialized = true;
      })
      .catch((err) => {
        alert(err);
      });
  }

  getSamples() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    // Normalize the samples by dividing by 128 and subtracting 1 to make the samples range from -1 to 1
    let normSamples = [...this.dataArray].map((e) => e / 128 - 1);

    return normSamples;
  }
  getVolume() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    // Normalize the samples by dividing by 128 and subtracting 1 to make the samples range from -1 to 1
    let normSamples = [...this.dataArray].map((e) => e / 128 - 1);
    let sum = 0;

    for (let i = 0; i < normSamples.length; i++) {
      sum += normSamples[i] * normSamples[i];
    }

    let volume = Math.sqrt(sum / normSamples.length);

    return volume;
  }
}
