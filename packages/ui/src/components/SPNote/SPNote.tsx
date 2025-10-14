// Styles
import './style/SPNote.sass'

// Components
import { SPTextField } from '@/components/SPTextField/SPTextField'
import Icon from '@/components/icon/Icon'

// Utilities & composables
import { computed, onMounted, ref, nextTick, watch } from 'vue'
import { genericComponent, useRender, filterInputAttrs, convertToUnit } from '@/utils'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useDimension } from '@/composables/dimensions'
import { useStack } from '@/composables/stack'
import { useResizable } from '@/composables/resizable'
import { useDraggable } from '@/composables/draggable'

// Props & Types
import { makeSPNoteProps } from './props'
import type { NotePosition, SPNoteSlots } from './types'

// Composables
import { useTitleEditor } from './composable/useTitleEditor'

export const SPNote = genericComponent<SPNoteSlots>()(({
  name: 'SPNote',

  inheritAttrs: false,

  props: makeSPNoteProps(),

  emits: {
    'update:modelValue': (val: string) => true,
    'update:position': (val: NotePosition) => true,
    'update:width': (val: number | string) => true,
    'update:height': (val: number | string) => true,
    'update:title': (val: string) => true,
    'drag:start': (pos: NotePosition) => true,
    'drag:move': (pos: NotePosition) => true,
    'drag:end': (pos: NotePosition) => true,
    'close': () => true,
  },

  setup(props, { attrs, emit, slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const titleModel = useProxiedModel(props as any, 'title')
    const positionProxy = useProxiedModel(props as any, 'position')
    const noteRef = ref<HTMLDivElement>()
    const headerRef = ref<HTMLDivElement>()

    // 标题编辑功能
    const {
      isEditingTitle,
      tempTitle,
      titleInputRef,
      startEditTitle,
      finishEditTitle,
      onTitleKeydown,
    } = useTitleEditor({
      titleModel,
      headerEnabled: props.header,
      onTitleUpdate: (title: string) => emit('update:title', title),
    })

    // resizable composable

    const { dimensionStyles } = useDimension(props)
    const widthModel = useProxiedModel(props as any, 'width')
    const heightModel = useProxiedModel(props as any, 'height')

    // stacking: bring selected note to front
    const isSelected = ref(false)
    const { stackStyles } = useStack(
      computed(() => isSelected.value),
      () => props.zIndex ?? 1000,
      false
    )

    function bringToFront() {
      // bounce selected to refresh z-index
      isSelected.value = false
      nextTick(() => (isSelected.value = true))
    }

    const rootStyles = computed(() => {
      const { x, y } = (positionProxy.value || { x: 0, y: 0 }) as NotePosition
      const size: any = {
        width:
          widthModel.value != null
            ? convertToUnit(widthModel.value as any)
            : (dimensionStyles.value as any).width,
        height:
          heightModel.value != null
            ? convertToUnit(heightModel.value as any)
            : (dimensionStyles.value as any).height,
      }

      return [
        { ...dimensionStyles.value, ...size },
        {
          position: 'absolute',
          left: `${x}px`,
          top: `${y}px`,
        },
        attrs.style as any,
      ]
    })

    function onInput(e: Event) {
      const el = e.target as HTMLTextAreaElement
      model.value = el.value
    }

    function handleClose() {
      emit('close')
    }

    const draggable = useDraggable({
      handle: headerRef,
      position: positionProxy as any,
      enabled: computed(() => props.draggable && !resizable.isResizing.value),
      onStart: () => {
        bringToFront()
        const { x, y } = positionProxy.value as NotePosition
        emit('drag:start', { x, y })
      },
      onMove: pos => emit('drag:move', pos as any),
      onEnd: pos => emit('drag:end', pos as any),
    })

    const resizable = useResizable({
      el: noteRef,
      position: positionProxy as any,
      width: widthModel as any,
      height: heightModel as any,
      enabled: computed(() => props.resizable),
      minWidth: props.minWidth as any,
      minHeight: props.minHeight as any,
      maxWidth: props.maxWidth as any,
      maxHeight: props.maxHeight as any,
      onStart: () => bringToFront(),
    })

    watch(widthModel, v => emit('update:width', v as any))
    watch(heightModel, v => emit('update:height', v as any))

    onMounted(() => {
      // Attach start handlers on header area
      // initialize size if not provided
      const rect = noteRef.value?.getBoundingClientRect()
      if (widthModel.value == null && rect) widthModel.value = rect.width
      if (heightModel.value == null && rect) heightModel.value = rect.height
    })

    useRender(() => {
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      return (
        <div
          ref={noteRef}
          class={[
            'sp-note',
            { 'sp-note--dragging': draggable.isDragging.value, 'sp-note--resizing': resizable.isResizing.value },
            attrs.class,
          ]}
          style={[rootStyles.value, stackStyles.value]}
          onMousedown={() => bringToFront()}
          {...rootAttrs}
        >
          {props.header && (
            <div ref={headerRef} class="sp-note__header">
              <div class="sp-note__title">
                {isEditingTitle.value ? (
                  <SPTextField
                    ref={titleInputRef}
                    v-model={tempTitle.value}
                    variant="plain"
                    hideDetails
                    placeholder="输入标题..."
                    class="sp-note__title-input"
                    onBlur={finishEditTitle}
                    onKeydown={onTitleKeydown}
                    onMousedown:control={(e: MouseEvent) => {
                      // 阻止SPTextField的默认mousedown行为，允许正常的光标定位
                      e.stopPropagation()
                    }}
                  />
                ) : (
                  <span
                    class="sp-note__title-text"
                    onClick={startEditTitle}
                  >
                    {titleModel.value || '点击编辑标题'}
                  </span>
                )}
              </div>
              <div class="sp-note__actions">
                {slots.actions?.()}
                {props.closable && (
                  <Icon
                    name="Close"
                    size={16}
                    clickable
                    class="sp-note__close-btn"
                    onClick={handleClose}
                  />
                )}
              </div>
            </div>
          )}
          <div class="sp-note__body">
            <textarea
              class="sp-note__textarea"
              value={model.value}
              placeholder={props.placeholder}
              onInput={onInput}
              onFocus={() => bringToFront()}
              {...inputAttrs}
            />
          </div>

          {props.resizable && resizable.renderHandles()}
        </div>
      )
    })

    return {}
  },
}))

export type SPNote = InstanceType<typeof SPNote>
