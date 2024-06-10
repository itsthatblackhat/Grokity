import * as THREE from 'three';

class ComponentTransform {
    constructor() {
        this.position = new THREE.Vector3();
        this.rotation = new THREE.Euler();
        this.scale = new THREE.Vector3(1, 1, 1);
        this.object3D = new THREE.Object3D();
    }

    setPosition(x, y, z) {
        this.position.set(x, y, z);
        this.object3D.position.set(x, y, z);
    }

    setRotation(x, y, z) {
        this.rotation.set(x, y, z);
        this.object3D.rotation.set(x, y, z);
    }

    setScale(x, y, z) {
        this.scale.set(x, y, z);
        this.object3D.scale.set(x, y, z);
    }

    updateMatrix() {
        this.object3D.matrix.compose(this.position, new THREE.Quaternion().setFromEuler(this.rotation), this.scale);
        this.object3D.matrixWorldNeedsUpdate = true;
    }

    update(deltaTime) {
        this.updateMatrix();
    }
}

export default ComponentTransform;
