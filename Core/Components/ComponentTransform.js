import * as THREE from '../../Common/three.js';

export class ComponentTransform {
    constructor() {
        this.position = new THREE.Vector3();
        this.rotation = new THREE.Euler();
        this.scale = new THREE.Vector3(1, 1, 1);
    }

    update(deltaTime) {
        // Logic to update transformation if necessary
    }
}
