// Core/Components/Component.js
class Component {
    constructor() {
        this.entity = null;
    }

    update(deltaTime) {
        // Override in derived components
    }
}

export default Component;

// Core/Components/RenderableComponent.js
import Component from './Component.js';

class RenderableComponent extends Component {
    constructor(mesh) {
        super();
        this.mesh = mesh;
    }

    update(deltaTime) {
        // Update mesh if needed
    }
}

export default RenderableComponent;

// Core/Components/PhysicsComponent.js
import Component from './Component.js';
import PhysicsManager from '../Physics/PhysicsManager.js';

class PhysicsComponent extends Component {
    constructor(body) {
        super();
        this.body = body;
        PhysicsManager.addBody(this.body);
    }

    update(deltaTime) {
        // Sync entity position with physics body
        if (this.entity) {
            const { position, quaternion } = this.body;
            this.entity.position.copy(position);
            this.entity.quaternion.copy(quaternion);
        }
    }
}

export default PhysicsComponent;
