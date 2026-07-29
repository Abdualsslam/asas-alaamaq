export {};

declare global {
  interface Window {
    heroVideoLoaded?: boolean;
    preloaderFinished?: boolean;
  }
}
