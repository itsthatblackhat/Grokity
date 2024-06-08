import * as THREE from 'three';
import GraphicsEngine from '../Graphics/GraphicsEngine.js';
import PhysicsEngine from '../Physics/PhysicsEngine.js';


class RenderingEngine {
    constructor(graphicsEngine, physicsEngine) {
        this.graphicsEngine = graphicsEngine;
        this.physicsEngine = physicsEngine;
    }

    render(deltaTime) {
        this.physicsEngine.update(deltaTime);
        this.graphicsEngine.render();
    }
}

export default RenderingEngine;
