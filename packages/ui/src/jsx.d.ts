// Vue JSX 类型声明
import { DefineComponent, VNode } from 'vue'

// 声明 vue/jsx-runtime 模块
declare module 'vue/jsx-runtime' {
  export function jsx(type: any, props: any, key?: any): VNode
  export function jsxs(type: any, props: any, key?: any): VNode
  export function Fragment(props: { children?: any }): VNode
  export { jsx as jsxDEV, jsxs as jsxsDEV }
}

// 扩展 @vue/runtime-dom 以支持所有事件
declare module '@vue/runtime-dom' {
  interface HTMLAttributes {
    // 标准 DOM 事件
    onBlur?: (event: FocusEvent) => void
    onFocus?: (event: FocusEvent) => void
    onFocusin?: (event: FocusEvent) => void
    onFocusout?: (event: FocusEvent) => void
    onClick?: (event: MouseEvent) => void
    onDblclick?: (event: MouseEvent) => void
    onMousedown?: (event: MouseEvent) => void
    onMouseup?: (event: MouseEvent) => void
    onMousemove?: (event: MouseEvent) => void
    onMouseenter?: (event: MouseEvent) => void
    onMouseleave?: (event: MouseEvent) => void
    onMouseover?: (event: MouseEvent) => void
    onMouseout?: (event: MouseEvent) => void
    onKeydown?: (event: KeyboardEvent) => void
    onKeyup?: (event: KeyboardEvent) => void
    onKeypress?: (event: KeyboardEvent) => void
    onInput?: (event: Event) => void
    onChange?: (event: Event) => void
    onSubmit?: (event: Event) => void
    onScroll?: (event: Event) => void
    onWheel?: (event: WheelEvent) => void
    onContextmenu?: (event: MouseEvent) => void
    
    // 自定义事件支持
    [key: `on${string}`]: any
  }
}

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends DefineComponent {}
    interface ElementAttributesProperty {
      $props: {}
    }
    
    // 通用事件处理器类型
    interface DOMAttributes {
      // 标准 DOM 事件
      onBlur?: (event: FocusEvent) => void
      onFocus?: (event: FocusEvent) => void
      onClick?: (event: MouseEvent) => void
      onDblclick?: (event: MouseEvent) => void
      onMousedown?: (event: MouseEvent) => void
      onMouseup?: (event: MouseEvent) => void
      onMousemove?: (event: MouseEvent) => void
      onMouseenter?: (event: MouseEvent) => void
      onMouseleave?: (event: MouseEvent) => void
      onMouseover?: (event: MouseEvent) => void
      onMouseout?: (event: MouseEvent) => void
      onKeydown?: (event: KeyboardEvent) => void
      onKeyup?: (event: KeyboardEvent) => void
      onKeypress?: (event: KeyboardEvent) => void
      onInput?: (event: Event) => void
      onChange?: (event: Event) => void
      onSubmit?: (event: Event) => void
      onScroll?: (event: Event) => void
      onWheel?: (event: WheelEvent) => void
      onDrag?: (event: DragEvent) => void
      onDrop?: (event: DragEvent) => void
      onDragstart?: (event: DragEvent) => void
      onDragend?: (event: DragEvent) => void
      onDragenter?: (event: DragEvent) => void
      onDragleave?: (event: DragEvent) => void
      onDragover?: (event: DragEvent) => void
      onTouchstart?: (event: TouchEvent) => void
      onTouchmove?: (event: TouchEvent) => void
      onTouchend?: (event: TouchEvent) => void
      onTouchcancel?: (event: TouchEvent) => void
      onPointerdown?: (event: PointerEvent) => void
      onPointerup?: (event: PointerEvent) => void
      onPointermove?: (event: PointerEvent) => void
      onPointerenter?: (event: PointerEvent) => void
      onPointerleave?: (event: PointerEvent) => void
      onPointerover?: (event: PointerEvent) => void
      onPointerout?: (event: PointerEvent) => void
      onPointercancel?: (event: PointerEvent) => void
      onContextmenu?: (event: MouseEvent) => void
      onAnimationstart?: (event: AnimationEvent) => void
      onAnimationend?: (event: AnimationEvent) => void
      onAnimationiteration?: (event: AnimationEvent) => void
      onTransitionend?: (event: TransitionEvent) => void
      
      // Vue 特有的事件修饰符支持
      'onClick:capture'?: (event: MouseEvent) => void
      'onMousedown:prevent'?: (event: MouseEvent) => void
      
      // 自定义事件（使用 any 以支持任意自定义事件）
      [key: `on${string}`]: any
    }
    
    interface IntrinsicElements {
      [elem: string]: any & DOMAttributes
      label: any & DOMAttributes
      span: any & DOMAttributes
      div: any & DOMAttributes
      button: any & DOMAttributes
      input: any & DOMAttributes
      textarea: any & DOMAttributes
      select: any & DOMAttributes
      form: any & DOMAttributes
      a: any & DOMAttributes
      img: any & DOMAttributes
      svg: any & DOMAttributes
      path: any & DOMAttributes
    }
  }

  // 扩展 HTMLElement 类型以支持自定义属性
  interface HTMLElement {
    _observe?: Record<
      number,
      {
        init: boolean
        observer: IntersectionObserver
      }
    >
  }
}

export {}
