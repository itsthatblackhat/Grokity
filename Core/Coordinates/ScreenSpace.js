import * as THREE from '/Common/three.js';

class ScreenSpace {
    constructor(camera, renderer) {
        this.camera = camera;
        this.renderer = renderer;
    }

    toScreenCoordinates(worldPosition) {
        const screenPosition = worldPosition.clone();
        screenPosition.project(this.camera);
        return new THREE.Vector2(
            (screenPosition.x + 1) / 2 * this.renderer.domElement.width,
            (-screenPosition.y + 1) / 2 * this.renderer.domElement.height
        );
    }
}

export { ScreenSpace };
