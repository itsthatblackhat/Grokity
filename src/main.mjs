import SceneManager from '../Core/SceneManagement/SceneManager.js';
import LightingManager from '../Core/Lighting/LightingManager.js';
import GraphicsEngine from '../Core/Graphics/GraphicsEngine.js';
import InputManager from '../Core/Input/InputManager.js';
import World from '../Examples/BasicGame/World.js';

const sceneManager = new SceneManager();
const renderer = sceneManager.renderer; // Use the renderer from SceneManager
const scene = sceneManager.scene; // Use the scene from SceneManager
const camera = sceneManager.createCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Correctly use createCamera

const lightingManager = new LightingManager();
const graphicsEngine = new GraphicsEngine(scene, camera);
const world = new World(scene);

const inputManager = new InputManager(camera, renderer); // Initialize InputManager with camera and renderer
inputManager.init(); // Initialize all input systems

world.init(); // Initialize the world

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    inputManager.update(0.016); // Update with deltaTime
    world.update(); // Update the world
    sceneManager.render();
}

animate();
