import { OrbitControls } from '/Core/Input/OrbitControls.js';
import * as THREE from 'three';

class Controls {
    constructor(camera, renderer, kbm) {
        this.camera = camera;
        this.renderer = renderer;
        this.movementSpeed = 0.5; // Increased movement speed
        this.rotationSpeed = 0.01;
        this.controls = null;
        this.kbm = kbm; // Use the InputKBM instance passed from InputManager
    }

    init() {
        console.log('Renderer in Controls init:', this.renderer);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.screenSpacePanning = false;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.kbm.init(); // Initialize KBM
    }

    update(deltaTime) {
        this.handleKeyboardInput(deltaTime);
        if (this.controls) {
            this.controls.update();
        }
    }

    handleKeyboardInput(deltaTime) {
        const forward = new THREE.Vector3();
        const right = new THREE.Vector3();
        const up = new THREE.Vector3(0, 1, 0); // Assuming Y-up coordinate system

        this.camera.getWorldDirection(forward);
        right.crossVectors(up, forward).normalize();

        if (this.kbm.isKeyDown('KeyW')) {
            this.camera.position.add(forward.multiplyScalar(this.movementSpeed * deltaTime));
        }
        if (this.kbm.isKeyDown('KeyS')) {
            this.camera.position.add(forward.multiplyScalar(-this.movementSpeed * deltaTime));
        }
        if (this.kbm.isKeyDown('KeyA')) {
            this.camera.position.add(right.multiplyScalar(this.movementSpeed * deltaTime)); // Reversed direction
        }
        if (this.kbm.isKeyDown('KeyD')) {
            this.camera.position.add(right.multiplyScalar(-this.movementSpeed * deltaTime)); // Reversed direction
        }
        if (this.kbm.isKeyDown('Space')) {
            this.camera.position.y += this.movementSpeed * deltaTime;
        }
        if (this.kbm.isKeyDown('KeyC')) {
            this.camera.position.y -= this.movementSpeed * deltaTime;
        }
    }
}

export default Controls;
