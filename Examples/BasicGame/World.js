import { createDogenitesFromImage } from '/Core/Dogenite/DogeniteAlgo.js';
import AssetManager from '/GrokityAssetMan/AssetManager.js';
import Landscaping from '/Core/Landscaping/Landscaping.js';
import InputManager from '/Core/Input/InputManager.js';
import AnimationManager from '/Core/Animation/AnimationManager.js';
import WeatherRender from '/Core/Extensions/WeatherRender/WeatherRender.js';
import WeatherAnimation from '/Core/Animation/WeatherAnimation.js';

class World {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.dogenites = null;
        this.landscaping = null;
        this.inputManager = new InputManager(camera, renderer);
        this.animationManager = new AnimationManager();
        this.weatherRender = new WeatherRender(scene, 33.1507, -96.8236); // Pass correct coordinates
    }

    async init() {
        try {
            console.log('Preloading assets...');
            await AssetManager.preloadAssets([
                'assets/GlobalVector.png'
            ]);
            const terrainTexture = AssetManager.getTexture('assets/GlobalVector.png');

            if (!terrainTexture) {
                throw new Error('Texture not loaded');
            }

            console.log('Creating landscape...');
            this.landscaping = new Landscaping(this.scene, 'assets/GlobalVector.png');
            await this.landscaping.init();
            console.log('Landscape added to the scene.');

            this.inputManager.init();
            await this.weatherRender.initialize(); // Initialize the weather render

            // Create and start weather animation
            const weatherEffect = this.weatherRender.weatherEffect;
            if (weatherEffect) {
                const startPosition = weatherEffect.position.clone();
                const endPosition = startPosition.clone().add(new THREE.Vector3(0, 50, 0)); // Example of moving upwards
                const weatherAnimation = new WeatherAnimation(weatherEffect, 5000, startPosition, endPosition); // 5 seconds duration
                this.animationManager.add(weatherAnimation);
                weatherAnimation.start();
            }

            console.log('World initialized.');
        } catch (error) {
            console.error('Error initializing World:', error);
        }
    }

    update(deltaTime) {
        this.inputManager.update(deltaTime);
        this.animationManager.update(deltaTime);
        this.weatherRender.update(); // Update weather effects
    }
}

export default World;
