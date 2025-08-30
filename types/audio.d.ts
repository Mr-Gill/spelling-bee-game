declare module '*.mp3' {
  const src: string;
  export default src;
}

declare module './utils/audio' {
  export class AudioManager {
    constructor();
    play(name: string): void;
    mute(): void;
    unmute(): void;
  }
}
