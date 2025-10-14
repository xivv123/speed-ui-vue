<template>
  <div class="sp-switch-tsx-demo">
    <h1>🎯 SPSwitch TSX开关组件测试</h1>
    <p>基于 TSX 实现的高性能开关组件，测试 SPSwitch.tsx 的各种功能</p>

    <!-- 基础用法 -->
    <section class="demo-section">
      <h2>基础用法 (Basic)</h2>
      <div class="demo-container">
        <div class="switch-wrapper">
          <SPSwitch
            v-model="basicValue1"
            label="开关 1"
          />
          <SPSwitch
            v-model="basicValue2"
            label="开关 2"
          />
          <SPSwitch
            v-model="basicValue3"
            label="开关 3"
          />
        </div>
        <div class="demo-info">
          <h4>开关状态:</h4>
          <code>
            {{
              {
                switch1: basicValue1,
                switch2: basicValue2,
                switch3: basicValue3,
              }
            }}
          </code>
          <p><small>基础的开关功能测试</small></p>
        </div>
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="demo-section">
      <h2>不同尺寸 (Sizes)</h2>
      <div class="demo-container">
        <div class="switch-wrapper">
          <SPSwitch
            v-model="sizeValue1"
            label="小尺寸"
            size="small"
          />
          <SPSwitch
            v-model="sizeValue2"
            label="中等尺寸"
            size="medium"
          />
          <SPSwitch
            v-model="sizeValue3"
            label="大尺寸"
            size="large"
          />
        </div>
        <div class="demo-info">
          <h4>开关状态:</h4>
          <code>
            {{ { small: sizeValue1, medium: sizeValue2, large: sizeValue3 } }}
          </code>
          <p><small>不同尺寸的开关组件</small></p>
        </div>
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="demo-section">
      <h2>禁用状态 (Disabled)</h2>
      <div class="demo-container">
        <div class="switch-wrapper">
          <SPSwitch
            v-model="disabledValue1"
            label="禁用关闭"
            disabled
          />
          <SPSwitch
            v-model="disabledValue2"
            label="禁用开启"
            disabled
          />
          <SPSwitch
            v-model="disabledValue3"
            label="只读状态"
            readonly
          />
        </div>
        <div class="demo-info">
          <h4>状态:</h4>
          <code>
            {{
              {
                disabled1: disabledValue1,
                disabled2: disabledValue2,
                readonly: disabledValue3,
              }
            }}
          </code>
          <p><small>禁用和只读状态的开关</small></p>
        </div>
      </div>
    </section>

    <!-- 标签位置 -->
    <section class="demo-section">
      <h2>标签位置 (Label Position)</h2>
      <div class="demo-container">
        <div class="switch-wrapper">
          <SPSwitch
            v-model="labelValue1"
            label="标签在右侧"
            label-position="right"
          />
          <SPSwitch
            v-model="labelValue2"
            label="标签在左侧"
            label-position="left"
          />
          <SPSwitch
            v-model="labelValue3"
            label="标签在上方"
            label-position="top"
          />
        </div>
        <div class="demo-info">
          <h4>开关状态:</h4>
          <code>
            {{ { right: labelValue1, left: labelValue2, top: labelValue3 } }}
          </code>
          <p><small>不同标签位置的开关</small></p>
        </div>
      </div>
    </section>

    <!-- 带内部文本 -->
    <section class="demo-section">
      <h2>带内部文本 (Inner Text)</h2>
      <div class="demo-container">
        <div class="switch-wrapper">
          <SPSwitch
            v-model="textValue1"
            label="中文文本"
            show-text
            checked-text="开"
            unchecked-text="关"
          />
          <SPSwitch
            v-model="textValue2"
            label="英文文本"
            show-text
            checked-text="ON"
            unchecked-text="OFF"
          />
          <SPSwitch
            v-model="textValue3"
            label="图标文本"
            show-text
            checked-text="✓"
            unchecked-text="✗"
          />
        </div>
        <div class="demo-info">
          <h4>开关状态:</h4>
          <code>
            {{ { chinese: textValue1, english: textValue2, icon: textValue3 } }}
          </code>
          <p><small>带内部文本的开关组件</small></p>
        </div>
      </div>
    </section>

    <!-- 无标签开关 -->
    <section class="demo-section">
      <h2>无标签开关 (No Label)</h2>
      <div class="demo-container">
        <div class="switch-wrapper">
          <SPSwitch
            v-model="noLabelValue1"
            :show-label="false"
          />
          <SPSwitch
            v-model="noLabelValue2"
            :show-label="false"
            size="small"
          />
          <SPSwitch
            v-model="noLabelValue3"
            :show-label="false"
            size="large"
          />
        </div>
        <div class="demo-info">
          <h4>开关状态:</h4>
          <code>
            {{
              {
                normal: noLabelValue1,
                small: noLabelValue2,
                large: noLabelValue3,
              }
            }}
          </code>
          <p><small>无标签的纯开关组件</small></p>
        </div>
      </div>
    </section>

    <!-- 加载状态 -->
    <section class="demo-section">
      <h2>加载状态 (Loading)</h2>
      <div class="demo-container">
        <div class="switch-wrapper">
          <SPSwitch
            v-model="loadingValue1"
            label="加载中"
            loading
          />
          <SPSwitch
            v-model="loadingValue2"
            label="异步切换"
            :loading="isAsyncLoading"
            @change="handleAsyncChange"
          />
        </div>
        <div class="demo-info">
          <h4>状态:</h4>
          <code>
            {{
              {
                loading: loadingValue1,
                async: loadingValue2,
                isLoading: isAsyncLoading,
              }
            }}
          </code>
          <p><small>加载状态的开关组件</small></p>
        </div>
      </div>
    </section>

    <!-- 变体样式 -->
    <section class="demo-section">
      <h2>变体样式 (Variants)</h2>
      <div class="demo-container">
        <div class="switch-wrapper">
          <SPSwitch
            v-model="variantValue1"
            label="默认样式 (Default)"
          />
          <SPSwitch
            v-model="variantValue2"
            label="内嵌样式 (Inset)"
            inset
          />
          <SPSwitch
            v-model="variantValue3"
            label="扁平样式 (Flat)"
            flat
          />
          <SPSwitch
            v-model="variantValue4"
            label="内嵌 + 扁平"
            inset
            flat
          />
        </div>
        <div class="demo-info">
          <h4>开关状态:</h4>
          <code>
            {{
              {
                default: variantValue1,
                inset: variantValue2,
                flat: variantValue3,
                insetFlat: variantValue4,
              }
            }}
          </code>
          <p><small>不同的视觉样式变体</small></p>
        </div>
      </div>
    </section>

    <!-- 内嵌样式 + 文字 -->
    <section class="demo-section">
      <h2>内嵌样式 + 文字 (Inset + Text)</h2>
      <div class="demo-container">
        <div class="switch-wrapper">
          <SPSwitch
            v-model="insetTextValue1"
            label="内嵌 + 英文"
            inset
            thumb-checked-text="ON"
            thumb-unchecked-text="OFF"
          />
          <SPSwitch
            v-model="insetTextValue2"
            label="内嵌 + 中文"
            inset
            thumb-checked-text="开"
            thumb-unchecked-text="关"
          />
          <SPSwitch
            v-model="insetTextValue3"
            label="内嵌 + 数字"
            inset
            thumb-checked-text="1"
            thumb-unchecked-text="0"
          />
          <SPSwitch
            v-model="insetTextValue4"
            label="内嵌 + 符号"
            inset
            thumb-checked-text="✓"
            thumb-unchecked-text="✗"
          />
          <SPSwitch
            v-model="insetTextValue5"
            label="内嵌 + 颜色 + 文字"
            inset
            color="success"
            thumb-checked-text="YES"
            thumb-unchecked-text="NO"
          />
        </div>
        <div class="demo-info">
          <h4>开关状态:</h4>
          <code>
            {{
              {
                default: variantValue1,
                inset: variantValue2,
                flat: variantValue3,
                insetFlat: variantValue4,
              }
            }}
          </code>
          <p><small>不同的视觉样式变体</small></p>
        </div>
      </div>
    </section>

    <!-- 方形内嵌样式 -->
    <section class="demo-section">
      <h2>方形内嵌样式 (Inset Square)</h2>
      <div class="demo-container">
        <div class="switch-wrapper">
          <SPSwitch
            v-model="squareValue1"
            label="方形内嵌样式"
            inset-square
          />
          <SPSwitch
            v-model="squareValue2"
            label="方形 + 文字"
            inset-square
            thumb-checked-text="ON"
            thumb-unchecked-text="OFF"
          />
          <SPSwitch
            v-model="squareValue3"
            label="方形 + 中文"
            inset-square
            thumb-checked-text="开"
            thumb-unchecked-text="关"
          />
          <SPSwitch
            v-model="squareValue4"
            label="方形 + 颜色"
            inset-square
            color="primary"
            thumb-checked-text="✓"
            thumb-unchecked-text="✗"
          />
          <SPSwitch
            v-model="squareValue5"
            label="方形 + Success"
            inset-square
            color="success"
            thumb-checked-text="YES"
            thumb-unchecked-text="NO"
          />
        </div>
        <div class="demo-info">
          <h4>方形开关状态:</h4>
          <code>
            {{
              {
                basic: squareValue1,
                text: squareValue2,
                chinese: squareValue3,
                primary: squareValue4,
                success: squareValue5,
              }
            }}
          </code>
          <p><small>方形的内嵌样式开关</small></p>
        </div>
      </div>
    </section>

    <!-- 颜色主题 -->
    <section class="demo-section">
      <h2>颜色主题 (Colors)</h2>
      <div class="demo-container">
        <div class="switch-wrapper">
          <SPSwitch
            v-model="colorValue1"
            label="默认颜色"
          />
          <SPSwitch
            v-model="colorValue2"
            label="Primary"
            color="primary"
          />
          <SPSwitch
            v-model="colorValue3"
            label="Secondary"
            color="secondary"
          />
          <SPSwitch
            v-model="colorValue4"
            label="Success"
            color="success"
          />
          <SPSwitch
            v-model="colorValue5"
            label="Warning"
            color="warning"
          />
          <SPSwitch
            v-model="colorValue6"
            label="Error"
            color="error"
          />
          <SPSwitch
            v-model="colorValue7"
            label="Info"
            color="info"
          />
        </div>
        <div class="demo-info">
          <h4>开关状态:</h4>
          <code>
            {{
              {
                default: colorValue1,
                primary: colorValue2,
                secondary: colorValue3,
                success: colorValue4,
                warning: colorValue5,
                error: colorValue6,
                info: colorValue7,
              }
            }}
          </code>
          <p><small>不同的主题颜色</small></p>
        </div>
      </div>
    </section>

    <!-- Thumb 文字 -->
    <section class="demo-section">
      <h2>Thumb 文字 (Thumb Text)</h2>
      <div class="demo-container">
        <div class="switch-wrapper">
          <SPSwitch
            v-model="thumbTextValue1"
            label="固定文字"
            thumb-text="ON"
          />
          <SPSwitch
            v-model="thumbTextValue2"
            label="开关文字"
            thumb-checked-text="开"
            thumb-unchecked-text="关"
          />
          <SPSwitch
            v-model="thumbTextValue3"
            label="英文开关"
            thumb-checked-text="ON"
            thumb-unchecked-text="OFF"
          />
          <SPSwitch
            v-model="thumbTextValue4"
            label="数字开关"
            thumb-checked-text="1"
            thumb-unchecked-text="0"
          />
          <SPSwitch
            v-model="thumbTextValue5"
            label="符号开关"
            thumb-checked-text="✓"
            thumb-unchecked-text="✗"
          />
        </div>
        <div class="demo-info">
          <h4>开关状态:</h4>
          <code>
            {{
              {
                fixed: thumbTextValue1,
                chinese: thumbTextValue2,
                english: thumbTextValue3,
                number: thumbTextValue4,
                symbol: thumbTextValue5,
              }
            }}
          </code>
          <p><small>在 thumb（小圆圈）上显示文字</small></p>
        </div>
      </div>
    </section>

    <!-- 组合示例 -->
    <section class="demo-section">
      <h2>组合示例 (Combinations)</h2>
      <div class="demo-container">
        <div class="switch-wrapper">
          <SPSwitch
            v-model="comboValue1"
            label="Primary + Inset + 文字"
            color="primary"
            inset
            thumb-checked-text="ON"
            thumb-unchecked-text="OFF"
          />
          <SPSwitch
            v-model="comboValue2"
            label="Success + Flat + 符号"
            color="success"
            flat
            thumb-checked-text="✓"
            thumb-unchecked-text="✗"
          />
          <SPSwitch
            v-model="comboValue3"
            label="Warning + Inset + Flat + 数字"
            color="warning"
            inset
            flat
            thumb-checked-text="1"
            thumb-unchecked-text="0"
          />
          <SPSwitch
            v-model="comboValue4"
            label="Error + 中文"
            color="error"
            thumb-checked-text="开"
            thumb-unchecked-text="关"
          />
        </div>
        <div class="demo-info">
          <h4>组合状态:</h4>
          <code>
            {{
              {
                primaryInset: comboValue1,
                successFlat: comboValue2,
                warningCombo: comboValue3,
                errorChinese: comboValue4,
              }
            }}
          </code>
          <p><small>多种属性的组合使用</small></p>
        </div>
      </div>
    </section>

    <!-- 事件测试 -->
    <section class="demo-section">
      <h2>事件测试 (Events)</h2>
      <div class="demo-container">
        <div class="switch-wrapper">
          <SPSwitch
            v-model="eventValue"
            label="事件监听"
            @change="onSwitchChange"
            @focus="onSwitchFocus"
            @blur="onSwitchBlur"
          />
        </div>
        <div class="demo-info">
          <h4>事件日志:</h4>
          <div class="event-log">
            <div
              v-for="(log, index) in eventLogs"
              :key="index"
              class="log-item"
            >
              <span class="log-time">{{ log.time }}</span>
              <span class="log-event">{{ log.event }}</span>
              <span class="log-value">{{ log.value }}</span>
            </div>
          </div>
          <button
            @click="clearLogs"
            class="clear-btn"
          >
            清空日志
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { SPSwitch } from '@speed-ui/ui'

  // 基础用法
  const basicValue1 = ref(false)
  const basicValue2 = ref(true)
  const basicValue3 = ref(false)

  // 不同尺寸
  const sizeValue1 = ref(false)
  const sizeValue2 = ref(true)
  const sizeValue3 = ref(false)

  // 禁用状态
  const disabledValue1 = ref(false)
  const disabledValue2 = ref(true)
  const disabledValue3 = ref(false)

  // 标签位置
  const labelValue1 = ref(false)
  const labelValue2 = ref(true)
  const labelValue3 = ref(false)

  // 带内部文本
  const textValue1 = ref(false)
  const textValue2 = ref(true)
  const textValue3 = ref(false)

  // 无标签开关
  const noLabelValue1 = ref(false)
  const noLabelValue2 = ref(true)
  const noLabelValue3 = ref(false)

  // 加载状态
  const loadingValue1 = ref(false)
  const loadingValue2 = ref(false)
  const isAsyncLoading = ref(false)

  // 变体样式
  const variantValue1 = ref(false)
  const variantValue2 = ref(true)
  const variantValue3 = ref(false)
  const variantValue4 = ref(true)

  // 内嵌样式 + 文字
  const insetTextValue1 = ref(true)
  const insetTextValue2 = ref(false)
  const insetTextValue3 = ref(true)
  const insetTextValue4 = ref(false)
  const insetTextValue5 = ref(true)

  // 方形内嵌样式
  const squareValue1 = ref(false)
  const squareValue2 = ref(true)
  const squareValue3 = ref(false)
  const squareValue4 = ref(true)
  const squareValue5 = ref(false)

  // 颜色主题
  const colorValue1 = ref(false)
  const colorValue2 = ref(true)
  const colorValue3 = ref(false)
  const colorValue4 = ref(true)
  const colorValue5 = ref(false)
  const colorValue6 = ref(true)
  const colorValue7 = ref(false)

  // Thumb 文字
  const thumbTextValue1 = ref(false)
  const thumbTextValue2 = ref(false)
  const thumbTextValue3 = ref(true)
  const thumbTextValue4 = ref(false)
  const thumbTextValue5 = ref(true)

  // 组合示例
  const comboValue1 = ref(true)
  const comboValue2 = ref(false)
  const comboValue3 = ref(true)
  const comboValue4 = ref(false)

  // 事件测试
  const eventValue = ref(false)
  const eventLogs = ref<Array<{ time: string; event: string; value: any }>>([])

  // 异步切换处理
  const handleAsyncChange = async (value: boolean) => {
    isAsyncLoading.value = true
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 1500))
    loadingValue2.value = value
    isAsyncLoading.value = false
  }

  // 事件处理
  const onSwitchChange = (value: boolean) => {
    addEventLog('change', value)
  }

  const onSwitchFocus = () => {
    addEventLog('focus', 'focused')
  }

  const onSwitchBlur = () => {
    addEventLog('blur', 'blurred')
  }

  const addEventLog = (event: string, value: any) => {
    const time = new Date().toLocaleTimeString()
    eventLogs.value.unshift({ time, event, value })
    // 限制日志数量
    if (eventLogs.value.length > 10) {
      eventLogs.value = eventLogs.value.slice(0, 10)
    }
  }

  const clearLogs = () => {
    eventLogs.value = []
  }
</script>

<style scoped>
  .sp-switch-tsx-demo {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      sans-serif;
  }

  .sp-switch-tsx-demo h1 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-size: 2.5rem;
  }

  .sp-switch-tsx-demo > p {
    color: #7f8c8d;
    font-size: 1.1rem;
    margin-bottom: 3rem;
  }

  .demo-section {
    margin-bottom: 3rem;
    padding: 2rem;
    border: 1px solid #ecf0f1;
    border-radius: 8px;
    background: #fff;
  }

  .demo-section h2 {
    color: #34495e;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #ecf0f1;
    font-size: 1.5rem;
  }

  .demo-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }

  .switch-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .demo-info {
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 6px;
    border-left: 4px solid #3498db;
  }

  .demo-info h4 {
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
    font-size: 1rem;
  }

  .demo-info code {
    display: block;
    padding: 0.75rem;
    background: #2c3e50;
    color: #ecf0f1;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    word-break: break-all;
    margin-bottom: 0.5rem;
  }

  .demo-info p {
    margin: 0;
    color: #7f8c8d;
  }

  .event-log {
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .log-item {
    display: flex;
    padding: 0.5rem;
    border-bottom: 1px solid #eee;
    font-family: 'Courier New', monospace;
    font-size: 0.8rem;
  }

  .log-item:last-child {
    border-bottom: none;
  }

  .log-time {
    color: #666;
    margin-right: 1rem;
    min-width: 80px;
  }

  .log-event {
    color: #e74c3c;
    margin-right: 1rem;
    min-width: 60px;
    font-weight: bold;
  }

  .log-value {
    color: #27ae60;
  }

  .clear-btn {
    padding: 0.5rem 1rem;
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .clear-btn:hover {
    background: #c0392b;
  }

  @media (max-width: 768px) {
    .demo-container {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .sp-switch-tsx-demo {
      padding: 1rem;
    }

    .demo-section {
      padding: 1rem;
    }
  }
</style>
