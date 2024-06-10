import * as THREE from 'three';

class ShapeMatching {
    static extractShapesFromSVG(data) {
        const shapes = [];
        data.paths.forEach((path) => {
            path.toShapes(true).forEach((shape) => {
                shapes.push(shape);
            });
        });
        return shapes;
    }
}

export default ShapeMatching;
