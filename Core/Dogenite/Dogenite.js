import * as THREE from 'three';

class Dogenite {
    constructor(v1, v2, v3) {
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            v1.x, v1.y, v1.z,
            v2.x, v2.y, v2.z,
            v3.x, v3.y, v3.z
        ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
        this.mesh = new THREE.Mesh(geometry, material);
    }

    update(deltaTime) {
        // Update logic if needed
    }
}

export default Dogenite;
