export class UIManager {
    constructor() {
        this.uiElements = [];
    }

    addUIElement(element) {
        this.uiElements.push(element);
        document.body.appendChild(element);
    }

    removeUIElement(element) {
        const index = this.uiElements.indexOf(element);
        if (index > -1) {
            this.uiElements.splice(index, 1);
            document.body.removeChild(element);
        }
    }

    update() {
        // Update UI elements if needed
    }
}
