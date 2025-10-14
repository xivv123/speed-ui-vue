/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.scss' {
  const content: Record<string, string>
  export default content
}

declare module '*.css' {
  const content: Record<string, string>
  export default content
}

// JSX 类型声明
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
      button: any
      span: any
      div: any
      label: any
      input: any
    }
    interface ElementAttributesProperty {
      $props: {}
    }
  }
}

// Augment Vue JSX HTML attributes so TSX accepts newer attributes
declare module 'vue' {
  interface HTMLAttributes {
    inputmode?: string
  }
  interface InputHTMLAttributes extends HTMLAttributes {
    inputmode?: string
    inputMode?: string
  }
}
