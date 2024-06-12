import * as THREE from 'three';

// Function to estimate depth from an image
function estimateDepth(imageData, width, height) {
    const depthMap = new Float32Array(width * height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // Simplified depth estimation: brightness-to-depth mapping
            const index = (y * width + x) * 4;
            const brightness = (imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2]) / 3;
            const depth = brightness / 255.0;
            depthMap[y * width + x] = depth;
        }
    }
    return depthMap;
}

export function createDogenitesFromImage(texture) {
    const width = texture.image.width;
    const height = texture.image.height;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.drawImage(texture.image, 0, 0);
    const imageData = context.getImageData(0, 0, width, height);

    const depthMap = estimateDepth(imageData, width, height);

    const dogeniteGeometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        -0.5, -0.5, 0,
        0.5, -0.5, 0,
        0, 0.5, 0
    ]);
    dogeniteGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    const count = width * height;
    const mesh = new THREE.InstancedMesh(dogeniteGeometry, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }), count);

    const color = new THREE.Color();
    const transform = new THREE.Object3D();
    let index = 0;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const pixelIndex = (y * width + x) * 4;
            const alpha = imageData.data[pixelIndex + 3];

            if (alpha > 0) {
                const red = imageData.data[pixelIndex] / 255;
                const green = imageData.data[pixelIndex + 1] / 255;
                const blue = imageData.data[pixelIndex + 2] / 255;
                color.setRGB(red, green, blue);

                const depth = depthMap[y * width + x];

                transform.position.set(x - width / 2, y - height / 2, depth * 50); // Scale depth appropriately
                transform.updateMatrix();

                mesh.setMatrixAt(index, transform.matrix);
                mesh.setColorAt(index, color);
                index++;
            }
        }
    }

    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor.needsUpdate = true;
    mesh.count = index;

    return mesh;
}
