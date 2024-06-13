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

        if (!(shape instanceof THREE.Shape)) {
            console.error('Invalid shape provided to createDogenite');
            return;
        }

        const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
        const geometry = new THREE.ShapeGeometry(shape);
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
    }
}

export default DogeniteManager;
