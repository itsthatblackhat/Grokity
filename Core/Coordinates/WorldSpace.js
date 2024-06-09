import * as THREE from '/Common/three.js';

class WorldSpace {
    constructor() {
        this.origin = new THREE.Vector3(0, 0, 0);
    }

    toWorldCoordinates(localPosition, object) {
        const worldPosition = new THREE.Vector3();
        object.localToWorld(worldPosition.copy(localPosition));
        return worldPosition;
    }
}

export { WorldSpace };
