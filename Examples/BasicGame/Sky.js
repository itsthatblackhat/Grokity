// Examples/BasicGame/Sky.js
import * as THREE from 'three';

export default function Sky(scene) {
    // Add sky setup code here
    const skyColor = 0xB1E1FF;  // light blue
    scene.background = new THREE.Color(skyColor);
    console.log('Sky initialized');
}
