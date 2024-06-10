// Core/Input/InputController.js
class InputController {
    constructor() {
        this.controllers = {};
    }

    init() {
        window.addEventListener("gamepadconnected", (e) => {
            this.controllers[e.gamepad.index] = e.gamepad;
        });
        window.addEventListener("gamepaddisconnected", (e) => {
            delete this.controllers[e.gamepad.index];
        });
    }

    update(deltaTime) {
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        for (let i = 0; i < gamepads.length; i++) {
            if (gamepads[i]) {
                this.controllers[gamepads[i].index] = gamepads[i];
            }
        }
    }

    getButtonState(gamepadIndex, buttonIndex) {
        const gamepad = this.controllers[gamepadIndex];
        return gamepad ? gamepad.buttons[buttonIndex].pressed : false;
    }

    getAxisState(gamepadIndex, axisIndex) {
        const gamepad = this.controllers[gamepadIndex];
        return gamepad ? gamepad.axes[axisIndex] : 0;
    }
}

export default InputController;
