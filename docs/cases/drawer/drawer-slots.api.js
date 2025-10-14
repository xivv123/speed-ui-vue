export default {
  slots: [
    {
      name: 'default',
      description: '抽屉的主要内容区域',
      params: '-',
    },
    {
      name: 'activator',
      description: '触发抽屉打开的元素，通过 props 绑定可以自动控制抽屉的打开',
      params: '{ props: { onClick: Function, ... } }',
    },
  ],
}
