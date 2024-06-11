import * as THREE from 'three';
import Dogenite from '../../Core/Dogenite/Dogenite.js';
import CreateQuarterPixelShape from '../../Core/Dogenite/CreateQuarterPixelShape.js';

let scene, camera, renderer;
let dogenite, quarterPixelShape;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Create and add Dogenite to the scene
    dogenite = new Dogenite(1);
    scene.add(dogenite.mesh);

    // Create and add QuarterPixelShape to the scene
    quarterPixelShape = CreateQuarterPixelShape(1);
    scene.add(quarterPixelShape);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate the Dogenite
    dogenite.mesh.rotation.x += 0.01;
    dogenite.mesh.rotation.y += 0.01;

    // Rotate the QuarterPixelShape
    quarterPixelShape.rotation.x += 0.01;
    quarterPixelShape.rotation.y += 0.01;

    renderer.render(scene, camera);
}

init();
