import * as THREE from '../../Common/three';
import { Dogenite } from './Dogenite';

class DogeniteManager {
    constructor(scene) {
        this.scene = scene;
        this.dogenites = [];
    }

    add(dogenite) {
        this.dogenites.push(dogenite);
        this.scene.add(dogenite.mesh);
    }

    update() {
        for (let dogenite of this.dogenites) {
            dogenite.update();
        }
    }
}

export { DogeniteManager };
