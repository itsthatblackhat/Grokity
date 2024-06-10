import * as THREE from 'three';

class UVSpace {
    constructor() {
        this.uvMap = [];
    }

    toUVCoordinates(mesh, faceIndex, localPosition) {
        const uv = mesh.geometry.faceVertexUvs[0][faceIndex];
        const uvPosition = new THREE.Vector2();
        uvPosition.copy(uv[0]).lerp(uv[1], localPosition.x).lerp(uv[2], localPosition.y);
        return uvPosition;
    }
}

export { UVSpace };
