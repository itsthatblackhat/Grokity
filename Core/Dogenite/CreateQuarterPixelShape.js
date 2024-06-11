import * as THREE from 'three';

function CreateQuarterPixelShape(size) {
    // Ensure the size is greater than zero
    if (size <= 0) {
        console.error('Size must be greater than zero');
        return null;
    }

    // Create a geometry that's a quarter pixel (cut diagonally, then one of those halves cut horizontally)
    const validSize = Math.max(size, 1); // Ensure size is at least 1 to avoid zero dimensions
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        0, 0, 0, // Vertex 1 (origin)
        validSize / 2, 0, 0, // Vertex 2 (half pixel width)
        0, validSize / 2, 0, // Vertex 3 (half pixel height)

        0, validSize / 2, 0, // Vertex 3 (reuse for next triangle)
        validSize / 2, 0, 0, // Vertex 2 (reuse for next triangle)
        validSize / 4, validSize / 4, 0  // Vertex 4 (quarter pixel)
    ]);

    // Update the geometry to use the vertices
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    // Create a material
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });

    // Create a mesh with the geometry and material
    const shape = new THREE.Mesh(geometry, material);

    return shape;
}

export default CreateQuarterPixelShape;
