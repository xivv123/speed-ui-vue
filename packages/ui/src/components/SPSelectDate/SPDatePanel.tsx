// Components  
import SpIcon from '../icon/Icon'

// Utilities
import { computed, ref } from 'vue'
import { genericComponent, propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'

// 日期工具函数
function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
}

function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? null : date
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export const makeSPDatePanelProps = propsFactory(
  {
    modelValue: [String, null] as PropType<string | null>,
  },
  'SPDatePanel'
)

export const SPDatePanel = genericComponent()({
  name: 'SPDatePanel',

  props: makeSPDatePanelProps(),

  emits: {
    'update:modelValue': (_value: string | null) => true,
  },

  setup(props, { emit }) {
    const selectedDate = computed(() => {
      return props.modelValue ? parseDate(props.modelValue) : null
    })

    const currentViewDate = ref(selectedDate.value || new Date())
    const today = new Date()

    // 计算当前显示月份的信息
    const currentMonth = computed(() => ({
      year: currentViewDate.value.getFullYear(),
      month: currentViewDate.value.getMonth(),
    }))

    // 生成日历日期数组
    const calendarDays = computed(() => {
      const { year, month } = currentMonth.value
      const daysInMonth = new Date(year, month + 1, 0).getDate()
      const firstDayOfMonth = new Date(year, month, 1).getDay()
      
      const days: (number | null)[] = []
      
      // 添加上个月的空白天数
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null)
      }
      
      // 添加当月的日期
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i)
      }
      
      return days
    })

    // 月份导航
    function goToPreviousMonth() {
      const newDate = new Date(currentViewDate.value)
      newDate.setMonth(newDate.getMonth() - 1)
      currentViewDate.value = newDate
    }

    function goToNextMonth() {
      const newDate = new Date(currentViewDate.value)
      newDate.setMonth(newDate.getMonth() + 1)
      currentViewDate.value = newDate
    }

    // 选择日期
    function selectDate(day: number) {
      const { year, month } = currentMonth.value
      const selectedDate = new Date(year, month, day)
      const dateStr = formatDate(selectedDate)
      emit('update:modelValue', dateStr)
    }

    // 检查日期状态
    function getDayClasses(day: number | null) {
      if (!day) return ['sp-date-panel__day', 'sp-date-panel__day--empty']
      
      const { year, month } = currentMonth.value
      const dayDate = new Date(year, month, day)
      const isSelected = selectedDate.value && isSameDay(dayDate, selectedDate.value)
      const isToday = isSameDay(dayDate, today)
      
      return [
        'sp-date-panel__day',
        {
          'sp-date-panel__day--selected': isSelected,
          'sp-date-panel__day--today': isToday,
        }
      ]
    }

    return () => (
      <div class="sp-date-panel">
        {/* 月份导航头部 */}
        <div class="sp-date-panel__header">
          <button
            type="button"
            class="sp-date-panel__nav-button"
            onClick={goToPreviousMonth}
          >
            <SpIcon name="chevronLeft" size="small" />
          </button>
          
          <div class="sp-date-panel__title">
            {currentMonth.value.year}年{currentMonth.value.month + 1}月
          </div>
          
          <button
            type="button"
            class="sp-date-panel__nav-button"
            onClick={goToNextMonth}
          >
            <SpIcon name="chevronRight" size="small" />
          </button>
        </div>

        {/* 星期标题 */}
        <div class="sp-date-panel__weekdays">
          {['日', '一', '二', '三', '四', '五', '六'].map(day => (
            <div key={day} class="sp-date-panel__weekday">
              {day}
            </div>
          ))}
        </div>

        {/* 日期网格 */}
        <div class="sp-date-panel__days">
          {calendarDays.value.map((day, index) => (
            <button
              key={index}
              type="button"
              class={getDayClasses(day)}
              disabled={!day}
              onClick={() => day && selectDate(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    )
  },
})

export type SPDatePanel = InstanceType<typeof SPDatePanel>