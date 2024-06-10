// Core/Rendering/RenderingEngine.js
import * as THREE from 'three';

class RenderingEngine {
    constructor() {
        this.renderer = new THREE.WebGLRenderer();
        document.body.appendChild(this.renderer.domElement);
    }

    resize(width, height) {
        this.renderer.setSize(width, height);
    }

    render(scene, camera) {
        this.renderer.render(scene, camera);
    }
}

export default RenderingEngine;
