import * as THREE from 'three';
import { OrbitControls } from '/Core/Input/OrbitControls.js';
import World from '/Examples/BasicGame/World.js';
import InputManager from '/Core/Input/InputManager.js';
import CoordinatesManager from '/Core/Coordinates/CoordinatesManager.js';

let camera, scene, renderer, controls, inputManager, coordinatesManager, world;

async function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 10000, 100000); // Add fog to the scene for smoother fade out

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000); // Increase far clipping plane
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 100, 300); // Adjust initial camera position
    controls.update();

    inputManager = new InputManager(camera, renderer);
    inputManager.init();

    coordinatesManager = new CoordinatesManager(camera);

    world = new World(scene, camera, renderer);
    await world.init();

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    inputManager.update(0.016); // Assuming 60 FPS, so each frame is ~16ms
    coordinatesManager.updateCoordinates();
    renderer.render(scene, camera);
}

init();
