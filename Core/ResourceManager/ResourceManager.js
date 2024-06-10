// Core/ResourceManager/ResourceManager.js
class ResourceManager {
    constructor() {
        this.assets = {};
    }

    loadTexture(name, url) {
        const image = new Image();
        image.src = url;
        this.assets[name] = image;
    }

    getTexture(name) {
        return this.assets[name];
    }
}

export default new ResourceManager();
