import * as THREE from '/Common/three.js';
import DogeniteManager from '/Core/Dogenite/DogeniteManager.js';

class GraphicsEngine {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.init();
    }

    init() {
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff);
        this.camera.add(pointLight);
        this.scene.add(this.camera);

        const gridHelper = new THREE.GridHelper(100, 100);
        this.scene.add(gridHelper);

        new DogeniteManager(this.scene);
    }
}

export default GraphicsEngine;
