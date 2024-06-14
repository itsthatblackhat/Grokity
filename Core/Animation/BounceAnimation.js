// Core/Animation/BounceAnimation.js

import Animation from './Animation.js';

class BounceAnimation extends Animation {
    constructor(object, duration, height) {
        super(object, duration);
        this.height = height;
        this.initialPositionY = object.position.y; // Store the initial Y position
    }

    animate(progress) {
        const bounce = Math.sin(progress * Math.PI) * this.height;
        this.object.position.y = this.initialPositionY + bounce; // Apply bounce relative to the initial position
    }
}

export default BounceAnimation;
