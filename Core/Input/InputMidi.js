// Core/Input/InputMidi.js
class InputMidi {
    constructor() {
        this.midiAccess = null;
        this.inputs = [];
    }

    async init() {
        try {
            this.midiAccess = await navigator.requestMIDIAccess();
            this.midiAccess.inputs.forEach(input => {
                this.inputs.push(input);
                input.onmidimessage = this.handleMidiMessage;
            });
        } catch (err) {
            console.error('Failed to get MIDI access', err);
        }
    }

    handleMidiMessage(event) {
        // Handle MIDI message
        console.log(event.data);
    }

    update(deltaTime) {
        // Update MIDI state
    }
}

export default InputMidi;
