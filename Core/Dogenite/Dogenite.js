import * as THREE from '/Common/three.js';

export default class Dogenite {
    constructor() {
        const shape = new THREE.Shape();
        // Define the Einstein hat shape or any other desired shape here
        shape.moveTo(0, 0);
        shape.lineTo(1, 0);
        shape.lineTo(0.5, Math.sqrt(3)/2);
        shape.lineTo(0, 0);

        const extrudeSettings = {
            depth: 0.2,
            bevelEnabled: false,
        };

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
        this.mesh = new THREE.Mesh(geometry, material);
    }

    getMesh() {
        return this.mesh;
    }
}
