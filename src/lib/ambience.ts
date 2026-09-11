/**
 * The sound of the hero.
 *
 * There is no good stock loop of an Indian night train that is small enough
 * to ship and long enough not to betray its seam, so this synthesises one:
 * a low rail rumble, the double knock of bogies over joints, a thin layer of
 * air, and — rarely, far away — a horn. It is deliberately quiet, it never
 * starts on its own, and it is 2kB instead of 2MB.
 *
 * Drop an `src` into `createAmbience({ src })` and a real recording takes over
 * instead; nothing else in the app has to change.
 */

type Options = {
  /** Optional path to a real ambience recording; overrides the synth. */
  src?: string;
  /** Peak master gain. Restraint is the point — this stays low. */
  volume?: number;
};

export type Ambience = {
  enable: () => Promise<void>;
  disable: () => void;
  dispose: () => void;
  readonly supported: boolean;
};

const AudioCtor = (): typeof AudioContext | undefined =>
  typeof window === 'undefined'
    ? undefined
    : window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

export function createAmbience({ src, volume = 0.16 }: Options = {}): Ambience {
  if (src) return fileAmbience(src, volume);

  const Ctor = AudioCtor();
  if (!Ctor) return noopAmbience();

  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let timer: number | null = null;
  let nextJoint = 0;
  let nextHorn = 0;
  const sources: Array<AudioScheduledSourceNode> = [];

  const noiseBuffer = (context: AudioContext, seconds = 3) => {
    const buf = context.createBuffer(1, context.sampleRate * seconds, context.sampleRate);
    const data = buf.getChannelData(0);
    // Brown-ish noise: integrated white, kept in range. Warmer than white.
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.019 * white) / 1.019;
      data[i] = last * 3.2;
    }
    return buf;
  };

  const build = (context: AudioContext) => {
    const out = context.createGain();
    out.gain.value = 0;
    out.connect(context.destination);

    // --- rail rumble ------------------------------------------------
    const rumble = context.createBufferSource();
    rumble.buffer = noiseBuffer(context, 4);
    rumble.loop = true;
    const rumbleFilter = context.createBiquadFilter();
    rumbleFilter.type = 'lowpass';
    rumbleFilter.frequency.value = 165;
    rumbleFilter.Q.value = 0.6;
    const rumbleGain = context.createGain();
    rumbleGain.gain.value = 0.85;
    rumble.connect(rumbleFilter).connect(rumbleGain).connect(out);

    // Slow breathing on the filter, so the rumble never sits still.
    const lfo = context.createOscillator();
    lfo.frequency.value = 0.06;
    const lfoAmount = context.createGain();
    lfoAmount.gain.value = 42;
    lfo.connect(lfoAmount).connect(rumbleFilter.frequency);

    // --- air over the window ----------------------------------------
    const air = context.createBufferSource();
    air.buffer = noiseBuffer(context, 3);
    air.loop = true;
    const airFilter = context.createBiquadFilter();
    airFilter.type = 'bandpass';
    airFilter.frequency.value = 1450;
    airFilter.Q.value = 0.5;
    const airGain = context.createGain();
    airGain.gain.value = 0.055;
    air.connect(airFilter).connect(airGain).connect(out);

    // --- a held low note under everything ---------------------------
    const drone = context.createOscillator();
    drone.type = 'sine';
    drone.frequency.value = 55;
    const drone2 = context.createOscillator();
    drone2.type = 'sine';
    drone2.frequency.value = 82.8;
    const droneGain = context.createGain();
    droneGain.gain.value = 0.035;
    drone.connect(droneGain);
    drone2.connect(droneGain);
    droneGain.connect(out);

    [rumble, air, lfo, drone, drone2].forEach((node) => {
      node.start();
      sources.push(node);
    });

    return out;
  };

  /** One bogie crossing one rail joint. */
  const knock = (context: AudioContext, dest: GainNode, at: number, strength: number) => {
    const burst = context.createBufferSource();
    const buf = context.createBuffer(1, Math.floor(context.sampleRate * 0.09), context.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / data.length;
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 6);
    }
    burst.buffer = buf;

    const band = context.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.value = 240 + Math.random() * 260;
    band.Q.value = 1.1;

    const g = context.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(strength, at + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.22);

    burst.connect(band).connect(g).connect(dest);
    burst.start(at);
    burst.stop(at + 0.3);
  };

  /** A horn, a long way off. */
  const horn = (context: AudioContext, dest: GainNode, at: number) => {
    const g = context.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(0.05, at + 0.5);
    g.gain.setValueAtTime(0.05, at + 1.1);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 2.6);

    const soften = context.createBiquadFilter();
    soften.type = 'lowpass';
    soften.frequency.value = 850;
    g.connect(soften).connect(dest);

    [312, 396, 468].forEach((freq, i) => {
      const osc = context.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq + (Math.random() - 0.5) * 3;
      const partial = context.createGain();
      partial.gain.value = [1, 0.55, 0.3][i];
      osc.connect(partial).connect(g);
      osc.start(at);
      osc.stop(at + 2.8);
    });
  };

  const schedule = () => {
    if (!ctx || !master) return;
    const horizon = ctx.currentTime + 1.2;

    while (nextJoint < horizon) {
      // Bogies cross in pairs; carriages follow each other unevenly.
      knock(ctx, master, nextJoint, 0.16 + Math.random() * 0.1);
      knock(ctx, master, nextJoint + 0.19 + Math.random() * 0.03, 0.11 + Math.random() * 0.07);
      nextJoint += 1.25 + Math.random() * 0.5;
    }

    if (nextHorn < horizon) {
      horn(ctx, master, nextHorn);
      nextHorn = ctx.currentTime + 42 + Math.random() * 50;
    }
  };

  const enable = async () => {
    if (!ctx) {
      ctx = new Ctor();
      master = build(ctx);
      nextJoint = ctx.currentTime + 0.4;
      nextHorn = ctx.currentTime + 14 + Math.random() * 20;
    }
    if (ctx.state === 'suspended') await ctx.resume();
    master!.gain.cancelScheduledValues(ctx.currentTime);
    master!.gain.setValueAtTime(master!.gain.value, ctx.currentTime);
    master!.gain.linearRampToValueAtTime(volume, ctx.currentTime + 2.4);
    if (timer === null) timer = window.setInterval(schedule, 260);
    schedule();
  };

  const disable = () => {
    if (!ctx || !master) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.9);
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  };

  const dispose = () => {
    if (timer !== null) window.clearInterval(timer);
    timer = null;
    sources.forEach((node) => {
      try {
        node.stop();
      } catch {
        /* already stopped */
      }
    });
    sources.length = 0;
    ctx?.close().catch(() => undefined);
    ctx = null;
    master = null;
  };

  return { enable, disable, dispose, supported: true };
}

function fileAmbience(src: string, volume: number): Ambience {
  const el = new Audio(src);
  el.loop = true;
  el.preload = 'none';
  el.volume = 0;
  let fade: number | null = null;

  const ramp = (to: number, ms: number, then?: () => void) => {
    if (fade !== null) window.clearInterval(fade);
    const from = el.volume;
    const started = performance.now();
    fade = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - started) / ms);
      el.volume = from + (to - from) * t;
      if (t === 1) {
        window.clearInterval(fade!);
        fade = null;
        then?.();
      }
    }, 40);
  };

  return {
    supported: true,
    enable: async () => {
      await el.play();
      ramp(volume, 2400);
    },
    disable: () => ramp(0, 900, () => el.pause()),
    dispose: () => {
      if (fade !== null) window.clearInterval(fade);
      el.pause();
      el.src = '';
    },
  };
}

function noopAmbience(): Ambience {
  return {
    supported: false,
    enable: async () => undefined,
    disable: () => undefined,
    dispose: () => undefined,
  };
}
