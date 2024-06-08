import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class CameraManager {
    constructor(camera) {
        this.camera = camera;
        this.controls = new OrbitControls(this.camera, document.body);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.screenSpacePanning = false;
        this.controls.maxPolarAngle = Math.PI / 2;
    }

    update() {
        this.controls.update();
    }
}

export default CameraManager;
