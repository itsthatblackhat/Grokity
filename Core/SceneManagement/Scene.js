import * as THREE from 'three';

class Scene {
    constructor() {
        this.scene = new THREE.Scene();
    }

    add(entity) {
        this.scene.add(entity);
    }

    remove(entity) {
        this.scene.remove(entity);
    }

    update(deltaTime) {
        // Update logic for scene if needed
    }
}

export default Scene;
