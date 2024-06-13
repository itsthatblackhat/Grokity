import * as THREE from 'three';

class Controls {
    constructor(camera, renderer, inputKBM) {
        this.camera = camera;
        this.renderer = renderer;
        this.inputKBM = inputKBM;
        this.moveSpeed = 10;
        this.rotationSpeed = 0.02;
    }

    init() {
        // Initialize if needed
    }

    update(deltaTime) {
        const moveDistance = this.moveSpeed * deltaTime;
        const rotateAngle = this.rotationSpeed * deltaTime;

        if (this.inputKBM.isKeyDown('KeyW')) {
            this.camera.translateZ(-moveDistance); // Move forward
        }
        if (this.inputKBM.isKeyDown('KeyS')) {
            this.camera.translateZ(moveDistance); // Move backward
        }
        if (this.inputKBM.isKeyDown('KeyA')) {
            this.camera.translateX(-moveDistance); // Move left
        }
        if (this.inputKBM.isKeyDown('KeyD')) {
            this.camera.translateX(moveDistance); // Move right
        }
        if (this.inputKBM.isKeyDown('Space')) {
            this.camera.translateY(moveDistance); // Move up
        }
        if (this.inputKBM.isKeyDown('KeyC')) {
            this.camera.translateY(-moveDistance); // Move down
        }
    }
}

export default Controls;
