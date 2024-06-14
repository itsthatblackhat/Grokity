// Core/Animation/AnimationManager.js

class AnimationManager {
    constructor() {
        this.animations = [];
    }

    add(animation) {
        this.animations.push(animation);
    }

    remove(animation) {
        const index = this.animations.indexOf(animation);
        if (index > -1) {
            this.animations.splice(index, 1);
        }
    }

    update(deltaTime) {
        this.animations.forEach(animation => animation.update(deltaTime));
    }
}

export default AnimationManager;
