import * as THREE from 'three';
import Grid from './Grid.js';

class World {
    constructor(scene) {
        this.scene = scene;
        this.cube = null;
        this.grid = new Grid(10, 10);  // Adjust size and divisions as needed
    }

    init() {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        const gridHelper = this.grid.init();
        this.scene.add(gridHelper);

        // Initialize other world objects here
    }

    update() {
        if (this.cube) {
            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.01;
        }

        // Update other world objects here
    }
}

export default World;
