// Examples/BasicGame/World.js
import * as THREE from 'three';
import { createDogenitesFromImage } from '/Core/Dogenite/DogeniteAlgo.js';
import AssetManager from '/GrokityAssetMan/AssetManager.js';

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
            this.dogenites.position.set(0, 0, -50); // Position in front of the camera

            this.scene.add(this.dogenites);
        } catch (error) {
            console.error('Error loading texture:', error);
        }
    }

    update(deltaTime) {
        // Update logic if necessary
    }
}

export default World;
