import * as THREE from 'three';
import World from '/Examples/BasicGame/World.js';
import InputManager from '/Core/Input/InputManager.js';
import CoordinatesManager from '/Core/Coordinates/CoordinatesManager.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const world = new World(scene);
world.init();

const inputManager = new InputManager(camera, renderer);
inputManager.init();

const coordinatesManager = new CoordinatesManager(camera);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    const deltaTime = 0.01; // This should ideally be calculated

    inputManager.update(deltaTime);
    world.update();

    coordinatesManager.updateCoordinates();
    renderer.render(scene, camera);
}

animate();
