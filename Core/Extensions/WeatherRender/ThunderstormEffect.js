import * as THREE from 'three';

class ThunderstormEffect extends THREE.Group {
    constructor(scene, position) {
        super();
        this.scene = scene;
        this.position.set(position.x, position.y, position.z);
        this.clouds = [];
        this.lightning = [];
        this.initThunderstorm(position);
    }

    initThunderstorm(position) {
        // Create clouds
        this.createClouds(position);

        // Create lightning
        this.createLightning(position);
    }

    createClouds(position) {
        const cloudGeometry = new THREE.SphereGeometry(10, 32, 32);
        const cloudMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.8 });

        for (let i = 0; i < 10; i++) {
            const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
            cloud.position.set(
                position.x + Math.random() * 100 - 50,
                position.y + Math.random() * 20 - 10,
                position.z + Math.random() * 100 - 50
            );
            this.add(cloud);
            this.clouds.push(cloud);
        }
    }

    createLightning(position) {
        for (let i = 0; i < 5; i++) {
            const lightningGeometry = new THREE.CylinderGeometry(0.5, 0.5, 50, 32);
            const lightningMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

            const lightning = new THREE.Mesh(lightningGeometry, lightningMaterial);
            lightning.position.set(
                position.x + Math.random() * 100 - 50,
                position.y + Math.random() * 50 - 25,
                position.z + Math.random() * 100 - 50
            );
            lightning.rotation.x = Math.PI / 2;
            lightning.visible = false;

            this.add(lightning);
            this.lightning.push(lightning);
        }
    }

    update() {
        // Simple update logic to randomly flash lightning
        this.lightning.forEach(lightning => {
            if (Math.random() > 0.95) {
                lightning.visible = !lightning.visible;
            }
        });

        // Optional: Update clouds positions or appearance
        this.clouds.forEach(cloud => {
            cloud.position.x += Math.random() * 0.1 - 0.05;
            cloud.position.z += Math.random() * 0.1 - 0.05;
        });
    }
}

export default ThunderstormEffect;
