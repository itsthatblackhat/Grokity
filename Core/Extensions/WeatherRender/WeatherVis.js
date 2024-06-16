import * as THREE from 'three';

function visualizeData(data, scene) {
    data.properties.periods.forEach(entry => {
        const color = getColorForData(entry);
        const material = new THREE.MeshBasicMaterial({ color });
        const geometry = new THREE.BoxGeometry(1, 1, 1); // Example geometry
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
    });
}

function getColorForData(entry) {
    // Implement your logic to determine color based on data
    // For example:
    if (entry.temperature > 30) {
        return 0xff0000; // Red for hot
    } else if (entry.temperature < 0) {
        return 0x0000ff; // Blue for cold
    } else {
        return 0x00ff00; // Green for moderate
    }
}

export { visualizeData, getColorForData };
