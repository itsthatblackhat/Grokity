// Core/Input/InputKBM.js
class InputKBM {
    constructor() {
        this.keys = {};
        this.mouse = { x: 0, y: 0, buttons: {} };
    }

    init() {
        window.addEventListener('keydown', (e) => this.keys[e.code] = true);
        window.addEventListener('keyup', (e) => this.keys[e.code] = false);

        window.addEventListener('mousedown', (e) => this.mouse.buttons[e.button] = true);
        window.addEventListener('mouseup', (e) => this.mouse.buttons[e.button] = false);
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    isKeyDown(keyCode) {
        return !!this.keys[keyCode];
    }

    isMouseButtonDown(button) {
        return !!this.mouse.buttons[button];
    }

    getMousePosition() {
        return { x: this.mouse.x, y: this.mouse.y };
    }

    update(deltaTime) {
        // Update logic if needed
    }
}

export default InputKBM;
