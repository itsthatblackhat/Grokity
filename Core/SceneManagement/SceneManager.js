import * as THREE from 'three';
import LightingManager from '../Lighting/LightingManager.js';
import InputManager from '../Input/InputManager.js';
import PhysicsManager from '../Physics/PhysicsManager.js';

class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.camera.position.z = 5;
        window.addEventListener('resize', this.onWindowResize.bind(this), false);

        this.lightingManager = new LightingManager();
        this.inputManager = new InputManager(this.camera, this.renderer);
        this.physicsManager = new PhysicsManager();
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    createCamera(fov, aspect, near, far) {
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        return this.camera;
    }

    add(object) {
        if (object instanceof THREE.Object3D || object.isLight || object instanceof THREE.GridHelper) {
            this.scene.add(object);
        } else {
            console.error("Object is not an instance of THREE.Object3D, light, or GridHelper", object);
        }
    }

    remove(object) {
        if (object instanceof THREE.Object3D || object.isLight || object instanceof THREE.GridHelper) {
            this.scene.remove(object);
        } else {
            console.error("Object is not an instance of THREE.Object3D, light, or GridHelper", object);
        }
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

export default SceneManager;
