import * as THREE from '/Common/three.js';

class RenderEngine {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

export default RenderEngine;
