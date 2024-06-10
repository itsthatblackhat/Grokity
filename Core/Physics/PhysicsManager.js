import * as THREE from 'three';
import { World, Body, Box, Vec3 } from 'cannon-es';

class PhysicsManager {
    constructor() {
        this.world = new World();
        this.world.gravity.set(0, -9.82, 0);
    }

    addBox(box) {
        const shape = new Box(new Vec3(box.width / 2, box.height / 2, box.depth / 2));
        const body = new Body({ mass: box.mass });
        body.addShape(shape);
        body.position.copy(box.position);
        this.world.addBody(body);
        return body;
    }

    step(delta) {
        this.world.step(1 / 60, delta, 3);
    }
}

export default PhysicsManager;
