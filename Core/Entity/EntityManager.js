import Entity from './Entity.js';

class EntityManager {
    constructor() {
        this.entities = [];
    }

    createEntity() {
        const entity = new Entity();
        this.entities.push(entity);
        return entity;
    }

    update(deltaTime) {
        for (const entity of this.entities) {
            for (const component of Object.values(entity.components)) {
                component.update(deltaTime);
            }
        }
    }
}

export default new EntityManager();
