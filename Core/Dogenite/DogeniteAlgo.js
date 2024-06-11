import * as THREE from 'three';
import Dogenite from './Dogenite.js';

export function createDogenitesFromImage(texture) {
    const width = texture.image.width;
    const height = texture.image.height;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.drawImage(texture.image, 0, 0);
    const imageData = context.getImageData(0, 0, width, height);

    const dogenites = [];

    // Loop through image data and create Dogenites
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const alpha = imageData.data[index + 3];

            if (alpha > 0) {
                const color = new THREE.Color(
                    imageData.data[index] / 255,
                    imageData.data[index + 1] / 255,
                    imageData.data[index + 2] / 255
                );
                const dogenite = createDogenite(x, y, color);
                dogenites.push(dogenite);
            }
        }
    }

    return dogenites;
}

function createDogenite(x, y, color) {
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        -0.5, -0.5, 0,
        0.5, -0.5, 0,
        0, 0.5, 0
    ]);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, 0);
    return { mesh };
}
