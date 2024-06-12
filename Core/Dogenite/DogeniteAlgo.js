// Core/Dogenite/DogeniteAlgo.js
import * as THREE from 'three';

export function createDogenitesFromImage(texture) {
    const width = texture.image.width;
    const height = texture.image.height;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.drawImage(texture.image, 0, 0);
    const imageData = context.getImageData(0, 0, width, height);

    const dogeniteGeometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        -0.5, -0.5, 0,
        0.5, -0.5, 0,
        0, 0.5, 0
    ]);
    dogeniteGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    const dogeniteMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });

    const count = width * height;
    const mesh = new THREE.InstancedMesh(dogeniteGeometry, dogeniteMaterial, count);

    let index = 0;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const alpha = imageData.data[(y * width + x) * 4 + 3];

            if (alpha > 0) {
                const matrix = new THREE.Matrix4();
                matrix.setPosition(x - width / 2, y - height / 2, 0);
                mesh.setMatrixAt(index, matrix);
                index++;
            }
        }
    }

    mesh.instanceMatrix.needsUpdate = true;
    mesh.count = index;

    return mesh;
}
