import * as THREE from 'three';

class LocalSpace {
    toLocalCoordinates(worldPosition, object) {
        const localPosition = new THREE.Vector3();
        object.worldToLocal(localPosition.copy(worldPosition));
        return localPosition;
    }
}

export { LocalSpace };
