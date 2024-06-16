import * as THREE from 'three';

class WeatherAnimation {
    constructor(object, duration, startPosition, endPosition) {
        this.object = object;
        this.duration = duration;
        this.startPosition = startPosition.clone();
        this.endPosition = endPosition.clone();
        this.elapsedTime = 0;
    }

    start() {
        this.elapsedTime = 0;
    }

    update(deltaTime) {
        this.elapsedTime += deltaTime;

        const t = Math.min(this.elapsedTime / this.duration, 1);
        this.object.position.lerpVectors(this.startPosition, this.endPosition, t);

        if (t === 1) {
            this.start(); // Loop the animation
        }
    }
}

export default WeatherAnimation;
