export class Entity {
    constructor() {
        this.components = [];
    }

    addComponent(component) {
        this.components.push(component);
    }

    removeComponent(component) {
        const index = this.components.indexOf(component);
        if (index > -1) {
            this.components.splice(index, 1);
        }
    }

    getComponent(componentClass) {
        return this.components.find(c => c instanceof componentClass);
    }

    update(deltaTime) {
        this.components.forEach(component => component.update(deltaTime));
    }
}
