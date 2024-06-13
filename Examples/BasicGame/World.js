import * as THREE from 'three';
import { createDogenitesFromImage } from '/Core/Dogenite/DogeniteAlgo.js';
import AssetManager from '/GrokityAssetMan/AssetManager.js';
import Landscaping from '/Core/Landscaping/Landscaping.js';

class World {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.dogenites = null;
        this.landscaping = null;
    }

    async init() {
        try {
            console.log('Preloading assets...');
            await AssetManager.preloadAssets(['assets/Dogecoin.png', 'assets/GameTerrain.png']);
            const dogecoinTexture = AssetManager.getTexture('assets/Dogecoin.png');
            const terrainTexture = AssetManager.getTexture('assets/GameTerrain.png');

            if (!dogecoinTexture || !terrainTexture) {
                throw new Error('Texture not loaded');
            }

            console.log('Creating Dogenites...');
            this.dogenites = createDogenitesFromImage(dogecoinTexture);
            this.dogenites.position.set(0, 269, 0); // Adjust position to be slightly above the landscape
            this.dogenites.rotation.y = Math.PI; // Rotate by 180 degrees around the Y-axis
            this.scene.add(this.dogenites);
            console.log('Dogenites added to the scene.');

            console.log('Creating landscape...');
            this.landscaping = new Landscaping(this.scene, 'assets/GameTerrain.png');
            await this.landscaping.init();
            console.log('Landscape added to the scene.');
        } catch (error) {
            console.error('Error initializing World:', error);
        }
    }

    update(deltaTime) {
        // Update logic if necessary
    }
}

export default World;
