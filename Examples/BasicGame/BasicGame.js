import * as THREE from '../../Common/three';
import { DogeniteManager } from '../../Core/Dogenite/DogeniteManager';
import { Dogenite } from '../../Core/Dogenite/Dogenite';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import OrbitControls

// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

// Add lighting to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Initialize DogeniteManager and add a Dogenite
const dogeniteManager = new DogeniteManager(scene);
const newDogenite = new Dogenite(new THREE.Vector3(2, 0, 0), 1, { color: 0x00ff00 });
dogeniteManager.add(newDogenite);

console.log('Dogenites added:', dogeniteManager.dogenites);

// Add a test red cube for reference
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

console.log('Cube added:', cube);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Animation loop
const animate = function () {
    requestAnimationFrame(animate);
    dogeniteManager.update();
    controls.update(); // Update controls
    renderer.render(scene, camera);
};

animate();

// Log initial setup for debugging
console.log('Initial Camera Position:', camera.position);
console.log('Initial Scene Children:', scene.children);
console.log('Renderer:', renderer);
console.log('Scene:', scene);
