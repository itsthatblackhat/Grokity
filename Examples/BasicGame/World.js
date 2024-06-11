import * as THREE from 'three';
import AssetManager from '/GrokityAssetMan/AssetManager.js';
import { createDogenitesFromImage } from '/Core/Dogenite/DogeniteAlgo.js';

class World {
    constructor(scene) {
        this.scene = scene;
        this.dogenites = null;
    }

    async init() {
        try {
            await AssetManager.preloadAssets(['assets/Dogecoin.png']);
            const dogecoinTexture = AssetManager.getTexture('assets/Dogecoin.png');

            this.dogenites = createDogenitesFromImage(dogecoinTexture);

            this.dogenites.forEach(dogenite => this.scene.add(dogenite.mesh));
        } catch (error) {
            console.error('Error loading texture:', error);
        }
    }

    update(deltaTime) {
        // Update logic if necessary
    }
}

export default World;
