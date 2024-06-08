class InputManager {
    constructor() {
        this.keys = {};
        this.mouse = {
            x: 0,
            y: 0,
            click: false
        };

        window.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
        });

        window.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
        });

        window.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;
        });

        window.addEventListener('mousedown', () => {
            this.mouse.click = true;
        });

        window.addEventListener('mouseup', () => {
            this.mouse.click = false;
        });

        window.addEventListener('touchstart', (event) => {
            this.mouse.click = true;
            this.mouse.x = event.touches[0].clientX;
            this.mouse.y = event.touches[0].clientY;
        });

        window.addEventListener('touchmove', (event) => {
            this.mouse.x = event.touches[0].clientX;
            this.mouse.y = event.touches[0].clientY;
        });

        window.addEventListener('touchend', () => {
            this.mouse.click = false;
        });
    }

    isKeyPressed(key) {
        return this.keys[key] || false;
    }

    getMousePosition() {
        return { x: this.mouse.x, y: this.mouse.y };
    }

    isMouseClicked() {
        return this.mouse.click;
    }
}

export default InputManager;
