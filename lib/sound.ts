"use client";

class SoundGenerator {
    audioCtx: AudioContext | null = null;
    masterGain: GainNode | null = null;
    enabled: boolean = true;

    init() {
        if (!this.audioCtx && typeof window !== "undefined") {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
                this.audioCtx = new AudioContextClass();
                this.masterGain = this.audioCtx.createGain();
                this.masterGain.gain.value = 0.3; // Base UI volume
                this.masterGain.connect(this.audioCtx.destination);
            }

            const savedPref = localStorage.getItem("soundEnabled");
            if (savedPref !== null) {
                this.enabled = savedPref === "true";
            }
        }
        if (this.audioCtx && this.audioCtx.state === "suspended") {
            this.audioCtx.resume().catch(() => { });
        }
    }

    toggleSound() {
        this.enabled = !this.enabled;
        if (typeof window !== "undefined") {
            localStorage.setItem("soundEnabled", String(this.enabled));
        }
        if (this.enabled) {
            this.playClick();
        }
        return this.enabled;
    }

    get isEnabled() {
        return this.enabled;
    }

    private playTone(
        type: OscillatorType,
        freqStart: number,
        freqEnd: number | null,
        duration: number,
        volStart: number,
        volEnd: number
    ) {
        if (!this.enabled || !this.audioCtx || !this.masterGain) return;
        try {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            const filter = this.audioCtx.createBiquadFilter();

            filter.type = "lowpass";
            filter.frequency.setValueAtTime(2500, this.audioCtx.currentTime);

            osc.type = type;
            osc.frequency.setValueAtTime(freqStart, this.audioCtx.currentTime);
            if (freqEnd) {
                osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 10), this.audioCtx.currentTime + duration);
            }

            gain.gain.setValueAtTime(volStart, this.audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(Math.max(volEnd, 0.001), this.audioCtx.currentTime + duration);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);

            osc.start();
            osc.stop(this.audioCtx.currentTime + duration);
        } catch (e) { }
    }

    playClick() {
        // Sharp satisfying pop
        this.playTone("sine", 1200, 400, 0.05, 0.5, 0.001);
    }

    playHover() {
        // Soft futuristic digital blip
        this.playTone("triangle", 400, null, 0.05, 0.15, 0.001);
    }

    playScrollStep() {
        // Very subtle low tick
        this.playTone("sine", 150, null, 0.03, 0.06, 0.001);
    }

    playOpen() {
        // Expanding modal sound
        this.playTone("sine", 300, 800, 0.15, 0.3, 0.001);
    }

    playClose() {
        // Collapsing modal sound
        this.playTone("sine", 800, 300, 0.15, 0.3, 0.001);
    }
}

export const soundManager = typeof window !== 'undefined' ? new SoundGenerator() : null;
