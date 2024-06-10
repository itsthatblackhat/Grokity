import * as CANNON from 'cannon';

export class PhysicsEngine {
    constructor() {
        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.82, 0); // Earth gravity
        this.world.broadphase = new CANNON.NaiveBroadphase();
        this.world.solver.iterations = 10;
        this.bodies = [];
    }

    addBody(body) {
        this.world.addBody(body);
        this.bodies.push(body);
    }

    removeBody(body) {
        this.world.removeBody(body);
        const index = this.bodies.indexOf(body);
        if (index > -1) {
            this.bodies.splice(index, 1);
        }
    }

    update(deltaTime) {
        this.world.step(deltaTime);
    }

    addContactMaterial(material) {
        this.world.addContactMaterial(material);
    }

    createContactMaterial(materialA, materialB, options) {
        return new CANNON.ContactMaterial(materialA, materialB, options);
    }
}
