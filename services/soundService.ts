
export class SoundService {
  private context: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.context) {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.context.state === 'suspended') {
      this.context.resume().catch(() => {});
    }
    return this.context;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  getMuteStatus() {
    return this.isMuted;
  }

  playFlip() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        // Soft click/bamboo sound
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
        console.error("Audio play failed", e);
    }
  }

  playMatch() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
        const now = ctx.currentTime;
        // Major triad (C Major)
        [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.value = freq;
        
        gain.gain.setValueAtTime(0.05, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.4);
        });
    } catch (e) {}
  }

  playError() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        // Low dissonance buzzer
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.2);

        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.2);

        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  }

  playWin() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
        const now = ctx.currentTime;
        // Victory Fanfare
        const notes = [523.25, 523.25, 523.25, 659.25, 783.99, 1046.50];
        const times = [0, 0.15, 0.3, 0.45, 0.6, 0.8];
        const lengths = [0.1, 0.1, 0.1, 0.15, 0.15, 0.6];

        notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'triangle';
        osc.frequency.value = freq;
        
        const startTime = now + times[i];
        gain.gain.setValueAtTime(0.1, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + lengths[i]);

        osc.start(startTime);
        osc.stop(startTime + lengths[i]);
        });
    } catch (e) {}
  }
}

export const soundService = new SoundService();
