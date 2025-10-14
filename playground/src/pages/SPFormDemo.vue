<template>
  <div class="sp-form-demo">
    <h1>🎯 SPForm 表单组件演示</h1>
    <p class="description">
      SPForm 是基于 Speed
      风格的表单容器组件，提供统一的表单验证、提交和重置功能。
    </p>

    <!-- 基础表单演示 -->
    <section class="demo-section">
      <h2>📝 基础表单</h2>
      <div class="demo-container">
        <sp-form ref="basicFormRef" v-model="basicFormValid" @submit="onBasicSubmit" class="basic-form">
          <template #default="{
            isValid,
            isValidating,
            validate,
            reset,
            resetValidation,
          }">
            <div class="form-content">
              <!-- 用户名字段 -->
              <sp-text-field v-model="basicForm.username" label="用户名" placeholder="请输入用户名" :rules="usernameRules"
                required class="form-field" />

              <!-- 邮箱字段 -->
              <sp-text-field v-model="basicForm.email" label="邮箱" placeholder="请输入邮箱地址" type="email" :rules="emailRules"
                required class="form-field" />

              <!-- 密码字段 -->
              <sp-text-field v-model="basicForm.password" label="密码" placeholder="请输入密码" type="password"
                :rules="passwordRules" required class="form-field" />

              <!-- 表单状态显示 -->
              <div class="form-status">
                <p><strong>表单状态:</strong></p>
                <ul>
                  <li>表单有效: {{ isValid }}</li>
                  <li>验证中: {{ isValidating }}</li>
                  <li>表单数据: {{ JSON.stringify(basicForm, null, 2) }}</li>
                </ul>
              </div>

              <!-- 操作按钮 -->
              <div class="form-actions">
                <sp-btn type="submit" variant="elevated" color="primary" :disabled="!isValid" :loading="isValidating">
                  提交表单
                </sp-btn>

                <sp-btn type="button" variant="outlined" @click="validate">
                  手动验证
                </sp-btn>

                <sp-btn type="button" variant="text" @click="reset">
                  重置表单
                </sp-btn>

                <sp-btn type="button" variant="text" @click="resetValidation">
                  重置验证
                </sp-btn>
              </div>
            </div>
          </template>
        </sp-form>
      </div>
    </section>

    <!-- 高级表单演示 -->
    <section class="demo-section">
      <h2>🚀 高级表单功能</h2>
      <div class="demo-container">
        <sp-form ref="advancedFormRef" v-model="advancedFormValid" :fast-fail="fastFail" :disabled="formDisabled"
          :readonly="formReadonly" validate-on="blur" @submit="onAdvancedSubmit" class="advanced-form">
          <template #default="{
            isValid,
            isValidating,
            validate,
            reset,
            resetValidation,
            errors,
          }">
            <div class="form-content">
              <!-- 表单配置选项 -->
              <div class="form-config">
                <h3>表单配置</h3>
                <div class="config-row">
                  <sp-checkbox v-model="fastFail" label="快速失败模式" hint="遇到第一个验证错误时立即停止" />
                  <sp-checkbox v-model="formDisabled" label="禁用表单" />
                  <sp-checkbox v-model="formReadonly" label="只读表单" />
                </div>
              </div>

              <!-- 个人信息 -->
              <div class="form-group">
                <h3>个人信息</h3>
                <sp-text-field v-model="advancedForm.name" label="姓名" placeholder="请输入真实姓名" :rules="nameRules" required
                  class="form-field" />

                <sp-text-field v-model="advancedForm.phone" label="手机号" placeholder="请输入11位手机号" :rules="phoneRules"
                  required class="form-field" />

                <sp-text-field v-model="advancedForm.age" label="年龄" placeholder="请输入年龄" type="number" :rules="ageRules"
                  class="form-field" />
              </div>

              <!-- 地址信息 -->
              <div class="form-group">
                <h3>地址信息</h3>
                <sp-select v-model="advancedForm.province" label="省份" :items="provinces" :rules="requiredRules" required
                  class="form-field" />

                <sp-text-field v-model="advancedForm.address" label="详细地址" placeholder="请输入详细地址" :rules="addressRules"
                  class="form-field" />
              </div>

              <!-- 其他信息 -->
              <div class="form-group">
                <h3>其他信息</h3>
                <sp-textarea v-model="advancedForm.bio" label="个人简介" placeholder="请简单介绍一下自己..." :rules="bioRules"
                  rows="4" counter="200" class="form-field" />

                <sp-checkbox v-model="advancedForm.agree" label="我同意用户协议和隐私政策" :rules="agreeRules" required
                  class="form-field" />
              </div>

              <!-- 验证错误显示 -->
              <div v-if="errors.length > 0" class="form-errors">
                <h4>验证错误:</h4>
                <ul>
                  <li v-for="error in errors" :key="error.id">
                    <strong>{{ error.id }}:</strong>
                    {{ error.errorMessages.join(', ') }}
                  </li>
                </ul>
              </div>

              <!-- 表单状态显示 -->
              <div class="form-status">
                <p><strong>高级表单状态:</strong></p>
                <ul>
                  <li>表单有效: {{ isValid }}</li>
                  <li>验证中: {{ isValidating }}</li>
                  <li>快速失败: {{ fastFail }}</li>
                  <li>表单禁用: {{ formDisabled }}</li>
                  <li>表单只读: {{ formReadonly }}</li>
                  <li>错误数量: {{ errors.length }}</li>
                </ul>
              </div>

              <!-- 操作按钮 -->
              <div class="form-actions">
                <sp-btn type="submit" variant="elevated" color="primary" :disabled="!isValid" :loading="isValidating">
                  提交高级表单
                </sp-btn>

                <sp-btn type="button" variant="outlined" @click="validate">
                  验证表单
                </sp-btn>

                <sp-btn type="button" variant="text" @click="reset">
                  重置表单
                </sp-btn>

                <sp-btn type="button" variant="text" @click="resetValidation">
                  清除验证
                </sp-btn>
              </div>
            </div>
          </template>
        </sp-form>
      </div>
    </section>

    <!-- 提交结果显示 -->
    <section v-if="submitResults.length > 0" class="demo-section">
      <h2>📋 提交结果</h2>
      <div class="submit-results">
        <div v-for="(result, index) in submitResults" :key="index" class="result-item">
          <h4>{{ result.title }}</h4>
          <pre>{{ JSON.stringify(result.data, null, 2) }}</pre>
          <p class="result-time">提交时间: {{ result.timestamp }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// 表单引用
const basicFormRef = ref()
const advancedFormRef = ref()

// 表单验证状态
const basicFormValid = ref<boolean | null>(null)
const advancedFormValid = ref<boolean | null>(null)

// 表单配置
const fastFail = ref(false)
const formDisabled = ref(false)
const formReadonly = ref(false)

// 基础表单数据
const basicForm = reactive({
  username: '',
  email: '',
  password: '',
})

// 高级表单数据
const advancedForm = reactive({
  name: '',
  phone: '',
  age: '',
  province: '',
  address: '',
  bio: '',
  agree: false,
})

// 提交结果
const submitResults = ref<
  Array<{
    title: string
    data: any
    timestamp: string
  }>
>([])

// 省份选项
const provinces = [
  { title: '北京市', value: 'beijing' },
  { title: '上海市', value: 'shanghai' },
  { title: '广东省', value: 'guangdong' },
  { title: '浙江省', value: 'zhejiang' },
  { title: '江苏省', value: 'jiangsu' },
]

// 验证规则
const usernameRules = [
  (v: string) => !!v || '用户名不能为空',
  (v: string) => (v && v.length >= 3) || '用户名至少3个字符',
  (v: string) => (v && v.length <= 20) || '用户名不能超过20个字符',
]

const emailRules = [
  (v: string) => !!v || '邮箱不能为空',
  (v: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(v) || '请输入有效的邮箱地址'
  },
]

const passwordRules = [
  (v: string) => !!v || '密码不能为空',
  (v: string) => (v && v.length >= 6) || '密码至少6个字符',
  (v: string) => (v && v.length <= 50) || '密码不能超过50个字符',
]

const nameRules = [
  (v: string) => !!v || '姓名不能为空',
  (v: string) => (v && v.length >= 2) || '姓名至少2个字符',
]

const phoneRules = [
  (v: string) => !!v || '手机号不能为空',
  (v: string) => {
    const pattern = /^1[3-9]\d{9}$/
    return pattern.test(v) || '请输入有效的手机号'
  },
]

const ageRules = [
  (v: string) => {
    if (!v) return true // 年龄不是必填
    const age = parseInt(v)
    return (age >= 1 && age <= 120) || '年龄必须在1-120之间'
  },
]

const addressRules = [
  (v: string) => (v && v.length <= 100) || '地址不能超过100个字符',
]

const bioRules = [
  (v: string) => (v && v.length <= 200) || '个人简介不能超过200个字符',
]

const requiredRules = [(v: any) => !!v || '此字段为必填项']

const agreeRules = [(v: boolean) => v || '必须同意用户协议才能继续']

// 表单提交处理
const onBasicSubmit = async (e: any) => {
  console.log('基础表单提交事件:', e)

  try {
    const result = await e
    console.log('基础表单验证结果:', result)

    if (result.valid) {
      // 模拟提交
      await new Promise(resolve => setTimeout(resolve, 1000))

      submitResults.value.unshift({
        title: '基础表单提交成功',
        data: { ...basicForm },
        timestamp: new Date().toLocaleString(),
      })

      alert('基础表单提交成功！')
    } else {
      alert('表单验证失败，请检查输入内容')
    }
  } catch (error) {
    console.error('基础表单提交错误:', error)
    alert('表单提交失败')
  }
}

const onAdvancedSubmit = async (e: any) => {
  console.log('高级表单提交事件:', e)

  try {
    const result = await e
    console.log('高级表单验证结果:', result)

    if (result.valid) {
      // 模拟提交
      await new Promise(resolve => setTimeout(resolve, 1500))

      submitResults.value.unshift({
        title: '高级表单提交成功',
        data: { ...advancedForm },
        timestamp: new Date().toLocaleString(),
      })

      alert('高级表单提交成功！')
    } else {
      alert('表单验证失败，请检查输入内容')
    }
  } catch (error) {
    console.error('高级表单提交错误:', error)
    alert('表单提交失败')
  }
}
</script>

<style scoped>
.sp-form-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.description {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
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
  margin-bottom: 20px;
  color: #1976d2;
  border-bottom: 2px solid #1976d2;
  padding-bottom: 10px;
}

.demo-container {
  background: white;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-field {
  width: 100%;
}

.form-group {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: #f9f9f9;
}

.form-group h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  font-size: 18px;
}

.form-config {
  padding: 15px;
  background: #e3f2fd;
  border-radius: 6px;
  border-left: 4px solid #1976d2;
}

.config-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.form-status {
  padding: 15px;
  background: #f5f5f5;
  border-radius: 6px;
  border-left: 4px solid #4caf50;
}

.form-status ul {
  margin: 10px 0 0 0;
  padding-left: 20px;
}

.form-status li {
  margin-bottom: 5px;
  font-family: monospace;
}

.form-errors {
  padding: 15px;
  background: #ffebee;
  border-radius: 6px;
  border-left: 4px solid #f44336;
}

.form-errors h4 {
  margin-top: 0;
  color: #d32f2f;
}

.form-errors ul {
  margin: 10px 0 0 0;
  padding-left: 20px;
}

.form-errors li {
  margin-bottom: 5px;
  color: #d32f2f;
}

.form-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.submit-results {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result-item {
  padding: 20px;
  background: #e8f5e8;
  border-radius: 6px;
  border-left: 4px solid #4caf50;
}

.result-item h4 {
  margin-top: 0;
  color: #2e7d32;
}

.result-item pre {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 14px;
  margin: 10px 0;
}

.result-time {
  margin: 10px 0 0 0;
  font-size: 14px;
  color: #666;
  font-style: italic;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sp-form-demo {
    padding: 10px;
  }

  .demo-section {
    padding: 15px;
  }

  .demo-container {
    padding: 15px;
  }

  .config-row {
    flex-direction: column;
    gap: 10px;
  }

  .form-actions {
    flex-direction: column;
  }
}
</style>
