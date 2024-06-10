export default class CoordinatesManager {
    constructor(camera) {
        this.camera = camera;
        this.coordinatesElement = document.getElementById('coordinates');
    }

    updateCoordinates() {
        if (this.coordinatesElement) {
            const x = this.camera.position.x.toFixed(2);
            const y = this.camera.position.y.toFixed(2);
            const z = this.camera.position.z.toFixed(2);
            this.coordinatesElement.innerHTML = `Coordinates: X=${x}, Y=${y}, Z=${z}`;
        } else {
            console.error("Coordinates element not found");
        }
    }
}
