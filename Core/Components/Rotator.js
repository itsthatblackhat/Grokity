// Core/Components/Rotator.js
class Rotator {
    constructor(object, speed) {
        this.object = object;
        this.speed = speed;
    }

    update(deltaTime) {
        this.object.rotation.x += this.speed * deltaTime;
        this.object.rotation.y += this.speed * deltaTime;
    }
}

export default Rotator;
