import * as THREE from 'three';

class SnowEffect {
    constructor(scene) {
        this.scene = scene;
        this.initSnow();
    }

    initSnow() {
        const snowGeometry = new THREE.BufferGeometry();
        const snowCount = 10000;
        const snowVertices = [];

        for (let i = 0; i < snowCount; i++) {
            const x = Math.random() * 400 - 200;
            const y = Math.random() * 500 - 250;
            const z = Math.random() * 400 - 200;
            snowVertices.push(x, y, z);
        }

        snowGeometry.setAttribute('position', new THREE.Float32BufferAttribute(snowVertices, 3));

        const snowMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, transparent: true });
        this.snow = new THREE.Points(snowGeometry, snowMaterial);
        this.scene.add(this.snow);
    }

    update() {
        this.snow.rotation.y += 0.002;
    }
}

export default SnowEffect;
