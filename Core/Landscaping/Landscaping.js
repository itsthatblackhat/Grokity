import * as THREE from 'three';
import { createDogenitesFromImage } from '/Core/Dogenite/DogeniteAlgo.js';

export default class Landscaping {
    constructor(scene, texturePath) {
        this.scene = scene;
        this.texturePath = texturePath;
    }

    async init() {
        try {
            const landscapeMesh = await this.createDogenitesFromTexture(this.texturePath);
            landscapeMesh.rotation.x = -Math.PI / 2; // Rotate to lie flat on the ground
            landscapeMesh.position.y = -5; // Position below the Dogecoin
            this.scene.add(landscapeMesh);
        } catch (error) {
            console.error('Error initializing Landscaping:', error);
        }
    }

    async createDogenitesFromTexture(texturePath) {
        return new Promise((resolve, reject) => {
            const loader = new THREE.TextureLoader();
            loader.load(
                texturePath,
                (texture) => {
                    try {
                        const dogenitesMesh = createDogenitesFromImage(texture);
                        resolve(dogenitesMesh);
                    } catch (e) {
                        reject(e);
                    }
                },
                undefined,
                (err) => {
                    console.error('Error loading texture:', err);
                    reject(err);
                }
            );
        });
    }
}
