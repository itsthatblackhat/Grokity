import * as THREE from 'three';

class CoordinateSystem {
    constructor(camera, renderer) {
        this.worldSpace = this.createAxesHelper(10);
        this.localSpace = this.createAxesHelper(5);
        this.screenSpace = this.createAxesHelper(2);
        this.uvSpace = this.createAxesHelper(1);

        const scene = new THREE.Scene();
        scene.add(this.worldSpace);
        scene.add(this.localSpace);
        scene.add(this.screenSpace);
        scene.add(this.uvSpace);

        renderer.render(scene, camera);
    }

    createAxesHelper(size) {
        const axesHelper = new THREE.AxesHelper(size);
        return axesHelper;
    }
}

export { CoordinateSystem };
