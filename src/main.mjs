import * as THREE from 'three';
import { OrbitControls } from '/Core/Input/OrbitControls.js';
import World from '/Examples/BasicGame/World.js';

async function init() {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.00025); // Use exponential fog for smoother fade out

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000); // Increase far clipping plane
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 100, 300); // Adjust initial camera position
    controls.update();

    const world = new World(scene, camera, renderer);
    await world.init();

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

init();
