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
            console.log('Preloading assets...');
            await AssetManager.preloadAssets(['assets/Dogecoin.png']);
            const dogecoinTexture = AssetManager.getTexture('assets/Dogecoin.png');

            if (!dogecoinTexture) {
                throw new Error('Texture not loaded');
            }

            console.log('Creating Dogenites...');
            this.dogenites = createDogenitesFromImage(dogecoinTexture);
            this.dogenites.position.set(0, 0, -50); // Position in front of the camera

            console.log('Adding Dogenites to the scene...');
            this.scene.add(this.dogenites);
        } catch (error) {
            console.error('Error initializing World:', error);
        }
    }

    update(deltaTime) {
        // Update logic if necessary
    }
}

export default World;
