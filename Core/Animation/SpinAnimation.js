// Core/Animation/SpinAnimation.js

import Animation from './Animation.js';

class SpinAnimation extends Animation {
    constructor(object, duration) {
        super(object, duration);
    }

    animate(progress) {
        this.object.rotation.y = progress * 2 * Math.PI; // Full rotation over the duration
    }
}

export default SpinAnimation;
