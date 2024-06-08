import * as THREE from '../Common/three.js';
import { Dogenite } from '../Core/Dogenite/Dogenite.js';

const scene = new THREE.Scene();
console.log("Scene created:", scene);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
console.log("Camera created:", camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
console.log("Renderer created and added to DOM");

const controls = new THREE.OrbitControls(camera, renderer.domElement);
console.log("OrbitControls created:", controls);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
console.log("AmbientLight added to scene");

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);
console.log("PointLight added to scene");

const dogenite = new Dogenite();
scene.add(dogenite.mesh);
console.log("Dogenite instance created:", dogenite);

dogenite.loadShape('/assets/David_Smith_Einstein_Hat_28.svg');
console.log("SVGLoader created");

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
console.log("Animation loop started");
