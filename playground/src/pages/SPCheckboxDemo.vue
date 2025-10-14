<template>
  <div class="sp-checkbox-demo">
    <h1>☑️ SPCheckbox 复选框组件演示</h1>
    <p>基于 SPInput + SPSelectionControl 组合实现的高性能复选框组件</p>

    <!-- 基础用法 -->
    <section class="demo-section">
      <h2>基础用法 (Basic)</h2>
      <div class="demo-container">
        <div class="checkbox-wrapper">
          <SPCheckbox
            v-model="basicValue1"
            label="选项 1"
            variant="outlined"
          />
          <SPCheckbox
            v-model="basicValue2"
            label="选项 2"
          />
          <SPCheckbox
            v-model="basicValue3"
            label="选项 3"
          />
        </div>
        <div class="demo-info">
          <h4>选中状态:</h4>
          <code>
            {{
              { value1: basicValue1, value2: basicValue2, value3: basicValue3 }
            }}
          </code>
          <p><small>基础的复选框功能</small></p>
        </div>
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="demo-section">
      <h2>不同尺寸 (Sizes)</h2>
      <div class="demo-container">
        <div class="checkbox-wrapper">
          <SPCheckbox
            v-model="sizeValue1"
            label="小尺寸"
            size="small"
          />
          <SPCheckbox
            v-model="sizeValue2"
            label="中等尺寸"
            size="medium"
          />
          <SPCheckbox
            v-model="sizeValue3"
            label="大尺寸"
            size="large"
          />
        </div>
        <div class="demo-info">
          <h4>选中状态:</h4>
          <code>
            {{ { small: sizeValue1, medium: sizeValue2, large: sizeValue3 } }}
          </code>
          <p><small>不同尺寸的复选框</small></p>
        </div>
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="demo-section">
      <h2>禁用状态 (Disabled)</h2>
      <div class="demo-container">
        <div class="checkbox-wrapper">
          <SPCheckbox
            v-model="disabledValue1"
            label="禁用未选中"
            disabled
          />
          <SPCheckbox
            v-model="disabledValue2"
            label="禁用已选中"
            disabled
          />
          <SPCheckbox
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
          <p><small>禁用和只读状态的复选框</small></p>
        </div>
      </div>
    </section>

    <!-- 不确定状态 -->
    <section class="demo-section">
      <h2>不确定状态 (Indeterminate)</h2>
      <div class="demo-container">
        <div class="checkbox-wrapper">
          <SPCheckbox
            v-model="parentValue"
            :indeterminate="isIndeterminate"
            label="全选"
            @change="onParentChange"
          />
          <div class="child-checkboxes">
            <SPCheckbox
              v-model="childValue1"
              label="子选项 1"
              @change="onChildChange"
            />
            <SPCheckbox
              v-model="childValue2"
              label="子选项 2"
              @change="onChildChange"
            />
            <SPCheckbox
              v-model="childValue3"
              label="子选项 3"
              @change="onChildChange"
            />
          </div>
        </div>
        <div class="demo-info">
          <h4>状态:</h4>
          <code>
            {{
              {
                parent: parentValue,
                indeterminate: isIndeterminate,
                children: [childValue1, childValue2, childValue3],
              }
            }}
          </code>
          <p><small>父子复选框联动，展示不确定状态</small></p>
        </div>
      </div>
    </section>

    <!-- 自定义值 -->
    <section class="demo-section">
      <h2>自定义值 (Custom Values)</h2>
      <div class="demo-container">
        <div class="checkbox-wrapper">
          <SPCheckbox
            v-model="customValue1"
            label="自定义值 A"
            :true-value="'yes'"
            :false-value="'no'"
          />
          <SPCheckbox
            v-model="customValue2"
            label="自定义值 B"
            :true-value="1"
            :false-value="0"
          />
          <SPCheckbox
            v-model="customValue3"
            label="自定义值 C"
            :true-value="{ selected: true }"
            :false-value="{ selected: false }"
          />
        </div>
        <div class="demo-info">
          <h4>自定义值:</h4>
          <code>
            {{
              {
                valueA: customValue1,
                valueB: customValue2,
                valueC: customValue3,
              }
            }}
          </code>
          <p><small>使用自定义的 true/false 值</small></p>
        </div>
      </div>
    </section>

    <!-- 验证状态 -->
    <section class="demo-section">
      <h2>验证状态 (Validation)</h2>
      <div class="demo-container">
        <div class="checkbox-wrapper">
          <SPCheckbox
            v-model="validValue"
            label="成功状态"
            :error="false"
            hint="验证通过"
          />
          <SPCheckbox
            v-model="invalidValue"
            label="错误状态"
            :error="true"
            error-messages="请勾选此项"
          />
          <SPCheckbox
            v-model="warningValue"
            label="警告状态"
            hint="建议勾选此项"
          />
        </div>
        <div class="demo-info">
          <h4>验证状态:</h4>
          <code>
            {{
              {
                valid: validValue,
                invalid: invalidValue,
                warning: warningValue,
              }
            }}
          </code>
          <p><small>不同验证状态的复选框</small></p>
        </div>
      </div>
    </section>

    <!-- 组合使用 -->
    <section class="demo-section">
      <h2>组合使用 (Group Usage)</h2>
      <div class="demo-container">
        <div class="checkbox-wrapper">
          <h4>兴趣爱好选择:</h4>
          <SPCheckbox
            v-model="hobbies"
            label="阅读"
            value="reading"
          />
          <SPCheckbox
            v-model="hobbies"
            label="运动"
            value="sports"
          />
          <SPCheckbox
            v-model="hobbies"
            label="音乐"
            value="music"
          />
          <SPCheckbox
            v-model="hobbies"
            label="旅行"
            value="travel"
          />
          <SPCheckbox
            v-model="hobbies"
            label="编程"
            value="coding"
          />
        </div>
        <div class="demo-info">
          <h4>选中的爱好:</h4>
          <code>{{ hobbies }}</code>
          <p><small>多个复选框绑定到同一个数组</small></p>
        </div>
      </div>
    </section>

    <!-- 颜色主题 -->
    <section class="demo-section">
      <h2>颜色主题 (Color Themes)</h2>
      <div class="demo-container">
        <div class="checkbox-wrapper">
          <SPCheckbox
            v-model="colorValue1"
            label="Primary 主色"
            color="primary"
          />
          <SPCheckbox
            v-model="colorValue2"
            label="Secondary 次色"
            color="secondary"
          />
          <SPCheckbox
            v-model="colorValue3"
            label="Success 成功"
            color="success"
          />
          <SPCheckbox
            v-model="colorValue4"
            label="Warning 警告"
            color="#785658"
          />
          <SPCheckbox
            v-model="colorValue5"
            label="Error 错误"
            color="error"
          />
          <SPCheckbox
            v-model="colorValue6"
            label="Info 信息"
            color="info"
          />
        </div>
        <div class="demo-info">
          <h4>颜色状态:</h4>
          <code>
            {{
              {
                primary: colorValue1,
                secondary: colorValue2,
                success: colorValue3,
                warning: colorValue4,
                error: colorValue5,
                info: colorValue6,
              }
            }}
          </code>
          <p><small>不同颜色主题的复选框</small></p>
        </div>
      </div>
    </section>

    <!-- 组件复用说明 -->
    <section class="demo-section">
      <h2>🚀 组件复用架构</h2>
      <div class="reuse-info">
        <div class="reuse-item">
          <strong>SPInput 组件:</strong>
          100% 复用输入框基础功能、验证状态、标签等
        </div>
        <div class="reuse-item">
          <strong>SPSelectionControl:</strong>
          95% 复用选择控制逻辑、图标切换、状态管理
        </div>
        <div class="reuse-item">
          <strong>样式系统:</strong>
          100% 复用 BEM 规范、主题变量、响应式设计
        </div>
        <div class="reuse-item">
          <strong>组合式 API:</strong>
          复用 focus、proxiedModel、icons 等通用逻辑
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  // 注意：SPCheckbox 组件已经全局注册，无需手动导入

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
  const disabledValue3 = ref(true)

  // 不确定状态
  const parentValue = ref(false)
  const childValue1 = ref(false)
  const childValue2 = ref(true)
  const childValue3 = ref(false)

  const isIndeterminate = computed(() => {
    const checkedCount = [
      childValue1.value,
      childValue2.value,
      childValue3.value,
    ].filter(Boolean).length
    return checkedCount > 0 && checkedCount < 3
  })

  const onParentChange = (value: boolean) => {
    childValue1.value = value
    childValue2.value = value
    childValue3.value = value
  }

  const onChildChange = () => {
    const checkedCount = [
      childValue1.value,
      childValue2.value,
      childValue3.value,
    ].filter(Boolean).length
    parentValue.value = checkedCount === 3
  }

  // 自定义值
  const customValue1 = ref('no')
  const customValue2 = ref(0)
  const customValue3 = ref({ selected: false })

  // 验证状态
  const validValue = ref(true)
  const invalidValue = ref(false)
  const warningValue = ref(false)

  // 组合使用
  const hobbies = ref(['music', 'coding'])

  // 颜色主题
  const colorValue1 = ref(true) // primary
  const colorValue2 = ref(false) // secondary
  const colorValue3 = ref(true) // success
  const colorValue4 = ref(false) // warning
  const colorValue5 = ref(true) // error
  const colorValue6 = ref(false) // info
</script>

<style scoped>
  .sp-checkbox-demo {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .demo-section {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #fafafa;
  }

  .demo-section h2 {
    margin-top: 0;
    color: #333;
    border-bottom: 2px solid #007bff;
    padding-bottom: 10px;
  }

  .demo-container {
    display: flex;
    gap: 30px;
    align-items: flex-start;
  }

  .checkbox-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .child-checkboxes {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .demo-info {
    flex: 1;
    background: white;
    padding: 15px;
    border-radius: 6px;
    border: 1px solid #ddd;
  }

  .demo-info h4 {
    margin: 0 0 10px 0;
    color: #555;
  }

  .demo-info code {
    display: block;
    background: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    white-space: pre-wrap;
    word-break: break-all;
  }

  .demo-info p {
    margin: 10px 0 0 0;
    color: #666;
  }

  .reuse-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 15px;
  }

  .reuse-item {
    background: white;
    padding: 15px;
    border-radius: 6px;
    border-left: 4px solid #007bff;
  }

  .reuse-item strong {
    color: #007bff;
    display: block;
    margin-bottom: 5px;
  }

  @media (max-width: 768px) {
    .demo-container {
      flex-direction: column;
    }

    .reuse-info {
      grid-template-columns: 1fr;
    }
  }
</style>
