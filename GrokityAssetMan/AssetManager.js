import * as THREE from 'three';

class AssetManager {
    constructor() {
        this.textures = {};
    }

    loadTexture(path) {
        return new Promise((resolve, reject) => {
            const loader = new THREE.TextureLoader();
            loader.load(
                path,
                texture => {
                    this.textures[path] = texture;
                    resolve(texture);
                },
                undefined,
                error => reject(error)
            );
        });
    }

    getTexture(path) {
        return this.textures[path];
    }

    async preloadAssets(assets) {
        const promises = assets.map(asset => this.loadTexture(asset));
        await Promise.all(promises);
    }
}

export default new AssetManager();
