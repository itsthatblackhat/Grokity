// Core/EventManager/EventManager.js
class EventManager {
    constructor() {
        this.listeners = {};
    }

    addEventListener(type, callback) {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    }

    removeEventListener(type, callback) {
        if (!this.listeners[type]) return;

        const index = this.listeners[type].indexOf(callback);
        if (index > -1) {
            this.listeners[type].splice(index, 1);
        }
    }

    dispatchEvent(type, event) {
        if (!this.listeners[type]) return;

        for (const listener of this.listeners[type]) {
            listener(event);
        }
    }
}

export default new EventManager();
