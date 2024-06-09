import * as THREE from '/Common/three.js';

export class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        // Add other necessary initializations...
    }

    update() {
        // Update scene logic, e.g., animations, controls, etc.
        this.controls.update();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
