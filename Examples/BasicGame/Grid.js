import * as THREE from 'three';

class Grid {
    constructor(size = 10, divisions = 10) {
        this.size = size;
        this.divisions = divisions;
        this.gridHelper = null;
    }

    init() {
        this.gridHelper = new THREE.GridHelper(this.size, this.divisions);
        return this.gridHelper;
    }
}

export default Grid;
