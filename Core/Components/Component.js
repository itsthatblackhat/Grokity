// Core/Components/Component.js
class Component {
    constructor(entity) {
        this.entity = entity;
    }

    update(deltaTime) {
        // Override in derived components
    }
}

export default Component;
