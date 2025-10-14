# notification 通知提醒

通知提醒用于在界面角落显示全局的提示信息，适用于系统级的通知和反馈。

## 基本用法

使用 `notify` 函数或 `useNotification` 组合式函数调用通知
:::notification/basic

## 不同类型

支持 success、warning、info、error 四种类型
:::notification/types

## 显示位置

通过 `position` 属性设置通知显示的位置
:::notification/position

## 持续时间

通过 `duration` 属性设置通知的持续时间，设置为 0 则不自动关闭
:::notification/duration

## 关闭按钮

可以隐藏关闭按钮或添加关闭回调
:::notification/close

## API

### 函数调用

```ts
import { notify } from 'speed-ui-vue'

// 基本用法
notify('这是一条通知')
notify({ message: '这是一条通知' })

// 不同类型
notify.success('操作成功')
notify.warning('警告信息')
notify.info('提示信息')
notify.error('错误信息')

// 完整配置
const instance = notify({
  title: '标题',
  message: '内容',
  type: 'success',
  position: 'top-right',
  duration: 4500,
  showClose: true,
  onClose: () => {},
  onClick: () => {}
})

// 手动关闭
instance.close()

// 关闭所有通知
notify.closeAll()
```

### 组合式函数

```ts
import { useNotification } from 'speed-ui-vue'

const { notify, success, warning, info, error, closeAll } = useNotification()

success('操作成功')
```

### NotificationOptions
:::api/notification/options

### NotificationInstance

| 方法 | 说明 |
| --- | --- |
| close() | 关闭当前通知 |

### 静态方法

| 方法 | 说明 | 参数 |
| --- | --- | --- |
| notify(options) | 显示通知 | `NotificationOptions \| string` |
| notify.success(options) | 显示成功通知 | `NotificationOptions \| string` |
| notify.warning(options) | 显示警告通知 | `NotificationOptions \| string` |
| notify.info(options) | 显示信息通知 | `NotificationOptions \| string` |
| notify.error(options) | 显示错误通知 | `NotificationOptions \| string` |
| notify.closeAll() | 关闭所有通知 | - |
| notify.closeAllOfType(type) | 关闭指定类型的通知 | `NotificationType` |