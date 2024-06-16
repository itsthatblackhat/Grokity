import * as THREE from 'three';

class G2ECoord {
    constructor(camera, renderer, mapWidth, mapHeight) {
        this.camera = camera;
        this.renderer = renderer;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
    }

    // Convert latitude and longitude to world coordinates
    latLonToWorld(lat, lon) {
        const x = (lon + 180) * (this.mapWidth / 360);
        const latRad = lat * (Math.PI / 180);
        const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
        const y = (this.mapHeight / 2) - (this.mapWidth * mercN / (2 * Math.PI));
        return new THREE.Vector3(x, 0, y);
    }

    // Convert world coordinates to screen coordinates
    worldToScreen(worldPosition) {
        const screenPosition = worldPosition.clone();
        screenPosition.project(this.camera);
        return new THREE.Vector2(
            (screenPosition.x + 1) / 2 * this.renderer.domElement.width,
            (-screenPosition.y + 1) / 2 * this.renderer.domElement.height
        );
    }
}

export default G2ECoord;
