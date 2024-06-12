import * as THREE from 'three';
import { AssetManager } from '/GrokityAssetMan/AssetManager.js';
import World from '/Examples/BasicGame/World.js';
import Controls from '/Examples/BasicGame/Controls.js';
import InputKBM from '/Core/Input/InputKBM.js';

let camera, scene, renderer, controls;
let clock = new THREE.Clock();

async function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // KBM Input
    const kbm = new InputKBM();

    // Controls
    controls = new Controls(camera, renderer, kbm);
    controls.init();

    // World
    const world = new World(scene);
    await world.init();

    // Animation Loop
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    let deltaTime = clock.getDelta();

    // Update controls
    controls.update(deltaTime);

    // Render the scene
    renderer.render(scene, camera);

    // Update coordinates display
    updateCoordinatesDisplay();
}

function updateCoordinatesDisplay() {
    const coordinatesDiv = document.getElementById('coordinates');
    coordinatesDiv.textContent = `Coordinates: (${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)})`;
}

window.onload = init;
