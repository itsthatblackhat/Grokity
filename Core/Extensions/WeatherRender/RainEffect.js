import * as THREE from 'three';

class RainEffect {
    constructor(scene) {
        this.scene = scene;
        this.initRain();
    }

    initRain() {
        const rainGeometry = new THREE.BufferGeometry();
        const rainCount = 10000;
        const rainVertices = [];

        for (let i = 0; i < rainCount; i++) {
            const x = Math.random() * 400 - 200;
            const y = Math.random() * 500 - 250;
            const z = Math.random() * 400 - 200;
            rainVertices.push(x, y, z);
        }

        rainGeometry.setAttribute('position', new THREE.Float32BufferAttribute(rainVertices, 3));

        const rainMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.1, transparent: true });
        this.rain = new THREE.Points(rainGeometry, rainMaterial);
        this.scene.add(this.rain);
    }

    update() {
        this.rain.rotation.y += 0.002;
    }
}

export default RainEffect;
