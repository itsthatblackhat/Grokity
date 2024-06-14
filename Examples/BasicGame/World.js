import { createDogenitesFromImage } from '/Core/Dogenite/DogeniteAlgo.js';
import AssetManager from '/GrokityAssetMan/AssetManager.js';
import Landscaping from '/Core/Landscaping/Landscaping.js';
import InputManager from '/Core/Input/InputManager.js';
import AnimationManager from '/Core/Animation/AnimationManager.js';
import BounceAnimation from '/Core/Animation/BounceAnimation.js';
import SpinAnimation from '/Core/Animation/SpinAnimation.js';

class World {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.dogenites = null;
        this.landscaping = null;
        this.inputManager = new InputManager(camera, renderer);
        this.animationManager = new AnimationManager();
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

            console.log('Creating landscape...');
            this.landscaping = new Landscaping(this.scene, 'assets/GameTerrain.png');
            await this.landscaping.init();
            console.log('Landscape added to the scene.');

            console.log('Creating Dogenites...');
            this.dogenites = createDogenitesFromImage(dogecoinTexture);
            if (this.dogenites) {
                this.dogenites.position.set(0, 269, 0); // Adjust position to be slightly above the landscape
                this.scene.add(this.dogenites);
                console.log('Dogenites added to the scene.');
            } else {
                console.error('Failed to create Dogenites');
            }

            this.inputManager.init();

            // Add and start the bounce animation
            const bounceAnimation = new BounceAnimation(this.dogenites, 2, 10);
            this.animationManager.add(bounceAnimation);
            bounceAnimation.start();

            // Add and start the spin animation
            const spinAnimation = new SpinAnimation(this.dogenites, 5);
            this.animationManager.add(spinAnimation);
            spinAnimation.start();

        } catch (error) {
            console.error('Error initializing World:', error);
        }
    }

    update(deltaTime) {
        this.inputManager.update(deltaTime);
        this.animationManager.update(deltaTime);
    }
}

export default World;
