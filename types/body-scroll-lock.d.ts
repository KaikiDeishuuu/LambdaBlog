declare module 'body-scroll-lock' {
  export function disableBodyScroll(
    targetElement: HTMLElement,
    options?: { reserveScrollBarGap?: boolean }
  ): void
  export function enableBodyScroll(targetElement: HTMLElement): void
  export function clearAllBodyScrollLocks(): void
}
