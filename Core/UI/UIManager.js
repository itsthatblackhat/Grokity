class UIManager {
    constructor() {
        this.debugInfo = document.createElement('div');
        this.debugInfo.style.position = 'absolute';
        this.debugInfo.style.top = '10px';
        this.debugInfo.style.left = '10px';
        this.debugInfo.style.color = 'white';
        document.body.appendChild(this.debugInfo);
    }

    updateDebugInfo(info) {
        this.debugInfo.innerHTML = info;
    }
}

export default UIManager;
