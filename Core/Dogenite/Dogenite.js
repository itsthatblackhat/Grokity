import * as THREE from '/Common/three.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

export class Dogenite {
    constructor() {
        this.mesh = new THREE.Group(); // Change Mesh to Group to hold multiple objects
        console.log("Dogenite mesh created");
    }

    loadShape(path) {
        const loader = new SVGLoader();
        console.log("SVGLoader created");
        loader.load(path, (data) => {
            const paths = data.paths;
            const group = new THREE.Group();

            for (let i = 0; i < paths.length; i++) {
                const path = paths[i];

                const material = new THREE.MeshBasicMaterial({
                    color: path.color,
                    side: THREE.DoubleSide,
                    depthWrite: false,
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
        });
    }
}
