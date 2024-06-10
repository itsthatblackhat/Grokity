import * as THREE from 'three';

class DogeniteManager {
    constructor(scene) {
        this.scene = scene;
    }

    createDogenite(shape) {
        if (!this.scene) {
            console.error('Scene is not defined');
            return;
        }

        const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
        const geometry = new THREE.ShapeGeometry(shape);
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
    }
}

export default DogeniteManager;
