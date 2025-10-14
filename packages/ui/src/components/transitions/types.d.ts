// Extend HTMLElement to include custom transition properties
declare global {
  interface HTMLElement {
    _transitionInitialStyles?: {
      position: string
      top: string
      left: string
      width: string
      height: string
    }
  }
}

export {}
