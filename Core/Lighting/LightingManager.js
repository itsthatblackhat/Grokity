import * as THREE from 'three';

class LightingManager {
    constructor() {
        this.lights = [];
    }

    addLight(light) {
        this.lights.push(light);
        return light;
    }

    createAmbientLight(color, intensity) {
        const light = new THREE.AmbientLight(color, intensity);
        this.addLight(light);
        return light;
    }

    createDirectionalLight(color, intensity) {
        const light = new THREE.DirectionalLight(color, intensity);
        this.addLight(light);
        return light;
    }

    getLights() {
        return this.lights;
    }
}

export default LightingManager;
