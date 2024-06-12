import * as THREE from 'three';
import World from '/Examples/BasicGame/World.js';
import Controls from '/Examples/BasicGame/Controls.js';
import InputKBM from '/Core/Input/InputKBM.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const kbm = new InputKBM();
const controls = new Controls(camera, renderer, kbm);
controls.init();

const world = new World(scene, camera);
world.init();

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const deltaTime = clock.getDelta();
    controls.update(deltaTime);
    world.update(deltaTime);
    renderer.render(scene, camera);
}

animate();
