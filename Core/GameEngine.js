import * as THREE from '/Common/three.js';
import SceneManager from './SceneManagement/SceneManager.js';
import InputManager from './Input/InputManager.js';
import EntityManager from './Entity/EntityManager.js';
import GraphicsEngine from './Graphics/GraphicsEngine.js';

export class GameEngine {
    constructor() {
        console.log('Initializing Game Engine');

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.sceneManager = new SceneManager();
        this.inputManager = new InputManager(this.sceneManager.camera, this.renderer);
        this.entityManager = new EntityManager();
        this.graphicsEngine = new GraphicsEngine(this.sceneManager.scene, this.sceneManager.camera);

        this.controls = new THREE.OrbitControls(this.sceneManager.camera, this.renderer.domElement);

        console.log('Game Engine Initialized');
    }

    initialize() {
        console.log('Initializing Game Engine Components');
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
    }

    render() {
        this.renderer.render(this.sceneManager.scene, this.sceneManager.camera);
    }
}

export default GameEngine;
