import * as THREE from 'three';
import RainEffect from './RainEffect.js';
import SnowEffect from './SnowEffect.js';
import ThunderstormEffect from './ThunderstormEffect.js';

class WeatherEffect {
    constructor(scene) {
        this.scene = scene;
        this.currentEffect = null;
    }

    createRainEffect() {
        this.clearEffects();
        this.currentEffect = new RainEffect(this.scene);
    }

    createSnowEffect() {
        this.clearEffects();
        this.currentEffect = new SnowEffect(this.scene);
    }

    createThunderstormEffect() {
        this.clearEffects();
        this.currentEffect = new ThunderstormEffect(this.scene);
    }

    clearEffects() {
        if (this.currentEffect) {
            this.currentEffect.clear();
            this.currentEffect = null;
        }
    }

    updateEffects() {
        if (this.currentEffect) {
            this.currentEffect.update();
        }
    }
}

export default WeatherEffect;
