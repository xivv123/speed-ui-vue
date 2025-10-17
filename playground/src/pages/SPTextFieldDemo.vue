<template>
  <DemoContainer title="SPTextField 文本字段组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法">
      <div class="demo-row">
        <sp-text-field v-model="basicValue" label="基础输入框" placeholder="请输入内容" clearable/>
        <sp-text-field v-model="basicValue2" label="带前缀的字段" prefix="$" placeholder="金额" clearable/>
        <sp-text-field v-model="basicValue3" label="带后缀的字段" suffix=".com" placeholder="网站域名" clearable/>
      </div>
      <p>当前值: {{ basicValue }}, {{ basicValue2 }}, {{ basicValue3 }}</p>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 颜色演示 -->
    <DemoSection title="颜色演示">
      <div class="demo-row">
        <sp-text-field density="compact" v-model="colorValue1" label="Primary 颜色" color="primary" placeholder="主色调" />
        <sp-text-field density="compact" v-model="colorValue2" label="Success 颜色" color="#197AAB" placeholder="成功色" />
        <sp-text-field density="compact" v-model="colorValue3" label="Warning 颜色" color="warning" placeholder="警告色" />
        <sp-text-field density="compact" v-model="colorValue4" label="Error 颜色" color="error" placeholder="错误色" />
        <sp-text-field density="compact" v-model="colorValue5" label="Info 颜色" color="info" placeholder="信息色" />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同变体 -->
    <DemoSection title="不同变体">
      <div class="demo-row">
        <sp-text-field v-model="variantValue1" label="填充变体 (默认)" variant="filled" placeholder="填充样式" />
        <sp-text-field density="compact" v-model="variantValue2" prepend-icon="search" prepend-inner-icon="search"
          append-icon="search" suffix=".com" prefix=".com" label="轮廓变体" variant="outlined" placeholder="轮廓样式" clearable>
          <template v-slot:prepend-inner>
            <sp-icon name="search" />
          </template>
        </sp-text-field>

        <sp-text-field v-model="variantValue22" label="轮廓变体" variant="outlined" disabled placeholder="轮廓样式" />
        <sp-text-field v-model="variantValue3" label="下划线变体" variant="underlined" placeholder="下划线样式" />
        <sp-text-field v-model="variantValue4" label="简洁变体" variant="plain" placeholder="简洁样式" />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同输入类型 -->
    <DemoSection title="不同输入类型">
      <div class="demo-row">
        <sp-text-field v-model="emailValue" label="邮箱" type="email" placeholder="example@email.com" />
        <sp-text-field v-model="passwordValue" label="密码" type="password" placeholder="请输入密码" />
        <sp-text-field v-model="numberValue" label="数字" type="number" placeholder="请输入数字" />
        <sp-text-field v-model="dateValue" label="日期" type="date" />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 状态演示 -->
    <DemoSection title="状态演示">
      <div class="demo-row">
        <sp-text-field v-model="stateValue1" label="正常状态" placeholder="正常输入" />
        <sp-text-field v-model="stateValue2" label="禁用状态" placeholder="禁用输入" disabled />
        <sp-text-field v-model="stateValue3" label="只读状态" placeholder="只读输入" readonly />
        <sp-text-field v-model="stateValue4" label="错误状态" placeholder="错误输入" error error-messages="这是一个错误信息" />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- Loading 状态演示 -->
    <DemoSection title="Loading 状态演示" subtitle="展示输入框的加载状态，适用于异步验证、数据提交等场景">
      <div class="demo-row">
        <sp-text-field v-model="loadingValue1" label="基础 Loading" variant="underlined" placeholder="显示加载状态"
          :loading="true" />
        <sp-text-field v-model="loadingValue2" label="彩色 Loading" placeholder="自定义加载颜色"
          :loading="isLoading2 ? 'primary' : false" color="primary" />
        <sp-text-field v-model="loadingValue3" label="异步验证 Loading" placeholder="输入内容触发异步验证" :loading="isValidating"
          :rules="asyncValidationRules" validate-on="blur" />
        <sp-text-field v-model="loadingValue4" label="搜索 Loading" placeholder="模拟搜索加载" :loading="isSearching"
          prepend-inner-icon="search" @input="handleSearchInput" />
      </div>

      <!-- 控制按钮 -->
      <div class="loading-controls">
        <button @click="toggleLoading1" :class="{ active: isLoading1 }" class="control-btn">
          {{ isLoading1 ? '停止基础 Loading' : '开始基础 Loading' }}
        </button>
        <button @click="toggleLoading2" :class="{ active: isLoading2 }" class="control-btn primary">
          {{ isLoading2 ? '停止彩色 Loading' : '开始彩色 Loading' }}
        </button>
        <button @click="triggerAsyncValidation" class="control-btn success">
          触发异步验证
        </button>
        <button @click="triggerSearch" class="control-btn info">
          触发搜索
        </button>
      </div>

      <!-- Loading 状态信息 -->
      <div class="loading-status">
        <h4>Loading 状态信息:</h4>
        <div class="status-grid">
          <div class="status-item">
            <strong>基础 Loading:</strong>
            <span :class="{ 'status-active': isLoading1 }">
              {{ isLoading1 ? '加载中' : '未加载' }}
            </span>
          </div>
          <div class="status-item">
            <strong>彩色 Loading:</strong>
            <span :class="{ 'status-active': isLoading2 }">
              {{ isLoading2 ? '加载中 (Primary)' : '未加载' }}
            </span>
          </div>
          <div class="status-item">
            <strong>异步验证:</strong>
            <span :class="{ 'status-validating': isValidating }">
              {{ isValidating ? '验证中...' : '等待验证' }}
            </span>
          </div>
          <div class="status-item">
            <strong>搜索状态:</strong>
            <span :class="{ 'status-searching': isSearching }">
              {{ isSearching ? '搜索中...' : '等待搜索' }}
            </span>
          </div>
        </div>
      </div>

      <div class="loading-info">
        <h4>Loading 功能特性:</h4>
        <ul>
          <li>
            <strong>基础用法:</strong>
            <code>:loading="true"</code>
            显示默认加载状态
          </li>
          <li>
            <strong>彩色加载:</strong>
            <code>:loading="'primary'"</code>
            显示指定颜色的加载状态
          </li>
          <li>
            <strong>异步验证:</strong>
            结合验证规则，在异步验证时自动显示加载状态
          </li>
          <li>
            <strong>搜索场景:</strong>
            在搜索或数据获取时显示加载状态
          </li>
          <li>
            <strong>用户体验:</strong>
            提供视觉反馈，告知用户操作正在进行中
          </li>
        </ul>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 字符计数器 -->
    <DemoSection title="字符计数器">
      <div class="demo-row">
        <sp-text-field v-model="counterValue1" label="基础计数器2" placeholder="输入内容查看计数" counter />
        <sp-text-field maxlength="20" v-model="counterValue2" label="限制长度计数器" placeholder="最多20个字符，试试输入更多" :counter="20" max="2"/>
        <sp-text-field v-model="counterValue3" label="持久计数器" placeholder="计数器始终显示" counter persistent-counter />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 图标和插槽 -->
    <DemoSection title="图标和插槽">
      <div class="demo-row">
        <sp-text-field v-model="iconValue1" label="前置图标" placeholder="搜索内容" prepend-icon="search" />
        <sp-text-field v-model="iconValue2" label="后置图标" placeholder="输入密码" append-icon="visibility" type="password" />
        <sp-text-field v-model="iconValue3" label="内部图标" placeholder="用户名" prepend-inner-icon="person"
          append-inner-icon="clear" clearable />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 尺寸演示 -->
    <DemoSection title="尺寸演示">
      <div class="demo-row">
        <sp-text-field v-model="sizeValue1" label="小尺寸" placeholder="小尺寸输入" size="small" />
        <sp-text-field v-model="sizeValue2" label="默认尺寸" placeholder="默认尺寸输入" />
        <sp-text-field v-model="sizeValue3" label="大尺寸" placeholder="大尺寸输入" size="large" />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 高级功能 -->
    <DemoSection title="高级功能">
      <div class="demo-row">
        <sp-text-field v-model="advancedValue1" label="可清除" placeholder="可清除的输入" clearable />
        <sp-text-field v-model="advancedValue2" label="自动聚焦" placeholder="页面加载时自动聚焦" />
        <sp-text-field v-model="advancedValue3" label="持久占位符" placeholder="持久显示的占位符" persistent-placeholder />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 验证和提示 -->
    <DemoSection title="验证和提示">
      <div class="demo-row">
        <sp-text-field v-model="validationValue1" label="必填字段" placeholder="必须填写" :rules="[v => !!v || '此字段为必填项']"
          required />
        <sp-text-field v-model="validationValue2" label="邮箱验证" placeholder="输入有效邮箱" :rules="emailRules" type="email" />
        <sp-text-field v-model="validationValue3" label="带提示信息" placeholder="查看提示信息" hint="这是一个提示信息" persistent-hint />
      </div>
    </DemoSection>

    <!-- 高级验证功能演示 -->
    <DemoSection title="高级验证功能演示 (validation.ts)">
      <div class="demo-row">
        <sp-text-field v-model="advancedValidation1" label="必填验证" placeholder="此字段为必填" :rules="requiredRules"
          validate-on="input" />

        <sp-text-field v-model="advancedValidation2" label="长度验证" placeholder="6-20个字符" :rules="lengthRules"
          validate-on="blur" counter="20" />

        <sp-text-field v-model="advancedValidation3" label="正则验证" placeholder="只能输入数字" :rules="numberOnlyRules"
          validate-on="input" />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 复合验证规则 -->
    <DemoSection title="复合验证规则">
      <div class="demo-row">
        <sp-text-field v-model="advancedValidation4" label="密码强度验证" placeholder="包含大小写字母、数字、特殊字符" type="password"
          :rules="passwordStrengthRules" validate-on="input" :max-errors="3" />

        <sp-text-field v-model="advancedValidation5" label="手机号验证" placeholder="请输入11位手机号" :rules="phoneRules"
          validate-on="blur" />

        <sp-text-field v-model="advancedValidation6" label="身份证验证" placeholder="请输入18位身份证号" :rules="idCardRules"
          validate-on="blur" />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 异步验证 -->
    <DemoSection title="异步验证">
      <div class="demo-row">
        <sp-text-field v-model="advancedValidation7" label="用户名唯一性验证" placeholder="检查用户名是否已存在"
          :rules="usernameAsyncRules" validate-on="blur" :loading="isValidatingUsername" />

        <sp-text-field v-model="advancedValidation8" label="邮箱唯一性验证" placeholder="检查邮箱是否已注册" :rules="emailAsyncRules"
          validate-on="blur" :loading="isValidatingEmail" />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 验证时机控制 -->
    <DemoSection title="验证时机控制">
      <div class="demo-row">
        <sp-text-field v-model="advancedValidation9" label="输入时验证 (input)" placeholder="实时验证"
          :rules="[v => v.length >= 3 || '至少输入3个字符']" validate-on="input" />

        <sp-text-field v-model="advancedValidation10" label="失焦时验证 (blur)" placeholder="失去焦点时验证"
          :rules="[v => v.length >= 3 || '至少输入3个字符']" validate-on="blur" />

        <sp-text-field v-model="advancedValidation11" label="懒加载验证 (lazy)" placeholder="首次验证后才显示错误"
          :rules="[v => v.length >= 3 || '至少输入3个字符']" validate-on="lazy" />

        <sp-text-field v-model="advancedValidation12" label="急切验证 (eager)" placeholder="立即显示验证结果"
          :rules="[v => v.length >= 3 || '至少输入3个字符']" validate-on="eager" />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 错误消息控制 -->
    <DemoSection title="错误消息控制">
      <div class="demo-row">
        <sp-text-field v-model="advancedValidation13" label="最多显示1个错误" placeholder="多个验证规则，只显示第一个错误"
          :rules="multipleRules" :max-errors="1" />

        <sp-text-field v-model="advancedValidation14" label="最多显示3个错误" placeholder="多个验证规则，显示前3个错误"
          :rules="multipleRules" :max-errors="3" />

        <sp-text-field v-model="advancedValidation15" label="外部错误消息" placeholder="通过 error-messages 属性设置"
          :error="hasExternalError" :error-messages="externalErrorMessages" />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 验证状态展示 -->
    <DemoSection title="验证状态展示">
      <div class="demo-row">
        <sp-text-field v-model="advancedValidation1" label="必填验证" placeholder="此字段为必填" :rules="requiredRules"
          validate-on="input" />

        <sp-text-field v-model="advancedValidation2" label="长度验证" placeholder="6-20个字符" :rules="lengthRules"
          validate-on="blur" counter="20" />

        <sp-text-field v-model="advancedValidation3" label="正则验证" placeholder="只能输入数字" :rules="numberOnlyRules"
          validate-on="input" />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 验证状态信息 -->
    <div class="validation-status">
      <div class="status-grid">
        <div class="status-item">
          <strong>字段1 (必填):</strong>
          <span :class="getValidationStatusClass(advancedValidation1, requiredRules)
            ">
            {{ getValidationStatus(advancedValidation1, requiredRules) }}
          </span>
        </div>
        <div class="status-item">
          <strong>字段4 (密码):</strong>
          <span :class="getValidationStatusClass(
            advancedValidation4,
            passwordStrengthRules
          )
            ">
            {{
              getValidationStatus(advancedValidation4, passwordStrengthRules)
            }}
          </span>
        </div>
        <div class="status-item">
          <strong>字段7 (用户名):</strong>
          <span :class="{ 'status-validating': isValidatingUsername }">
            {{
              isValidatingUsername
                ? '验证中...'
                : getValidationStatus(advancedValidation7, usernameAsyncRules)
            }}
          </span>
        </div>
      </div>
    </div>

    <div class="validation-info">
      <h4>validation.ts 核心功能:</h4>
      <ul>
        <li>
          <strong>验证规则 (rules):</strong>
          支持同步和异步验证函数
        </li>
        <li>
          <strong>验证时机 (validateOn):</strong>
          input、blur、submit、lazy、eager
        </li>
        <li>
          <strong>错误控制 (maxErrors):</strong>
          限制显示的错误消息数量
        </li>
        <li>
          <strong>验证状态:</strong>
          isValid、isDirty、isPristine、isValidating
        </li>
        <li>
          <strong>验证方法:</strong>
          validate()、reset()、resetValidation()
        </li>
        <li>
          <strong>表单集成:</strong>
          自动注册到父级表单组件
        </li>
      </ul>
    </div>

    <sp-space :size="24" />

    <!-- VMessages 消息组件演示 -->
    <DemoSection title="VMessages 消息组件演示" subtitle="展示 VMessages 组件在 SPTextField 中的使用，包括错误消息、提示消息和自定义消息样式">

      <div class="demo-row">
        <sp-text-field v-model="messagesValue1" label="错误消息演示" placeholder="输入内容查看错误消息"
          :error="messagesValue1.length > 0 && messagesValue1.length < 3" :error-messages="messagesValue1.length > 0 && messagesValue1.length < 3
            ? ['内容长度至少需要3个字符']
            : []
            " />

        <sp-text-field v-model="messagesValue2" label="多条错误消息" placeholder="输入邮箱格式"
          :error="!isValidEmail(messagesValue2) && messagesValue2.length > 0"
          :error-messages="getEmailErrorMessages(messagesValue2)" />

        <sp-text-field v-model="messagesValue3" label="成功消息演示" placeholder="输入内容查看成功消息"
          :messages="messagesValue3.length >= 5 ? ['输入内容符合要求！'] : []" color="success" />
      </div>

      <div class="demo-row">
        <sp-text-field v-model="messagesValue4" label="提示信息演示" placeholder="查看持久提示信息" hint="这是一个持久显示的提示信息"
          persistent-hint />

        <sp-text-field v-model="messagesValue5" label="动态消息演示" placeholder="输入不同内容查看动态消息"
          :messages="getDynamicMessages(messagesValue5)" :color="getMessageColor(messagesValue5)" />

        <sp-text-field v-model="messagesValue6" label="自定义消息插槽" placeholder="自定义消息样式" :messages="['这是一个自定义样式的消息']">
          <template #message="{ message }">
            <div class="custom-message">
              <span class="custom-message-icon">💡</span>
              <span class="custom-message-text">{{ message }}</span>
            </div>
          </template>
        </sp-text-field>
      </div>

      <div class="messages-info">
        <h4>VMessages 组件特性:</h4>
        <ul>
          <li>
            <strong>active:</strong>
            控制消息是否显示
          </li>
          <li>
            <strong>messages:</strong>
            消息内容数组或字符串
          </li>
          <li>
            <strong>color:</strong>
            消息文本颜色
          </li>
          <li>
            <strong>message 插槽:</strong>
            自定义消息渲染方式
          </li>
        </ul>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 事件演示 -->
    <DemoSection title="事件演示">
      <div class="demo-row">
        <sp-text-field v-model="eventValue" label="事件监听" placeholder="输入内容触发事件" @input="onInput" @focus="onFocus"
          @blur="onBlur" @click:clear="onClear" />
      </div>
      <div class="event-log">
        <h4>事件日志:</h4>
        <ul>
          <li v-for="(log, index) in eventLogs" :key="index">
            {{ log }}
          </li>
        </ul>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 轻量版 SPTextFieldLite 演示 -->
    <DemoSection title="SPTextFieldLite（轻量版）">
      <div class="demo-row">
        <sp-text v-model="liteValue1" clearable placeholder="Lite Outlined（无 label，自定义样式）" />
        <sp-text v-model="liteValue1" color="red" placeholder="Lite Outlined（无 label，自定义样式）" />

        <sp-text v-model="liteValue2" variant="filled" color="rgb(52,152,219)"
          placeholder="Lite Filled（无 label，自定义样式）" />
      </div>
      <div class="demo-row">
        <sp-text v-model="liteValue3" color="rgb(52,152,219)" placeholder="带内置前后缀（点击有事件）" prepend-inner-icon="Search"
          append-inner-icon="Calendar" @click:prependInner="() => addLiteLog('点击了内置前缀')"
          @click:appendInner="() => addLiteLog('点击了内置后缀')" clearable />
        <sp-text v-model="liteValue4" placeholder="带外置前后缀 + 校验" :rules="requiredRules" prepend-icon="Information"
          append-icon="Information" @click:prepend="() => addLiteLog('点击了外置前缀')"
          @click:append="() => addLiteLog('点击了外置后缀')" />
        <sp-text v-model="liteValue4" placeholder="带外置前后缀 + 校验" :rules="requiredRules" variant="filled"
          prepend-icon="Information" append-icon="Information" @click:prepend="() => addLiteLog('点击了外置前缀')"
          @click:append="() => addLiteLog('点击了外置后缀')" />
      </div>
      <div class="demo-row">
        <sp-text v-model="liteValue5" size="small" placeholder="大小：small" />
        <sp-text v-model="liteValue6" size="medium" placeholder="大小：medium（默认）" />
        <sp-text v-model="liteValue7" size="large" placeholder="大小：large" />
        <sp-text v-model="liteValue8" variant="plain" :counter="20" color="#6c5ce7" placeholder="Plain 变体" />
      </div>
      <div class="demo-row">
        <sp-text v-model="counterInsideValue1" placeholder="内部计数器（最大20字符）" :counter="20" counter-position="inside"
          maxlength="20" />
        <sp-text v-model="counterInsideValue2" placeholder="内部计数器 + 清除按钮" :counter="30" counter-position="inside"
          maxlength="30" clearable variant="filled" />
      </div>
      <div class="demo-row">
        <sp-text v-model="counterValue1" placeholder="计数器（最大20字符）" :counter="20" maxlength="20" />
        <sp-text v-model="counterValue2" placeholder="计数器（最大50字符）" :counter="50" maxlength="50" variant="filled" />
        <sp-text v-model="counterValue3" placeholder="持久计数器" :counter="30" persistent-counter maxlength="30" />
      </div>
      <div style="font-size:13px;color:#777">事件：{{ liteLogs.join('，') }}</div>
      <p>当前：{{ liteValue1 }}, {{ liteValue2 }}</p>
      <p>计数器值：{{ counterValue1 }} ({{ counterValue1.length }}/20), {{ counterValue2 }} ({{ counterValue2.length }}/50),
        {{ counterValue3 }} ({{ counterValue3.length }}/30)</p>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

// 基础用法
const basicValue = ref('')
const basicValue2 = ref('')
const basicValue3 = ref('')

// Lite 示例
const liteValue1 = ref('')
const liteValue2 = ref('')
const liteValue3 = ref('')
const liteValue4 = ref('')
const liteValue5 = ref('')
const liteValue6 = ref('')
const liteValue7 = ref('')
const liteValue8 = ref('')
const liteLogs = ref<string[]>([])
const addLiteLog = (msg: string) => liteLogs.value.push(msg)

// 计数器示例
const counterValue1 = ref('')
const counterValue2 = ref('')
const counterValue3 = ref('')

// 颜色演示
const colorValue1 = ref('')
const colorValue2 = ref('')
const colorValue3 = ref('')
const colorValue4 = ref('')
const colorValue5 = ref('')

// 不同变体
const variantValue1 = ref('')
const variantValue2 = ref('')
const variantValue22 = ref('222')
const variantValue3 = ref('')
const variantValue4 = ref('')

// 不同输入类型
const emailValue = ref('')
const passwordValue = ref('')
const numberValue = ref('')
const dateValue = ref('')

// 状态演示
const stateValue1 = ref('')
const stateValue2 = ref('禁用状态的值')
const stateValue3 = ref('只读状态的值')
const stateValue4 = ref('错误状态的值')

// Loading 状态演示
const loadingValue1 = ref('')
const loadingValue2 = ref('')
const loadingValue3 = ref('')
const loadingValue4 = ref('')

// Loading 控制状态
const isLoading1 = ref(false)
const isLoading2 = ref(false)
const isValidating = ref(false)
const isSearching = ref(false)

// 搜索防抖定时器
let searchTimer: NodeJS.Timeout | null = null


// 图标和插槽
const iconValue1 = ref('')
const iconValue2 = ref('')
const iconValue3 = ref('')

// 尺寸演示
const sizeValue1 = ref('')
const sizeValue2 = ref('')
const sizeValue3 = ref('')

// 高级功能
const advancedValue1 = ref('')
const advancedValue2 = ref('')
const advancedValue3 = ref('')

// 验证和提示
const validationValue1 = ref('')
const validationValue2 = ref('')
const validationValue3 = ref('')

// 高级验证功能演示
const advancedValidation1 = ref('')
const advancedValidation2 = ref('')
const advancedValidation3 = ref('')
const advancedValidation4 = ref('')
const advancedValidation5 = ref('')
const advancedValidation6 = ref('')
const advancedValidation7 = ref('')
const advancedValidation8 = ref('')
const advancedValidation9 = ref('')
const advancedValidation10 = ref('')
const advancedValidation11 = ref('')
const advancedValidation12 = ref('')
const advancedValidation13 = ref('')
const advancedValidation14 = ref('')
const advancedValidation15 = ref('')

// 异步验证状态
const isValidatingUsername = ref(false)
const isValidatingEmail = ref(false)

// 外部错误状态
const hasExternalError = ref(false)
const externalErrorMessages = ref([
  '这是一个外部设置的错误消息',
  '可以有多条错误消息',
])

// VMessages 消息演示
const messagesValue1 = ref('')
const messagesValue2 = ref('')
const messagesValue3 = ref('')
const messagesValue4 = ref('')
const messagesValue5 = ref('')
const messagesValue6 = ref('')

// 事件演示
const eventValue = ref('')

// 内部计数器示例的响应式变量
const counterInsideValue1 = ref('')
const counterInsideValue2 = ref('')
const eventLogs = ref<string[]>([])

// 邮箱验证规则
const emailRules = [
  (v: string) => !!v || '邮箱为必填项',
  (v: string) => /.+@.+\..+/.test(v) || '邮箱格式不正确',
]

// 高级验证规则
const requiredRules = [(v: string) => !!v || '此字段为必填项']

const lengthRules = [
  (v: string) => !!v || '此字段为必填项',
  (v: string) => v.length >= 6 || '长度至少6个字符',
  (v: string) => v.length <= 20 || '长度不能超过20个字符',
]

const numberOnlyRules = [(v: string) => /^\d*$/.test(v) || '只能输入数字']

const passwordStrengthRules = [
  (v: string) => !!v || '密码为必填项',
  (v: string) => v.length >= 8 || '密码长度至少8位',
  (v: string) => /[a-z]/.test(v) || '密码必须包含小写字母',
  (v: string) => /[A-Z]/.test(v) || '密码必须包含大写字母',
  (v: string) => /\d/.test(v) || '密码必须包含数字',
  (v: string) => /[!@#$%^&*(),.?":{}|<>]/.test(v) || '密码必须包含特殊字符',
]

const phoneRules = [
  (v: string) => !!v || '手机号为必填项',
  (v: string) => /^1[3-9]\d{9}$/.test(v) || '请输入正确的11位手机号',
]

const idCardRules = [
  (v: string) => !!v || '身份证号为必填项',
  (v: string) =>
    /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
      v
    ) || '请输入正确的18位身份证号',
]

const multipleRules = [
  (v: string) => !!v || '此字段为必填项',
  (v: string) => v.length >= 3 || '长度至少3个字符',
  (v: string) => v.length <= 10 || '长度不能超过10个字符',
  (v: string) => /^[a-zA-Z0-9]+$/.test(v) || '只能包含字母和数字',
  (v: string) => !/^\d+$/.test(v) || '不能全部是数字',
]

// 异步验证规则
const usernameAsyncRules = [
  (v: string) => !!v || '用户名为必填项',
  (v: string) => v.length >= 3 || '用户名至少3个字符',
  async (v: string) => {
    if (!v || v.length < 3) return true

    isValidatingUsername.value = true

    // 模拟异步验证
    await new Promise(resolve => setTimeout(resolve, 1000))

    isValidatingUsername.value = false

    // 模拟用户名已存在的情况
    const existingUsernames = ['admin', 'user', 'test', 'demo']
    return !existingUsernames.includes(v.toLowerCase()) || '用户名已存在'
  },
]

const emailAsyncRules = [
  (v: string) => !!v || '邮箱为必填项',
  (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || '邮箱格式不正确',
  async (v: string) => {
    if (!v || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return true

    isValidatingEmail.value = true

    // 模拟异步验证
    await new Promise(resolve => setTimeout(resolve, 800))

    isValidatingEmail.value = false

    // 模拟邮箱已注册的情况
    const existingEmails = [
      'admin@example.com',
      'user@test.com',
      'demo@demo.com',
    ]
    return !existingEmails.includes(v.toLowerCase()) || '邮箱已被注册'
  },
]

// Loading 演示的异步验证规则
const asyncValidationRules = [
  (v: string) => !!v || '此字段为必填项',
  async (v: string) => {
    if (!v) return true

    isValidating.value = true

    // 模拟异步验证（检查用户名是否可用）
    await new Promise(resolve => setTimeout(resolve, 1500))

    isValidating.value = false

    // 模拟验证结果
    const unavailableNames = ['admin', 'root', 'test', 'demo', 'user']
    return (
      !unavailableNames.includes(v.toLowerCase()) ||
      '该用户名不可用，请尝试其他用户名'
    )
  },
]

// VMessages 相关方法
const isValidEmail = (email: string): boolean => {
  if (!email) return true // 空值不显示错误
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const getEmailErrorMessages = (email: string): string[] => {
  if (!email) return []
  const errors: string[] = []

  if (email.length < 3) {
    errors.push('邮箱长度至少需要3个字符')
  }
  if (!email.includes('@')) {
    errors.push('邮箱必须包含@符号')
  }
  if (!email.includes('.')) {
    errors.push('邮箱必须包含域名后缀')
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('邮箱格式不正确')
  }

  return errors
}

const getDynamicMessages = (value: string): string[] => {
  if (!value) return []

  if (value.length < 3) {
    return ['输入内容太短']
  } else if (value.length >= 3 && value.length < 8) {
    return ['输入内容长度适中']
  } else if (value.length >= 8) {
    return ['输入内容较长，很好！']
  }

  return []
}

const getMessageColor = (value: string): string => {
  if (!value) return 'default'

  if (value.length < 3) {
    return 'warning'
  } else if (value.length >= 3 && value.length < 8) {
    return 'info'
  } else {
    return 'success'
  }
}

// 验证状态相关方法
const getValidationStatus = (value: string, rules: any[]): string => {
  if (!value) return '未输入'

  for (const rule of rules) {
    if (typeof rule === 'function') {
      const result = rule(value)
      if (result !== true) {
        return '验证失败'
      }
    }
  }

  return '验证通过'
}

const getValidationStatusClass = (value: string, rules: any[]): string => {
  if (!value) return 'status-empty'

  for (const rule of rules) {
    if (typeof rule === 'function') {
      const result = rule(value)
      if (result !== true) {
        return 'status-error'
      }
    }
  }

  return 'status-success'
}

// 事件处理函数
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  eventLogs.value.unshift(`输入事件: ${target.value}`)
  if (eventLogs.value.length > 5) eventLogs.value.pop()
}

const onFocus = () => {
  eventLogs.value.unshift('获得焦点')
  if (eventLogs.value.length > 5) eventLogs.value.pop()
}

const onBlur = () => {
  eventLogs.value.unshift('失去焦点')
  if (eventLogs.value.length > 5) eventLogs.value.pop()
}

const onClear = () => {
  eventLogs.value.unshift('清除按钮被点击')
  if (eventLogs.value.length > 5) eventLogs.value.pop()
}

// Loading 控制方法
const toggleLoading1 = () => {
  isLoading1.value = !isLoading1.value
}

const toggleLoading2 = () => {
  isLoading2.value = !isLoading2.value
}

const triggerAsyncValidation = async () => {
  if (isValidating.value) return

  loadingValue3.value = 'testuser' // 设置一个测试值

  // 手动触发验证
  isValidating.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  isValidating.value = false
}

const triggerSearch = async () => {
  if (isSearching.value) return

  isSearching.value = true
  loadingValue4.value = '搜索关键词'

  // 模拟搜索请求
  await new Promise(resolve => setTimeout(resolve, 2000))

  isSearching.value = false
  loadingValue4.value = '搜索完成'
}

const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value

  // 清除之前的定时器
  if (searchTimer) {
    clearTimeout(searchTimer)
  }

  // 如果有输入内容，设置防抖搜索
  if (value.trim()) {
    searchTimer = setTimeout(() => {
      isSearching.value = true

      // 模拟搜索
      setTimeout(() => {
        isSearching.value = false
      }, 1000)
    }, 500) // 500ms 防抖
  }
}
</script>

<style scoped>
.sptextfield-demo-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
}

.demo-section {
  margin-bottom: 40px;
}

.demo-section h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.demo-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.demo-row > * {
  flex: 1;
  min-width: 200px;
}

.event-log {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
  max-height: 200px;
  overflow-y: auto;
}

.event-log h4 {
  margin: 0 0 8px 0;
  color: #333;
}

.event-log ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.event-log li {
  padding: 4px 0;
  border-bottom: 1px solid #e9ecef;
  font-family: monospace;
  font-size: 12px;
}

/* VMessages 自定义样式 */
.custom-message {
  display: flex;
  align-items: center;
  gap: 8px;
}

.custom-message-icon {
  font-size: 16px;
}

.custom-message-text {
  color: #2196f3;
  font-weight: 500;
}

.messages-info {
  background: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
}

.messages-info h4 {
  margin: 0 0 8px 0;
  color: #333;
}

.messages-info ul {
  margin: 0;
  padding-left: 20px;
}

.messages-info li {
  margin-bottom: 4px;
}

.messages-info strong {
  color: #6c5ce7;
  font-weight: 600;
}

/* 高级验证功能样式 */
.validation-subsection {
  margin-bottom: 30px;
}

.validation-subsection h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 18px;
  border-left: 4px solid #3498db;
  padding-left: 12px;
}

.validation-status {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #e74c3c;
  margin: 20px 0;
}

.validation-status h3 {
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 16px;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.status-item strong {
  color: #2c3e50;
  font-weight: 600;
}

.status-empty {
  color: #95a5a6;
  font-style: italic;
}

.status-error {
  color: #e74c3c;
  font-weight: 500;
}

.status-success {
  color: #27ae60;
  font-weight: 500;
}

.status-validating {
  color: #f39c12;
  font-weight: 500;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}

.validation-info {
  background: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
}

.validation-info h4 {
  margin: 0 0 8px 0;
  color: #333;
}

.validation-info ul {
  margin: 0;
  padding-left: 20px;
}

.validation-info li {
  margin-bottom: 4px;
}

.validation-info strong {
  color: #27ae60;
  font-weight: 600;
}

/* Loading 控制按钮样式 */
.loading-controls {
  display: flex;
  gap: 12px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.control-btn {
  padding: 8px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  background: white;
  color: #555;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 120px;
}

.control-btn:hover {
  border-color: #3498db;
  color: #3498db;
  transform: translateY(-1px);
}

.control-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.control-btn.active {
  background: #3498db;
  border-color: #3498db;
  color: white;
}

.control-btn.primary {
  border-color: #3498db;
  color: #3498db;
}

.control-btn.primary.active {
  background: #3498db;
  color: white;
}

.control-btn.success {
  border-color: #27ae60;
  color: #27ae60;
}

.control-btn.success:hover {
  border-color: #27ae60;
  color: #27ae60;
}

.control-btn.info {
  border-color: #6c5ce7;
  color: #6c5ce7;
}

.control-btn.info:hover {
  border-color: #6c5ce7;
  color: #6c5ce7;
}

/* Loading 状态信息样式 */
.loading-status {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #3498db;
  margin: 20px 0;
}

.loading-status h4 {
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 16px;
}

.status-active {
  color: #3498db;
  font-weight: 600;
  animation: pulse 1.5s ease-in-out infinite;
}

.status-searching {
  color: #6c5ce7;
  font-weight: 600;
  animation: pulse 1.5s ease-in-out infinite;
}

/* Loading 信息样式 */
.loading-info {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #3498db;
  margin-top: 20px;
}

.loading-info h4 {
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 16px;
}

.loading-info ul {
  margin: 0;
  padding-left: 20px;
}

.loading-info li {
  margin-bottom: 8px;
  color: #555;
  line-height: 1.5;
}

.loading-info strong {
  color: #3498db;
  font-weight: 600;
}

.loading-info code {
  background: #e8f4fd;
  color: #2980b9;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .demo-row {
    grid-template-columns: 1fr;
  }

  .sp-text-field-demo {
    padding: 10px;
  }

  .messages-info,
  .validation-info,
  .loading-status,
  .loading-info {
    padding: 15px;
  }

  .status-grid {
    grid-template-columns: 1fr;
  }

  .validation-subsection h3 {
    font-size: 16px;
  }

  .loading-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .control-btn {
    min-width: auto;
  }
}
</style>
