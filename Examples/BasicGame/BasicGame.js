import * as THREE from 'three';
import Controls from './Controls.js';
import World from './World.js';
import CoordinatesManager from '/Core/Coordinates/CoordinatesManager.js';

let camera, scene, renderer, controls, world, coordinatesManager;

function init() {
    // Create and insert the coordinates display element
    const coordinateElement = document.createElement('div');
    coordinateElement.id = 'coordinates';
    document.body.appendChild(coordinateElement);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 5);

    // Scene
    scene = new THREE.Scene();

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Controls
    controls = new Controls(camera, renderer);
    controls.init();

    // World
    world = new World(scene);
    world.init();

    // Coordinates Manager
    coordinatesManager = new CoordinatesManager(camera, coordinateElement);

    // Resize handling
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Update controls and world
    controls.update();

    // Update coordinates
    coordinatesManager.updateCoordinates();

    // Render the scene
    renderer.render(scene, camera);
}

init();
animate();
