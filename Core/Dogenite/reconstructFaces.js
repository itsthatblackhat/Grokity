import * as THREE from 'three';

export function reconstructFaces(vertices, edges, colors) {
    console.log('Vertices:', vertices);
    console.log('Edges:', edges);
    console.log('Colors:', colors);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

    const faces = [];
    const edgesMap = {};

    for (let i = 0; i < edges.length; i += 2) {
        const start = edges[i];
        const end = edges[i + 1];

        if (!edgesMap[start]) {
            edgesMap[start] = [];
        }
        edgesMap[start].push(end);
    }

    for (let start in edgesMap) {
        const ends = edgesMap[start];
        if (ends.length < 2) continue;

        for (let i = 0; i < ends.length; i++) {
            for (let j = i + 1; j < ends.length; j++) {
                const a = parseInt(start);
                const b = parseInt(ends[i]);
                const c = parseInt(ends[j]);

                if (edgesMap[ends[i]] && edgesMap[ends[i]].includes(start) && edgesMap[ends[j]] && edgesMap[ends[j]].includes(start)) {
                    faces.push(a, b, c);
                }
            }
        }
    }

    geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(faces), 1));
    geometry.computeVertexNormals();

    return geometry;
}
