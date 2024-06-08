import * as THREE from '/Common/three.js';

class Dogenite {
    constructor() {
        this.mesh = this.createDogeniteMesh();
        console.log("Dogenite mesh created");
    }

    createDogeniteMesh() {
        const shape = this.createEinsteinHatShape();
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geometry, material);
        console.log("Einstein Hat Shape added to scene");
        return mesh;
    }

    createEinsteinHatShape() {
        const shape = new THREE.Shape();
        const SIDE = 96;
        const sqrt3 = Math.sqrt(3);
        const x = 0;
        const y = 0;

        shape.moveTo(x, y);
        shape.lineTo(x + SIDE * sqrt3 / 2, y + SIDE / 2);
        shape.lineTo(x + SIDE * 2 / sqrt3, y);
        shape.lineTo(x + SIDE * sqrt3, y);
        shape.lineTo(x + SIDE * sqrt3, y - SIDE);
        shape.lineTo(x + SIDE * sqrt3 / 2, y - 3 / 2 * SIDE);
        shape.lineTo(x + SIDE * 2 / sqrt3, y - 2 * SIDE);
        shape.lineTo(x + SIDE * sqrt3 / 2, y - 5 / 2 * SIDE);
        shape.lineTo(x, y - 2 * SIDE);
        shape.lineTo(x, y - SIDE);
        shape.lineTo(x - SIDE / sqrt3, y - SIDE);
        shape.lineTo(x - SIDE * 2 / sqrt3, y);
        shape.lineTo(x - SIDE * sqrt3 / 2, y + SIDE / 2);
        shape.lineTo(x, y);

        return shape;
    }

    loadShape(path) {
        this.loader.load(path, (data) => {
            const paths = data.paths;
            const group = new THREE.Group();
            for (let i = 0; i < paths.length; i++) {
                const path = paths[i];
                const material = new THREE.MeshBasicMaterial({
                    color: path.color,
                    side: THREE.DoubleSide,
                    depthWrite: false
                });

                const shapes = path.toShapes(true);

                for (let j = 0; j < shapes.length; j++) {
                    const shape = shapes[j];
                    const geometry = new THREE.ShapeGeometry(shape);
                    const mesh = new THREE.Mesh(geometry, material);
                    group.add(mesh);
                }
            }
            this.mesh.add(group);
            console.log("SVG loaded and parsed:", group);
        }, undefined, (error) => {
            console.error("An error happened", error);
        });
    }
}

export { Dogenite };
