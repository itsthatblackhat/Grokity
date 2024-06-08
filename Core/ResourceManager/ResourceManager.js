class ResourceManager {
    constructor() {
        this.resources = {};
    }

    loadResource(name, url, type) {
        if (type === 'image') {
            const img = new Image();
            img.src = url;
            this.resources[name] = img;
        }
        // Additional resource types can be handled here (e.g., models, audio)
    }

    getResource(name) {
        return this.resources[name];
    }
}

export default ResourceManager;
