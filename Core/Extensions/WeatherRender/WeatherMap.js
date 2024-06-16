import * as THREE from 'three';

class WeatherMap {
    constructor(scene) {
        this.scene = scene;
        this.mapTexture = null;
        this.weatherTexture = null;
        this.mapMesh = null;
        this.weatherMesh = null;
    }

    async init() {
        const loader = new THREE.TextureLoader();
        this.mapTexture = await loader.loadAsync('assets/USAVector.png'); // Update path to match the 'dist' structure
        this.mapTexture.wrapS = THREE.ClampToEdgeWrapping;
        this.mapTexture.wrapT = THREE.ClampToEdgeWrapping;

        const geometry = new THREE.PlaneGeometry(1000, 600); // Adjust the size as needed
        const material = new THREE.MeshBasicMaterial({ map: this.mapTexture });
        this.mapMesh = new THREE.Mesh(geometry, material);

        this.mapMesh.rotation.x = -Math.PI / 2; // Rotate to lay flat
        this.scene.add(this.mapMesh);
    }

    async updateWeatherOverlay(radarImageUrl) {
        if (this.weatherMesh) {
            this.scene.remove(this.weatherMesh);
        }

        const loader = new THREE.TextureLoader();
        this.weatherTexture = await loader.loadAsync(radarImageUrl);
        this.weatherTexture.wrapS = THREE.ClampToEdgeWrapping;
        this.weatherTexture.wrapT = THREE.ClampToEdgeWrapping;

        const geometry = new THREE.PlaneGeometry(1000, 600); // Adjust the size to match the map
        const material = new THREE.MeshBasicMaterial({ map: this.weatherTexture, transparent: true });
        this.weatherMesh = new THREE.Mesh(geometry, material);

        this.weatherMesh.rotation.x = -Math.PI / 2; // Rotate to lay flat
        this.scene.add(this.weatherMesh);
    }
}

export default WeatherMap;
