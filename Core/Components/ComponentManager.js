// Core/Components/ComponentManager.js
class ComponentManager {
    constructor() {
        this.components = [];
    }

    addComponent(component) {
        this.components.push(component);
    }

    update(deltaTime) {
        for (const component of this.components) {
            component.update(deltaTime);
        }
    }
}

export default new ComponentManager();
