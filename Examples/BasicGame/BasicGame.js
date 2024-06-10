import * as THREE from 'three';
import InputManager from '../../Core/Input/InputManager.js';
import World from './World.js';
import Lighting from './Lighting.js';
import Sky from './Sky.js';
import Fog from './Fog.js';
import Weather from './Weather.js';
import Controls from './Controls.js';

class BasicGame {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.inputManager = null;
        this.world = null;
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.inputManager = new InputManager(this.camera, this.renderer);
        this.world = new World(this.scene);
        this.controls = new Controls(this.camera, this.renderer);

        // Initialize modular components
        Lighting(this.scene);
        Sky(this.scene);
        Fog(this.scene);
        Weather(this.scene);

        this.camera.position.z = 5;

        this.inputManager.init();
        this.controls.init(); // Make sure to call init
        this.world.init();

        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.inputManager.update();
        this.world.update();
        this.controls.update();

        this.renderer.render(this.scene, this.camera);
    }
}

export default BasicGame;
