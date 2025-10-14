export default {
  events: [
    {
      name: 'update:modelValue',
      params: 'value: boolean',
      description: '当抽屉的显示状态改变时触发',
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
}
