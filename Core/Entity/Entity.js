// Core/Entity/Entity.js
class Entity {
    constructor() {
        this.components = {};
        this.position = { x: 0, y: 0, z: 0 };
        this.rotation = { x: 0, y: 0, z: 0 };
        this.scale = { x: 1, y: 1, z: 1 };
    }

    addComponent(name, component) {
        component.entity = this;
        this.components[name] = component;
    }

    getComponent(name) {
        return this.components[name];
    }

    removeComponent(name) {
        delete this.components[name];
    }
}

export default Entity;
