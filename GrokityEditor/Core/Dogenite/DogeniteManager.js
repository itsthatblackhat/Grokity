import * as THREE from 'three';
import { Dogenite } from './Dogenite.js';

class DogeniteManager {
    constructor(scene) {
        this.scene = scene;
        this.dogenites = [];
        this.createHatTiles();
    }

    add(dogenite) {
        this.dogenites.push(dogenite);
        this.scene.add(dogenite.mesh);
    }

    update() {
        // Update logic for dogenites if needed
        this.dogenites.forEach(dogenite => dogenite.update());
    }

    createHatTiles() {
        const hatTileMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        const hatTile = new Dogenite(new THREE.Vector3(0, 0, 0), 1, { color: 0x0000ff });
        this.add(hatTile);
    }
}

export { DogeniteManager };
