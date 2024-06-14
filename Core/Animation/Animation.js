// Core/Animation/Animation.js

class Animation {
    constructor(object, duration) {
        this.object = object;
        this.duration = duration;
        this.elapsed = 0;
        this.isPlaying = false;
    }

    start() {
        this.isPlaying = true;
        this.elapsed = 0;
    }

    stop() {
        this.isPlaying = false;
    }

    update(deltaTime) {
        if (!this.isPlaying) return;
        this.elapsed += deltaTime;
        if (this.elapsed >= this.duration) {
            this.elapsed = this.duration;
            this.stop();
        }
        this.animate(this.elapsed / this.duration);
    }

    animate(progress) {
        // Override this method in subclasses to define the animation behavior
    }
}

export default Animation;
