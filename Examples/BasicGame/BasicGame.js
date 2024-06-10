import * as THREE from '../../Common/three.js';
import { GameEngine } from '../../Core/GameEngine.js';
import { Entity } from '../../Core/Entity/Entity.js';
import { ComponentTransform } from '../../Core/Components/ComponentTransform.js';

function BasicGame() {
    const engine = new GameEngine();
    engine.start();

    const entity = new Entity();
    const transform = new ComponentTransform();
    entity.addComponent(transform);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    transform.mesh = cube; // Assign the mesh to the transform component
    engine.sceneManager.scene.add(cube);

    entity.update = function(deltaTime) {
        transform.rotation.x += 0.01;
        transform.rotation.y += 0.01;
        cube.rotation.x = transform.rotation.x;
        cube.rotation.y = transform.rotation.y;
    };

    engine.addEntity(entity);

    function animate() {
        requestAnimationFrame(animate);
        engine.update();
        engine.render();
    }

    animate();
}

export default BasicGame;
