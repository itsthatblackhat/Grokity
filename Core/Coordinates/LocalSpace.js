import * as THREE from '/Common/three.js';

class LocalSpace {
    toLocalCoordinates(worldPosition, object) {
        const localPosition = new THREE.Vector3();
        object.worldToLocal(localPosition.copy(worldPosition));
        return localPosition;
    }
}

export { LocalSpace };
