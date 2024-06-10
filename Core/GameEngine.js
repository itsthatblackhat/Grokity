import { SceneManager } from './SceneManagement/SceneManager.js';
import { InputManager } from './Input/InputManager.js';
import { EntityManager } from './Entity/EntityManager.js';
import * as THREE from '../Common/three.js'; // Ensure THREE is imported

export class GameEngine {
    constructor() {
        this.sceneManager = new SceneManager();
        this.inputManager = new InputManager();
        this.entityManager = new EntityManager();
    }

    start() {
        const animate = () => {
            requestAnimationFrame(animate);
            this.update();
            this.render();
        };
        animate();
    }

    update() {
        this.inputManager.update();
        this.entityManager.update();
        this.sceneManager.update();
    }

    render() {
        this.sceneManager.render();
    }

    addEntity(entity) {
        this.entityManager.addEntity(entity);
        if (entity.components) {
            entity.components.forEach(component => {
                if (component.mesh && component.mesh instanceof THREE.Object3D) {
                    this.sceneManager.scene.add(component.mesh);
                }
            });
        }
    }
}
