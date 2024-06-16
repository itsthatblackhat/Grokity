import * as THREE from '/Common/three.js';
import SceneManager from './SceneManagement/SceneManager.js';
import InputManager from './Input/InputManager.js';
import EntityManager from './Entity/EntityManager.js';
import GraphicsEngine from './Graphics/GraphicsEngine.js';
import WeatherRender from './Extensions/WeatherRender/WeatherRender.js';

export class GameEngine {
    constructor(latitude, longitude) {
        console.log('Initializing Game Engine');

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.sceneManager = new SceneManager();
        this.inputManager = new InputManager(this.sceneManager.camera, this.renderer);
        this.entityManager = new EntityManager();
        this.graphicsEngine = new GraphicsEngine(this.sceneManager.scene, this.sceneManager.camera);

        this.controls = new THREE.OrbitControls(this.sceneManager.camera, this.renderer.domElement);

        this.weatherRender = new WeatherRender(this.sceneManager.scene, latitude, longitude);

        console.log('Game Engine Initialized');
    }

    async initialize() {
        console.log('Initializing Game Engine Components');
        await this.weatherRender.initialize();
        // Add any additional initialization logic here
    }

    addEntity(entity) {
        console.log('Adding Entity to Scene');
        this.sceneManager.scene.add(entity.object3D);
        this.entityManager.addEntity(entity);
    }

    start() {
        const animate = () => {
            requestAnimationFrame(animate);
            this.update();
            this.render();
        };
        animate();
    }

    update() {
        const deltaTime = 0.016; // Assuming 60fps for simplicity
        this.inputManager.update(deltaTime);
        this.entityManager.update(deltaTime);
        this.sceneManager.update(deltaTime);
        this.weatherRender.render();
    }

    render() {
        this.renderer.render(this.sceneManager.scene, this.sceneManager.camera);
    }
}

export default GameEngine;
