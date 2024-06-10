// Core/UI/UIManager.js
class UIManager {
    constructor() {
        this.elements = {};
    }

    addElement(name, element) {
        this.elements[name] = element;
        document.body.appendChild(element);
    }

    getElement(name) {
        return this.elements[name];
    }

    removeElement(name) {
        const element = this.elements[name];
        if (element) {
            document.body.removeChild(element);
            delete this.elements[name];
        }
    }
}

export default new UIManager();
