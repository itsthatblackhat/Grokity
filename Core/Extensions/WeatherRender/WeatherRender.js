import ThunderstormEffect from './ThunderstormEffect.js';
import WeatherManager from './WeatherManager.js';

class WeatherRender {
    constructor(scene, latitude, longitude) {
        this.scene = scene;
        this.latitude = latitude;
        this.longitude = longitude;
        this.weatherManager = new WeatherManager();
        this.weatherEffect = null;
    }

    async initialize() {
        try {
            const weatherData = await this.weatherManager.initialize(this.latitude, this.longitude);
            console.log('Weather data:', weatherData);

            // Define a position for the weather effect
            const position = new THREE.Vector3(0, 50, 0); // Example position

            this.weatherEffect = new ThunderstormEffect(this.scene, position);
            this.scene.add(this.weatherEffect);
            console.log('Thunderstorm effect started at position', this.weatherEffect.position);
        } catch (error) {
            console.error('Error initializing weather render:', error);
        }
    }

    update() {
        if (this.weatherEffect) {
            this.weatherEffect.update();
        }
    }
}

export default WeatherRender;
