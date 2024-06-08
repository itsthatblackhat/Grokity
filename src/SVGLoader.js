import * as THREE from '/Common/three.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

class CustomSVGLoader {
    constructor() {
        this.loader = new SVGLoader();
    }

    load(path, onLoad, onError) {
        this.loader.load(
            path,
            (data) => {
                const paths = data.paths;
                const group = new THREE.Group();

                for (let i = 0; i < paths.length; i++) {
                    const path = paths[i];
                    const material = new THREE.MeshBasicMaterial({
                        color: path.color,
                        side: THREE.DoubleSide,
                        depthWrite: false
                    });

                    const shapes = SVGLoader.createShapes(path);

                    for (let j = 0; j < shapes.length; j++) {
                        const shape = shapes[j];
                        const geometry = new THREE.ShapeGeometry(shape);
                        const mesh = new THREE.Mesh(geometry, material);
                        group.add(mesh);
                    }
                }

                onLoad(group);
            },
            undefined,
            onError
        );
    }
}

export { SVGLoader };
