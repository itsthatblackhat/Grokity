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

// Function to fill gaps using nearest neighbor approach
function fillGaps(vertices, colors, width, height) {
    const filledVertices = [...vertices];
    const filledColors = [...colors];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = y * width + x;
            if (!vertices[index * 3 + 2]) {  // if depth is 0, it's a gap
                let nearestColor = [0, 0, 0];
                let nearestDepth = 0;

                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        const nx = x + dx;
                        const ny = y + dy;
                        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                            const nIndex = ny * width + nx;
                            const nDepth = vertices[nIndex * 3 + 2];
                            if (nDepth) {
                                nearestDepth = nDepth;
                                nearestColor = [
                                    colors[nIndex * 3],
                                    colors[nIndex * 3 + 1],
                                    colors[nIndex * 3 + 2],
                                ];
                            }
                        }
                    }
                }

                filledVertices[index * 3] = vertices[index * 3];
                filledVertices[index * 3 + 1] = vertices[index * 3 + 1];
                filledVertices[index * 3 + 2] = nearestDepth;

                filledColors[index * 3] = nearestColor[0];
                filledColors[index * 3 + 1] = nearestColor[1];
                filledColors[index * 3 + 2] = nearestColor[2];
            }
        }
    }

    return { filledVertices, filledColors };
}

// Function to create Dogenites from an image with a skin
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

    const vertices = [];
    const colors = [];
    const indices = [];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const depth = depthMap[y * width + x];
            const index = y * width + x;

            const pixelIndex = (y * width + x) * 4;
            const alpha = imageData.data[pixelIndex + 3] / 255;

            // Skip transparent pixels
            if (alpha < 0.1) {
                vertices.push(x - width / 2, y - height / 2, 0);
                colors.push(0, 0, 0);
                continue;
            }

            vertices.push(x - width / 2, y - height / 2, depth * 50);

            const red = imageData.data[pixelIndex] / 255;
            const green = imageData.data[pixelIndex + 1] / 255;
            const blue = imageData.data[pixelIndex + 2] / 255;
            colors.push(red, green, blue);

            if (x < width - 1 && y < height - 1) {
                const topLeft = index;
                const topRight = index + 1;
                const bottomLeft = index + width;
                const bottomRight = index + width + 1;

                // Create two triangles for the quad
                indices.push(topLeft, bottomLeft, bottomRight);
                indices.push(topLeft, bottomRight, topRight);
            }
        }
    }

    const { filledVertices, filledColors } = fillGaps(vertices, colors, width, height);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(filledVertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(filledColors, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const material = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
}

// Function to create Dogenites for landscape from an image with a skin
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

    const vertices = [];
    const colors = [];
    const indices = [];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const depth = depthMap[y * width + x];
            const index = y * width + x;

            const pixelIndex = (y * width + x) * 4;
            const alpha = imageData.data[pixelIndex + 3] / 255;

            // Skip transparent pixels
            if (alpha < 0.1) {
                vertices.push(x - width / 2, y - height / 2, 0);
                colors.push(0, 0, 0);
                continue;
            }

            vertices.push(x - width / 2, y - height / 2, depth * 4.2);

            const red = imageData.data[pixelIndex] / 255;
            const green = imageData.data[pixelIndex + 1] / 255;
            const blue = imageData.data[pixelIndex + 2] / 255;
            colors.push(red, green, blue);

            if (x < width - 1 && y < height - 1) {
                const topLeft = index;
                const topRight = index + 1;
                const bottomLeft = index + width;
                const bottomRight = index + width + 1;

                // Create two triangles for the quad
                indices.push(topLeft, bottomLeft, bottomRight);
                indices.push(topLeft, bottomRight, topRight);
            }
        }
    }

    const { filledVertices, filledColors } = fillGaps(vertices, colors, width, height);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(filledVertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(filledColors, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const material = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });
    const landscapeMesh = new THREE.Mesh(geometry, material);

    return landscapeMesh;
}
