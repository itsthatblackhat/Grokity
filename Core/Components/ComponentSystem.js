export class ComponentSystem {
    constructor() {
        this.components = new Map();
    }

    addComponent(entity, component) {
        if (!this.components.has(entity)) {
            this.components.set(entity, []);
        }
        this.components.get(entity).push(component);
    }

    removeComponent(entity, component) {
        if (this.components.has(entity)) {
            const entityComponents = this.components.get(entity);
            const index = entityComponents.indexOf(component);
            if (index > -1) {
                entityComponents.splice(index, 1);
            }
        }
    }

    getComponents(entity) {
        return this.components.get(entity) || [];
    }

    update(deltaTime) {
        this.components.forEach((components, entity) => {
            components.forEach(component => component.update(deltaTime));
        });
    }
}
