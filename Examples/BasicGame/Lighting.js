// Examples/BasicGame/Lighting.js
import * as THREE from 'three';

export default function Lighting(scene) {
    // Add lighting setup code here
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);  // soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    console.log('Lighting initialized');
}
