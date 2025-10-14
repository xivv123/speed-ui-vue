import 'vue'

declare module 'vue' {
  interface ComponentCustomProps {
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
    onPointerdown?: (event: PointerEvent) => void
    onPointerup?: (event: PointerEvent) => void
    onPointermove?: (event: PointerEvent) => void
    onPointercancel?: (event: PointerEvent) => void
    onTouchstart?: (event: TouchEvent) => void
    onTouchmove?: (event: TouchEvent) => void
    onTouchend?: (event: TouchEvent) => void
    onTouchcancel?: (event: TouchEvent) => void
    onBeforeinput?: (event: InputEvent) => void
    onTouchstartPassive?: (event: TouchEvent) => void
    
    // Vue 自定义事件修饰符
    'onClick:capture'?: (event: MouseEvent) => void
    'onMousedown:prevent'?: (event: MouseEvent) => void
    'onMousedown:control'?: (event: MouseEvent) => void
    'onClick:clear'?: (event: MouseEvent) => void
    'onClick:prepend'?: (event: MouseEvent) => void
    'onClick:append'?: (event: MouseEvent) => void
    'onClick:prependInner'?: (event: MouseEvent) => void
    'onClick:appendInner'?: (event: MouseEvent) => void
    
    // 允许任意 on 开头的事件
    [key: `on${string}`]: any
  }
  
  // 扩展 MouseEvent 类型
  interface MouseEvent {
    sourceCapabilities?: {
      firesTouchEvents?: boolean
    }
  }
}
