class AudioManager {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.sounds = {};

        document.addEventListener('click', () => {
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume().then(() => {
                    console.log('AudioContext resumed');
                });
            }
        });
    }

    loadSound(name, url) {
        fetch(url)
            .then(response => response.arrayBuffer())
            .then(data => this.audioContext.decodeAudioData(data))
            .then(buffer => {
                this.sounds[name] = buffer;
            });
    }

    playSound(name) {
        const sound = this.sounds[name];
        if (sound) {
            const source = this.audioContext.createBufferSource();
            source.buffer = sound;
            source.connect(this.audioContext.destination);
            source.start(0);
        }
    }
}

export default AudioManager;
