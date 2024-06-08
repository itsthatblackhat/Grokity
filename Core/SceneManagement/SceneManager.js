class SceneManager {
    constructor() {
        this.scenes = {};
        this.currentScene = null;
    }

    createScene(name) {
        if (this.scenes[name]) {
            console.warn(`Scene ${name} already exists.`);
            return this.scenes[name];
        }

        const scene = {
            name,
            objects: [],
        };
        this.scenes[name] = scene;
        return scene;
    }

    switchScene(name) {
        if (!this.scenes[name]) {
            console.error(`Scene ${name} does not exist.`);
            return;
        }

        this.currentScene = this.scenes[name];
    }

    addObjectToScene(sceneName, object) {
        if (!this.scenes[sceneName]) {
            console.error(`Scene ${sceneName} does not exist.`);
            return;
        }

        this.scenes[sceneName].objects.push(object);
    }

    removeObjectFromScene(sceneName, object) {
        if (!this.scenes[sceneName]) {
            console.error(`Scene ${sceneName} does not exist.`);
            return;
        }

        const index = this.scenes[sceneName].objects.indexOf(object);
        if (index > -1) {
            this.scenes[sceneName].objects.splice(index, 1);
        }
    }
}

export default SceneManager;
