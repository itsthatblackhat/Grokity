import * as THREE from 'three';

// Function to estimate depth from an image
function estimateDepth(imageData, width, height) {
    const depthMap = new Float32Array(width * height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const brightness = (imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2]) / 3;
            const depth = brightness / 255.0;
            depthMap[y * width + x] = depth;
        }
    }
    return depthMap;
}

// Function to create Dogenites from an image
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

// Function to create Dogenites for landscape from an image
export function createDogenitesForLandscapeFromImage(texture) {
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
    const mesh = new THREE.InstancedMesh(dogeniteGeometry, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, vertexColors: true }), count);

    const colors = new Float32Array(count * 3);
    const positions = new Float32Array(count * 3);

    let index = 0;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const depth = depthMap[y * width + x];

            positions[index * 3] = x - width / 2;
            positions[index * 3 + 1] = y - height / 2;
            positions[index * 3 + 2] = depth * 4.2; // Scale depth appropriately

            // Set a light brown color for the landscape
            colors[index * 3] = 0.8; // R
            colors[index * 3 + 1] = 0.52; // G
            colors[index * 3 + 2] = 0.25; // B

            index++;
        }
    }

    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const instancePositions = new THREE.InstancedBufferAttribute(positions, 3);
    const instanceColors = new THREE.InstancedBufferAttribute(colors, 3);

    dogeniteGeometry.setAttribute('instancePosition', instancePositions);
    dogeniteGeometry.setAttribute('instanceColor', instanceColors);

    const material = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });
    const landscapeMesh = new THREE.InstancedMesh(dogeniteGeometry, material, index);

    return landscapeMesh;
}
