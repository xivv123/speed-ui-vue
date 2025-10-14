// Styles
import './SPTour.scss'

// Components
import { SPOverlay } from '@/components/SPOverlay'
import { SPCard } from '@/components/SPCard'
import { SPTourMask } from './SPTourMask'
import { SPTourHeader } from './SPTourHeader'
import { SPTourBody } from './SPTourBody'
import { SPTourIndicator } from './SPTourIndicator'
import { SPTourActions } from './SPTourActions'

// Composables
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useScopeId } from '@/composables/scopeId'
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { useRounded } from '@/composables/rounded'
import { useElevation } from '@/composables/elevation'
import { provideTour } from './composables'
import { makeSPTourProps } from './props'
import { useTourSteps } from './useTourSteps'
import { useTourMask } from './useTourMask'
import { useTourPosition } from './useTourPosition'

// Utilities
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  toRef,
  watch,
  Teleport,
} from 'vue'
import { genericComponent, useRender } from '@/utils'

// Types
import type { OverlaySlots } from '@/components/SPOverlay/SPOverlay'
import type { TourStep } from './types'

export const SPTour = genericComponent<OverlaySlots>()({
  name: 'SPTour',

  props: makeSPTourProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
    'update:current': (value: number) => true,
    change: (current: number) => true,
    finish: () => true,
    skip: () => true,
    close: () => true,
    'before-enter': (step: TourStep, index: number) => true,
    'before-leave': (step: TourStep, index: number) => true,
  },

  setup(props, { emit, slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const currentStep = useProxiedModel(props, 'current')
    const { scopeId } = useScopeId()

    const overlay = ref<InstanceType<typeof SPOverlay>>()
    const tourRef = ref<HTMLElement>()

    const { stepsFromSlots, allSteps, currentStepData: _currentStepData } = useTourSteps(
      slots,
      toRef(props, 'steps') as any
    )
    const currentStepRef = _currentStepData(currentStep)

    const {
      targetEl,
      maskPath,
      cleanupHighlight,
      positionUpdateTrigger,
      isPositioning,
      frozenPosition,
      scheduleUpdate,
      updateMask,
      cleanup: cleanupMask,
    } = useTourMask({
      isActive,
      targetPadding: () => parseInt(String(props.targetPadding)),
      targetRadius: () => parseInt(String(props.targetRadius)),
      highlightTarget: () => props.highlightTarget,
      targetClass: () => props.targetClass,
      scrollSmooth: () => props.scrollSmooth,
      smoothWait: () => props.smoothWait,
    })

    const { cardPosition } = useTourPosition({
      tourRef,
      targetEl,
      currentStepData: computed(() => currentStepRef.value),
      positionUpdateTrigger,
      frozenPosition,
    })

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => 'surface')
    const { textColorClasses, textColorStyles } = useTextColor(() => 'on-surface')
    const { roundedClasses } = useRounded(props)
    const { elevationClasses } = useElevation(props)

    const isFirst = computed(() => currentStep.value === 0)
    const isLast = computed(() => currentStep.value === allSteps.value.length - 1)

    const handleStepChange = async (oldStep?: number) => {
      const step = currentStepRef.value
      if (!step) return
      frozenPosition.value = { ...cardPosition.value }
      isPositioning.value = true
      try {
        const __behavior =
          step.scrollIntoView === false
            ? null
            : ((step.scrollOptions?.behavior as ScrollBehavior) || (props.scrollSmooth ? 'smooth' : 'auto'))
        if (__behavior !== 'smooth') {
          frozenPosition.value = null
          isPositioning.value = false
        }
      } catch (error) {
        // Ignore errors from scrollIntoView if element is not available
        if (process.env.NODE_ENV === 'development') {
          console.warn('Failed to scroll to target:', error)
        }
      }

      if (typeof oldStep === 'number' && allSteps.value[oldStep]) {
        const prevStep = allSteps.value[oldStep]
        emit('before-leave', prevStep, oldStep)
        prevStep.onLeave?.(prevStep, oldStep)
      }

      emit('before-enter', step, currentStep.value)
      step.onEnter?.(step, currentStep.value)

      await nextTick()
      updateMask(currentStepRef.value)

      if (step.scrollIntoView === false) {
        requestAnimationFrame(() => {
          frozenPosition.value = null
          positionUpdateTrigger.value++
          requestAnimationFrame(() => {
            isPositioning.value = false
          })
        })
      }
    }

    const goTo = (step: number) => {
      if (step >= 0 && step < allSteps.value.length) {
        const oldStep = currentStep.value
        currentStep.value = step
        emit('change', step)
        handleStepChange(oldStep)
      }
    }

    const handleNext = () => {
      if (isLast.value) {
        handleFinish()
      } else {
        const oldStep = currentStep.value
        currentStep.value = currentStep.value + 1
        emit('change', currentStep.value)
        handleStepChange(oldStep)
      }
    }

    const handlePrev = () => {
      if (!isFirst.value) {
        const oldStep = currentStep.value
        currentStep.value = currentStep.value - 1
        emit('change', currentStep.value)
        handleStepChange(oldStep)
      }
    }

    const handleFinish = () => {
      cleanupHighlight.value?.()
      positionUpdateTrigger.value = 0
      isPositioning.value = false
      frozenPosition.value = null
      emit('finish')
      isActive.value = false
    }

    const handleSkip = () => {
      cleanupHighlight.value?.()
      positionUpdateTrigger.value = 0
      isPositioning.value = false
      frozenPosition.value = null
      emit('skip')
      isActive.value = false
    }

    const handleClose = () => {
      cleanupHighlight.value?.()
      positionUpdateTrigger.value = 0
      isPositioning.value = false
      frozenPosition.value = null
      emit('close')
      isActive.value = false
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (!props.keyboard || !isActive.value) return
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          handlePrev()
          break
        case 'ArrowRight':
        case 'ArrowDown':
        case 'Enter':
          e.preventDefault()
          handleNext()
          break
        case 'Escape':
          e.preventDefault()
          handleClose()
          break
      }
    }

    provideTour({
      currentStep,
      isActive,
      steps: toRef(() => allSteps.value),
      next: handleNext,
      prev: handlePrev,
      finish: handleFinish,
      skip: handleSkip,
      close: handleClose,
      goTo,
    })

    watch(
      currentStep,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          handleStepChange(oldVal)
        }
      },
      { immediate: true }
    )

    watch(isActive, newVal => {
      if (newVal) {
        isPositioning.value = true
        frozenPosition.value = null
        nextTick(() => {
          updateMask(currentStepRef.value)
          positionUpdateTrigger.value++
        })
      } else {
        cleanupHighlight.value?.()
        isPositioning.value = false
        frozenPosition.value = null
      }
    })

    const handleResize = () => {
      scheduleUpdate()
    }

    const handleScroll = () => {
      scheduleUpdate()
    }

    onMounted(() => {
      window.addEventListener('resize', handleResize)
      window.addEventListener('scroll', handleScroll, true)
      if (props.keyboard) {
        window.addEventListener('keydown', handleKeydown)
      }
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll, true)
      if (props.keyboard) {
        window.removeEventListener('keydown', handleKeydown)
      }
      cleanupHighlight.value?.()
      clearTimeout((handleScroll as any).timer)
      cleanupMask()
    })

    useRender(() => {
      if (!isActive.value || !currentStepRef.value) return <></>
      const step = currentStepRef.value
      const position = cardPosition.value
      return (
        <Teleport to="body">
          <SPTourMask mask={props.mask as any} zIndex={props.zIndex} path={maskPath.value} />

          <div
            ref={tourRef}
            class={[
              'sp-tour__content',
              backgroundColorClasses.value,
              textColorClasses.value,
              roundedClasses.value,
              elevationClasses.value,
              { 'sp-tour__content--positioning': isPositioning.value },
            ]}
            style={[
              backgroundColorStyles.value,
              textColorStyles.value,
              {
                position: 'fixed',
                zIndex: props.zIndex + 1,
                maxWidth: '400px',
                minWidth: '300px',
                opacity: isPositioning.value ? 0 : 1,
                transition: 'opacity 0.2s ease-out, transform 0.3s ease-out',
                ...position,
              },
            ]}
          >
            <SPCard variant="elevated" class="sp-tour__card">
              <SPTourHeader
                title={step.title}
                closable={props.closable}
                closeIcon={props.closeIcon}
                onClose={handleClose}
              />

              <SPTourBody description={step.description}>
                {slots.default?.({
                  step,
                  current: currentStep.value,
                  isFirst: isFirst.value,
                  isLast: isLast.value,
                  total: allSteps.value.length,
                })}
              </SPTourBody>

              <div class="sp-tour__footer">
                {props.showIndicator && (
                  <SPTourIndicator
                    current={currentStep.value}
                    total={allSteps.value.length}
                    onSelect={goTo}
                  />
                )}

                <SPTourActions
                  isFirst={isFirst.value}
                  isLast={isLast.value}
                  type={props.type}
                  skipLabel={props.skipText}
                  prevLabel={step.prevText || props.prevText}
                  nextLabel={step.nextText || props.nextText}
                  finishLabel={props.finishText}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  onSkip={handleSkip}
                />
              </div>
            </SPCard>
          </div>
        </Teleport>
      )
    })

    return forwardRefs(
      {
        isActive,
        currentStep,
        next: handleNext,
        prev: handlePrev,
        finish: handleFinish,
        skip: handleSkip,
        close: handleClose,
        goTo,
      },
      overlay
    )
  },
})

export type SPTour = InstanceType<typeof SPTour>
