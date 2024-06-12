// src/main.mjs
import * as THREE from 'three';
import World from '/Examples/BasicGame/World.js';
import InputKBM from '/Core/Input/InputKBM.js';
import Controls from '/Examples/BasicGame/Controls.js';

let scene, camera, renderer, world, controls, inputKBM;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    inputKBM = new InputKBM();
    controls = new Controls(camera, renderer, inputKBM);
    controls.init();

    world = new World(scene);
    world.init();

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    const deltaTime = 0.01;
    world.update(deltaTime);
    controls.update(deltaTime);

    renderer.render(scene, camera);
}

init();
animate();
