import ShapeMatching from '../Core/ShapeMatching/ShapeMatching.js';
import { BufferGeometry, MeshBasicMaterial, Mesh } from 'three';

const SVGLoader = {
    load: function (url, onLoad, onProgress, onError) {
        const loader = new XMLHttpRequest();
        loader.open('GET', url, true);

        loader.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                const svg = this.responseText;
                const geometry = new BufferGeometry(); // Create geometry based on SVG parsing logic
                const material = new MeshBasicMaterial({ color: 0x00ff00 });
                const mesh = new Mesh(geometry, material);

                onLoad(mesh);
            } else {
                if (onError) onError(this.statusText);
            }
        };

        loader.onprogress = onProgress;

        loader.onerror = onError;

        loader.send();
    }
};

export default SVGLoader;
