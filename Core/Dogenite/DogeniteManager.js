import * as THREE from 'three';
import CreateQuarterPixelShape from './CreateQuarterPixelShape.js';

class DogeniteManager {
    constructor(scene) {
        this.scene = scene;
        this.createQuarterPixelPyramid();
    }

    createQuarterPixelPyramid() {
        const pyramidHeight = 10;  // Adjust for testing
        const baseSize = 10;       // Adjust for testing
        const offset = 0.01;       // Size of each shape
        const scale = offset / 4;  // Scale down to quarter-pixel size

        for (let y = 0; y < pyramidHeight; y++) {
            for (let x = -baseSize + y; x < baseSize - y; x++) {
                for (let z = -baseSize + y; z < baseSize - y; z++) {
                    const quarterPixelShape = CreateQuarterPixelShape(scale);
                    quarterPixelShape.position.set(x * offset, y * offset, z * offset);
                    this.scene.add(quarterPixelShape);
                }
            }
        }
        console.log("Pyramid of quarter-pixel shapes created and added to the scene");
    }
}

export default DogeniteManager;
