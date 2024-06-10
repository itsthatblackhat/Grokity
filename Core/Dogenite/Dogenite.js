import * as THREE from 'three';

class Dogenite {
    constructor(scale) {
        this.mesh = this.createQuarterPixelShape(scale);
    }

    createQuarterPixelShape(scale) {
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            -scale / 2, -scale / 2, 0, // Vertex 1
            scale / 2, -scale / 2, 0, // Vertex 2
            0, 0, 0  // Vertex 3
        ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
        return new THREE.Mesh(geometry, material);
    }

    update(deltaTime) {
        // Update logic if needed
    }
}

export default Dogenite;
