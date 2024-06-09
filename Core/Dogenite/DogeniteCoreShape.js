import * as THREE from '/Common/three.js';

export function createEinsteinHatShape() {
    // Define your geometry and material here
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    return new THREE.Mesh(geometry, material);
}
