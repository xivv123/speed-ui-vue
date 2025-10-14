export default {
  props: [
    {
      name: 'modelValue',
      type: 'boolean',
      default: 'false',
      description: '控制抽屉的显示和隐藏',
    },
    {
      name: 'location',
      type: "'left' | 'right' | 'top' | 'bottom'",
      default: "'right'",
      description: '抽屉滑出的位置',
    },
    {
      name: 'width',
      type: 'string | number',
      default: '256',
      description: '抽屉的宽度（左右位置时有效）',
    },
    {
      name: 'height',
      type: 'string | number',
      default: 'undefined',
      description: '抽屉的高度（上下位置时有效）',
    },
    {
      name: 'temporary',
      type: 'boolean',
      default: 'true',
      description: '是否为临时抽屉（点击遮罩层关闭）',
    },
    {
      name: 'permanent',
      type: 'boolean',
      default: 'false',
      description: '是否为永久抽屉（始终显示）',
    },
    {
      name: 'scrim',
      type: 'boolean',
      default: 'true',
      description: '是否显示遮罩层',
    },
    {
      name: 'persistent',
      type: 'boolean',
      default: 'false',
      description: '是否持久化（点击遮罩层不关闭）',
    },
  ],
  events: [
    {
      name: 'update:modelValue',
      params: 'value: boolean',
      description: '抽屉显示状态改变时触发',
    },
    {
      name: 'afterEnter',
      params: '-',
      description: '抽屉打开动画完成后触发',
    },
    {
      name: 'afterLeave',
      params: '-',
      description: '抽屉关闭动画完成后触发',
    },
  ],
  slots: [
    {
      name: 'default',
      description: '抽屉的内容',
    },
    {
      name: 'activator',
      params: '{ props: object }',
      description: '触发抽屉的元素',
    },
  ],
}
