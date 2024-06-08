import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

class CustomSVGLoader {
    constructor() {
        this.loader = new SVGLoader();
    }

    load(path, onLoad) {
        this.loader.load(path, (data) => {
            const svgGroup = new THREE.Group();
            const paths = data.paths;

            paths.forEach((path) => {
                const shapes = SVGLoader.createShapes(path);

                shapes.forEach((shape) => {
                    const geometry = new THREE.ShapeGeometry(shape);
                    const material = new THREE.MeshBasicMaterial({
                        color: path.color,
                        side: THREE.DoubleSide,
                        depthWrite: false
                    });

                    const mesh = new THREE.Mesh(geometry, material);
                    svgGroup.add(mesh);
                });
            });

            onLoad(svgGroup);
        });
    }
}

export default CustomSVGLoader;
