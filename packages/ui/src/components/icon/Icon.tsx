import { computed, defineComponent } from 'vue'
import { useIcon } from '../../composables/icons'
import {
  // 基础图标
  Search,
  Close,
  CloseOutline,
  CloseCircle,
  Checkmark,
  CheckmarkOutline,
  CheckmarkCircle,
  Add,
  AddOutline,
  Remove,
  RemoveOutline,

  // 眼睛图标
  Eye,
  EyeOutline,
  EyeOff,
  EyeOffOutline,

  // 箭头图标
  ArrowForward,
  ArrowBack,
  ArrowUp,
  ArrowDown,
  ChevronForward,
  ChevronBack,
  ChevronUp,
  ChevronDown,

  // 位置图标
  Location,
  LocationOutline,

  // 刷新图标
  Refresh,
  RefreshOutline,

  // 设置图标
  Settings,
  SettingsOutline,

  // 用户图标
  Person,
  PersonOutline,

  // 通知图标
  Notifications,
  NotificationsOutline,

  // 心形图标
  Heart,
  HeartOutline,

  // 星形图标
  Star,
  StarOutline,

  // 点赞图标
  ThumbsUp,
  ThumbsUpOutline,

  // 文件图标
  Document,
  DocumentOutline,
  Folder,
  FolderOutline,

  // 编辑图标
  Create,
  CreateOutline,
  Trash,
  TrashOutline,

  // 媒体图标
  Play,
  PlayOutline,
  Pause,
  PauseOutline,
  Stop,
  StopOutline,

  // 网络图标
  Wifi,
  WifiOutline,
  Cloud,
  CloudOutline,

  // 其他常用图标
  Home,
  HomeOutline,
  Menu,
  MenuOutline,
  Grid,
  GridOutline,
  List,
  ListOutline,
  Calendar,
  CalendarOutline,
  Time,
  TimeOutline,
  Mail,
  MailOutline,
  Call,
  CallOutline,
  Camera,
  CameraOutline,
  Image,
  ImageOutline,
  Download,
  DownloadOutline,
  Share,
  ShareOutline,
  Copy,
  CopyOutline,
  Cut,
  CutOutline,
  Save,
  SaveOutline,
  Print,
  PrintOutline,
  Filter,
  FilterOutline,
  Warning,
  WarningOutline,
  Information,
  InformationOutline,
  Help,
  HelpOutline,
  LockClosed,
  LockOpen,
  Key,
  KeyOutline,
} from '@vicons/ionicons5'

interface IconProps {
  // 图标名称
  name: string
  // 图标大小
  size?: string | number
  // 图标颜色
  color?: string
  // 是否可点击
  clickable?: boolean
  // 是否禁用
  disabled?: boolean
  // 自定义类名
  class?: string | string[] | Record<string, boolean>
  // 自定义样式
  style?: string | Record<string, any>
}

interface IconEmits {
  click: [event: MouseEvent]
}

export default defineComponent({
  name: 'SpIcon',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [String, Number],
      default: 16,
    },
    color: String,
    clickable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    class: [String, Array, Object],
    style: [String, Object],
  },
  emits: ['click'],
  setup(props: IconProps, { attrs, emit }: any) {
    // 图标映射表 - 包含所有常用的 Ionicons 图标
    const iconMap: Record<string, any> = {
      // 基础图标
      Search,
      Close,
      CloseOutline,
      CloseCircle,
      Checkmark,
      CheckmarkOutline,
      CheckmarkCircle,
      Add,
      AddOutline,
      Remove,
      RemoveOutline,

      // 眼睛图标
      Eye,
      EyeOutline,
      EyeOff,
      EyeOffOutline,

      // 箭头图标
      ArrowForward,
      ArrowBack,
      ArrowUp,
      ArrowDown,
      ChevronForward,
      ChevronBack,
      ChevronUp,
      ChevronDown,

      // 位置图标
      Location,
      LocationOutline,

      // 刷新图标
      Refresh,
      RefreshOutline,

      // 设置图标
      Settings,
      SettingsOutline,

      // 用户图标
      Person,
      PersonOutline,

      // 通知图标
      Notifications,
      NotificationsOutline,

      // 心形图标
      Heart,
      HeartOutline,

      // 星形图标
      Star,
      StarOutline,

      // 点赞图标
      ThumbsUp,
      ThumbsUpOutline,

      // 文件图标
      Document,
      DocumentOutline,
      Folder,
      FolderOutline,

      // 编辑图标
      Create,
      CreateOutline,
      Trash,
      TrashOutline,

      // 媒体图标
      Play,
      PlayOutline,
      Pause,
      PauseOutline,
      Stop,
      StopOutline,

      // 网络图标
      Wifi,
      WifiOutline,
      Cloud,
      CloudOutline,

      // 其他常用图标
      Home,
      HomeOutline,
      Menu,
      MenuOutline,
      Grid,
      GridOutline,
      List,
      ListOutline,
      Calendar,
      CalendarOutline,
      Time,
      TimeOutline,
      Mail,
      MailOutline,
      Call,
      CallOutline,
      Camera,
      CameraOutline,
      Image,
      ImageOutline,
      Download,
      DownloadOutline,
      Share,
      ShareOutline,
      Copy,
      CopyOutline,
      Cut,
      CutOutline,
      Save,
      SaveOutline,
      Print,
      PrintOutline,
      Filter,
      FilterOutline,
      Warning,
      WarningOutline,
      Information,
      InformationOutline,
      Help,
      HelpOutline,
      LockClosed,
      LockOpen,
      Key,
      KeyOutline,
    }

    // 使用图标系统解析图标
    const { iconData } = useIcon(() => props.name)

    // 获取图标组件
    const iconComponent = computed(() => {
      if (!props.name) {
        console.warn('Icon: 没有提供 name 属性')
        return null
      }

      // 如果是以 $ 开头的别名，优先使用图标系统
      if (props.name.startsWith('$')) {
        if (iconData.value && iconData.value.component) {
          return iconData.value.component
        }
        console.warn(`图标别名 "${props.name}" 未找到`)
        return null
      }

      // 对于普通图标名称，直接使用 ionicons 映射
      let IconComponent = iconMap[props.name]

      // 如果没找到，尝试首字母大写的版本
      if (!IconComponent) {
        const capitalizedName =
          props.name.charAt(0).toUpperCase() + props.name.slice(1)
        IconComponent = iconMap[capitalizedName]
      }

      if (!IconComponent) {
        console.warn(
          `图标 "${props.name}" 未找到，可用图标:`,
          Object.keys(iconMap).sort()
        )
        return null
      }

      return IconComponent
    })

    // 计算图标类名
    const iconClass = computed(() => {
      const classes = ['sp-icon']

      if (props.clickable) classes.push('sp-icon--clickable')
      if (props.disabled) classes.push('sp-icon--disabled')
      if (props.class) {
        if (typeof props.class === 'string') {
          classes.push(props.class)
        } else if (Array.isArray(props.class)) {
          classes.push(...props.class)
        } else {
          Object.entries(props.class).forEach(([key, value]) => {
            if (value) classes.push(key)
          })
        }
      }

      return classes
    })

    // 计算图标样式
    const iconStyle = computed(() => {
      const styles: Record<string, any> = {
        width: typeof props.size === 'number' ? `${props.size}px` : props.size,
        height: typeof props.size === 'number' ? `${props.size}px` : props.size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',
      }

      if (props.color) {
        styles.color = props.color
      }

      if (props.clickable && !props.disabled) {
        styles.cursor = 'pointer'
      }

      if (props.disabled) {
        styles.opacity = 0.5
        styles.cursor = 'not-allowed'
      }

      // 合并用户自定义样式
      if (props.style) {
        if (typeof props.style === 'string') {
          return [styles, props.style]
        } else {
          Object.assign(styles, props.style)
        }
      }

      return styles
    })

    // 处理点击事件
    const handleClick = (event: MouseEvent) => {
      if (props.disabled) return
      if (props.clickable) {
        // 阻止事件冒泡，避免影响输入框焦点
        event.preventDefault()
        event.stopPropagation()
        emit('click', event)
      }
    }

    return () => {
      const IconComponent = iconComponent.value
      if (!IconComponent) return null

      return (
        <IconComponent
          class={iconClass.value}
          style={iconStyle.value}
          icon={iconData.value?.icon}
          tag="span"
          {...attrs}
          onClick={handleClick}
        />
      )
    }
  },
})