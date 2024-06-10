import LightingManager from '../../Core/Lighting/LightingManager.js';

class GameScene {
    constructor(sceneManager) {
        this.sceneManager = sceneManager;
        this.lightingManager = new LightingManager();
    }

    init() {
        const ambientLight = this.lightingManager.createAmbientLight(0xffffff, 0.5);
        this.sceneManager.add(ambientLight);

        const directionalLight = this.lightingManager.createDirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        this.sceneManager.add(directionalLight);

        // Initialize other scene settings here
    }
}

export default GameScene;
