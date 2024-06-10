import InputKBM from './InputKBM.js';
import InputController from './InputController.js';
import InputJoystick from './InputJoystick.js';
import InputMidi from './InputMidi.js';
import InputAnalog from './InputAnalog.js';
import Controls from '../../Examples/BasicGame/Controls.js';

class InputManager {
    constructor(camera, renderer) {
        this.camera = camera;
        this.renderer = renderer;
        this.kbm = new InputKBM();
        this.controller = new InputController();
        this.joystick = new InputJoystick();
        this.midi = new InputMidi();
        this.analog = new InputAnalog();
        this.controls = new Controls(camera, renderer, this.kbm); // Pass InputKBM instance
    }

    init() {
        this.kbm.init();
        this.controller.init();
        this.joystick.init();
        this.midi.init();
        this.analog.init();
        this.controls.init();
    }

    update(deltaTime) {
        this.kbm.update(deltaTime);
        this.controller.update(deltaTime);
        this.joystick.update(deltaTime);
        this.midi.update(deltaTime);
        this.analog.update(deltaTime);
        this.controls.update(deltaTime);
    }
}

export default InputManager;
