# inputsuggest 输入建议框

一个结合了输入框和下拉建议的组件，支持搜索过滤、多选、自动选择等功能，适用于需要输入提示或智能补全的场景。

## 基本用法

展示输入建议框的基本功能，可以输入搜索或从列表中选择。

:::inputsuggest/basic

## 多选模式

启用 `multiple` 属性支持多选，配合 `tags` 和 `closable-tags` 可以显示可关闭的标签。

:::inputsuggest/multiple

## 自动选择

使用 `auto-select-first` 属性可以自动高亮第一个匹配项，配合 `clear-on-select` 在选择后清空输入。

:::inputsuggest/auto-select

## 搜索过滤

输入文本时自动过滤匹配的选项，支持高亮显示匹配内容。

:::inputsuggest/filter

## 样式变体

支持多种输入框样式变体，包括 filled、outlined、solo、underlined 等。

:::inputsuggest/variants

## 禁用状态

展示禁用和只读两种不可编辑状态。

:::inputsuggest/disabled

## 表单验证

支持表单验证规则，可以设置必填、自定义验证等。

:::inputsuggest/validation

## API

### Props
:::api/inputsuggest/props

### Events
:::api/inputsuggest/events

### Slots
:::api/inputsuggest/slots