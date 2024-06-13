import Landscaping from './Landscaping.js';

class LandscapingManager {
    constructor(scene) {
        this.scene = scene;
        this.landscaping = new Landscaping(scene);
    }

    createLandscape(texture) {
        this.landscaping.createLandscape(texture);
    }
}

export default LandscapingManager;
