<template>
  <div class="sp-input-pwd-demo">
    <h1>🔐 SPInputPwd 密码输入框组件演示</h1>
    <input
      v-model="basicPassword"
      :type="show1 ? 'text' : 'password'"
    />
    <button @click="show1 = !show1">切换可见性</button>
    <!-- 基础用法 -->
    <section class="demo-section">
      <h2>基础用法</h2>
      <div class="demo-item">
        <h3>默认密码输入框</h3>

        <p>输入值: {{ basicPassword }}</p>
      </div>
      <sp-text-field
        v-model.trim="basicPassword"
        :append-inner-icon="show1 ? 'Eye' : 'EyeOff'"
        :type="show1 ? 'text' : 'password'"
        hint=" "
        label="Normal with hint text"
        name="input-10-1"
        counter
        @click:append-inner="show1 = !show1"
      />

      <div class="demo-item">
        <h3>带初始值的密码框</h3>
        <SPInputPwd
          v-model="initialPassword"
          label="初始密码"
          placeholder="已有初始值"
          style="width: 300px"
        />
        <p>输入值: {{ initialPassword }}</p>
      </div>
    </section>

    <!-- 可见性控制 -->
    <section class="demo-section">
      <h2>可见性控制</h2>
      <div class="demo-item">
        <h3>外部控制可见性</h3>
        <div style="margin-bottom: 10px">
          <label>
            <input
              type="checkbox"
              v-model="externalVisible"
            />
            外部控制密码可见性
          </label>
        </div>
        <SPInputPwd
          v-model="externalPassword"
          v-model:visible="externalVisible"
          label="外部控制密码"
          placeholder="可见性由外部控制"
          style="width: 300px"
        />
        <p>输入值: {{ externalPassword }}</p>
        <p>可见状态: {{ externalVisible }}</p>
      </div>

      <div class="demo-item">
        <h3>禁用可见性切换</h3>
        <SPInputPwd
          v-model="noTogglePassword"
          :visibility-toggle="false"
          label="无切换按钮"
          placeholder="无法切换可见性"
          style="width: 300px"
        />
        <p>输入值: {{ noTogglePassword }}</p>
      </div>
    </section>

    <!-- 不同样式变体 -->
    <section class="demo-section">
      <h2>样式变体</h2>
      <div class="demo-item">
        <h3>不同变体样式</h3>
        <div style="display: flex; flex-direction: column; gap: 20px">
          <SPInputPwd
            v-model="variantPassword1"
            label="填充样式"
            variant="filled"
            placeholder="填充样式密码框"
            style="width: 300px"
          />
          <SPInputPwd
            v-model="variantPassword2"
            label="轮廓样式"
            variant="outlined"
            placeholder="轮廓样式密码框"
            style="width: 300px"
          />
          <SPInputPwd
            v-model="variantPassword3"
            label="下划线样式"
            variant="underlined"
            placeholder="下划线样式密码框"
            style="width: 300px"
          />
          <SPInputPwd
            v-model="variantPassword4"
            label="简洁样式"
            variant="plain"
            placeholder="简洁样式密码框"
            style="width: 300px"
          />
        </div>
      </div>
    </section>

    <!-- 验证状态 -->
    <section class="demo-section">
      <h2>验证状态</h2>
      <div class="demo-item">
        <h3>不同验证状态</h3>
        <div style="display: flex; flex-direction: column; gap: 20px">
          <SPInputPwd
            v-model="validPassword"
            label="正确密码"
            placeholder="密码格式正确"
            :rules="passwordRules"
            style="width: 300px"
          />
          <SPInputPwd
            v-model="invalidPassword"
            label="错误密码"
            placeholder="密码格式错误"
            :rules="passwordRules"
            error
            error-messages="密码长度至少8位"
            style="width: 300px"
          />
        </div>
      </div>
    </section>

    <!-- 禁用和只读 -->
    <section class="demo-section">
      <h2>禁用和只读状态</h2>
      <div class="demo-item">
        <h3>状态演示</h3>
        <div style="display: flex; flex-direction: column; gap: 20px">
          <SPInputPwd
            v-model="disabledPassword"
            label="禁用状态"
            placeholder="禁用的密码框"
            disabled
            style="width: 300px"
          />
          <SPInputPwd
            v-model="readonlyPassword"
            label="只读状态"
            placeholder="只读的密码框"
            readonly
            style="width: 300px"
          />
        </div>
      </div>
    </section>

    <!-- 密码强度指示 -->
    <section class="demo-section">
      <h2>密码强度指示</h2>
      <div class="demo-item">
        <h3>带强度指示的密码框</h3>
        <SPInputPwd
          v-model="strengthPassword"
          label="密码强度"
          placeholder="输入密码查看强度"
          :rules="strengthRules"
          style="width: 300px"
        />
        <div
          class="password-strength"
          v-if="strengthPassword"
        >
          <div class="strength-bar">
            <div
              class="strength-fill"
              :class="strengthClass"
              :style="{ width: strengthPercentage + '%' }"
            ></div>
          </div>
          <p
            class="strength-text"
            :class="strengthClass"
          >
            密码强度: {{ strengthText }}
          </p>
        </div>
      </div>
    </section>

    <!-- 确认密码 -->
    <section class="demo-section">
      <h2>确认密码</h2>
      <div class="demo-item">
        <h3>密码确认表单</h3>
        <div style="display: flex; flex-direction: column; gap: 20px">
          <SPInputPwd
            v-model="newPassword"
            label="新密码"
            placeholder="请输入新密码"
            :rules="passwordRules"
            style="width: 300px"
          />
          <SPInputPwd
            v-model="confirmPassword"
            label="确认密码"
            placeholder="请再次输入密码"
            :rules="confirmPasswordRules"
            style="width: 300px"
          />
          <div v-if="newPassword && confirmPassword">
            <p :style="{ color: passwordsMatch ? '#4caf50' : '#f44336' }">
              {{ passwordsMatch ? '✓ 密码匹配' : '✗ 密码不匹配' }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 自定义图标 -->
    <section class="demo-section">
      <h2>自定义功能</h2>
      <div class="demo-item">
        <h3>带前缀图标</h3>
        <SPInputPwd
          v-model="customPassword"
          label="自定义密码框"
          placeholder="带前缀图标"
          prepend-inner-icon="lock"
          style="width: 300px"
           hint=""
        />
      </div>

      <div class="demo-item">
        <h3>带计数器</h3>
        <SPInputPwd
          v-model="counterPassword"
          label="带计数器"
          placeholder="显示字符计数"
          :counter="20"
          :rules="[v => v.length <= 20 || '密码不能超过20个字符']"
          style="width: 300px"
        />
      </div>
    </section>

    <!-- 实际应用场景 -->
    <section class="demo-section">
      <h2>实际应用场景</h2>
      <div class="demo-item">
        <h3>登录表单</h3>
        <div class="login-form">
          <SPTextField
            v-model="loginUsername"
            label="用户名"
            placeholder="请输入用户名"
            prepend-inner-icon="person"
            style="width: 300px; margin-bottom: 20px"
          />
          <SPInputPwd
            v-model="loginPassword"
            label="密码"
            placeholder="请输入密码"
            style="width: 300px; margin-bottom: 20px"
          />
          <div>
            <button
              class="login-btn"
              :disabled="!loginUsername || !loginPassword"
              @click="handleLogin"
            >
              登录
            </button>
          </div>
        </div>
      </div>

      <div class="demo-item">
        <h3>注册表单</h3>
        <div class="register-form">
          <SPTextField
            v-model="registerEmail"
            label="邮箱"
            placeholder="请输入邮箱"
            type="email"
            style="width: 300px; margin-bottom: 20px"
          />
          <SPInputPwd
            v-model="registerPassword"
            label="设置密码"
            placeholder="请设置密码"
            :rules="passwordRules"
            style="width: 300px; margin-bottom: 20px"
          />
          <SPInputPwd
            v-model="registerConfirmPassword"
            label="确认密码"
            placeholder="请再次输入密码"
            :rules="registerConfirmRules"
            style="width: 300px; margin-bottom: 20px"
          />
          <div>
            <button
              class="register-btn"
              :disabled="!canRegister"
              @click="handleRegister"
            >
              注册
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { SPInputPwd, SPTextField } from '@speed-ui/ui'

  // 基础用法
  const basicPassword = ref('')
  const initialPassword = ref('initial123')

  // 可见性控制
  const externalPassword = ref('')
  const externalVisible = ref(false)
  const noTogglePassword = ref('')

  // 样式变体
  const variantPassword1 = ref('')
  const variantPassword2 = ref('')
  const variantPassword3 = ref('')
  const variantPassword4 = ref('')
  const show1 = ref(false)
  // 验证状态
  const validPassword = ref('validpass123')
  const invalidPassword = ref('123')

  // 禁用和只读
  const disabledPassword = ref('disabled123')
  const readonlyPassword = ref('readonly123')

  // 密码强度
  const strengthPassword = ref('')

  // 确认密码
  const newPassword = ref('')
  const confirmPassword = ref('')

  // 自定义功能
  const customPassword = ref('')
  const counterPassword = ref('')

  // 登录表单
  const loginUsername = ref('')
  const loginPassword = ref('')

  // 注册表单
  const registerEmail = ref('')
  const registerPassword = ref('')
  const registerConfirmPassword = ref('')

  // 密码验证规则
  const passwordRules = [
    (v: string) => !!v || '密码不能为空',
    (v: string) => v.length >= 8 || '密码长度至少8位',
    (v: string) => /[A-Z]/.test(v) || '密码必须包含大写字母',
    (v: string) => /[a-z]/.test(v) || '密码必须包含小写字母',
    (v: string) => /[0-9]/.test(v) || '密码必须包含数字',
  ]

  // 确认密码规则
  const confirmPasswordRules = [
    (v: string) => !!v || '请确认密码',
    (v: string) => v === newPassword.value || '两次输入的密码不一致',
  ]

  // 注册确认密码规则
  const registerConfirmRules = [
    (v: string) => !!v || '请确认密码',
    (v: string) => v === registerPassword.value || '两次输入的密码不一致',
  ]

  // 密码强度规则
  const strengthRules = [(v: string) => !!v || '密码不能为空']

  // 计算属性
  const passwordsMatch = computed(() => {
    return (
      newPassword.value &&
      confirmPassword.value &&
      newPassword.value === confirmPassword.value
    )
  })

  const canRegister = computed(() => {
    return (
      registerEmail.value &&
      registerPassword.value &&
      registerConfirmPassword.value &&
      registerPassword.value === registerConfirmPassword.value &&
      registerPassword.value.length >= 8
    )
  })

  // 密码强度计算
  const passwordStrength = computed(() => {
    const password = strengthPassword.value
    if (!password) return 0

    let strength = 0
    if (password.length >= 8) strength += 20
    if (password.length >= 12) strength += 10
    if (/[a-z]/.test(password)) strength += 20
    if (/[A-Z]/.test(password)) strength += 20
    if (/[0-9]/.test(password)) strength += 15
    if (/[^A-Za-z0-9]/.test(password)) strength += 15

    return Math.min(strength, 100)
  })

  const strengthPercentage = computed(() => passwordStrength.value)

  const strengthText = computed(() => {
    const strength = passwordStrength.value
    if (strength < 30) return '弱'
    if (strength < 60) return '中等'
    if (strength < 80) return '强'
    return '很强'
  })

  const strengthClass = computed(() => {
    const strength = passwordStrength.value
    if (strength < 30) return 'weak'
    if (strength < 60) return 'medium'
    if (strength < 80) return 'strong'
    return 'very-strong'
  })

  // 方法
  const handleLogin = () => {
    alert(
      `登录信息:\n用户名: ${loginUsername.value}\n密码: ${loginPassword.value}`
    )
  }

  const handleRegister = () => {
    alert(
      `注册信息:\n邮箱: ${registerEmail.value}\n密码: ${registerPassword.value}`
    )
  }
</script>

<style scoped>
  .sp-input-pwd-demo {
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
    color: #1976d2;
    border-bottom: 2px solid #1976d2;
    padding-bottom: 10px;
  }

  .demo-item {
    margin-bottom: 30px;
    padding: 15px;
    background: white;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .demo-item h3 {
    margin-top: 0;
    color: #333;
  }

  .demo-item p {
    margin: 10px 0;
    color: #666;
    font-size: 14px;
  }

  /* 密码强度指示器样式 */
  .password-strength {
    margin-top: 10px;
  }

  .strength-bar {
    width: 300px;
    height: 6px;
    background: #e0e0e0;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 5px;
  }

  .strength-fill {
    height: 100%;
    transition: width 0.3s ease, background-color 0.3s ease;
  }

  .strength-fill.weak {
    background: #f44336;
  }

  .strength-fill.medium {
    background: #ff9800;
  }

  .strength-fill.strong {
    background: #2196f3;
  }

  .strength-fill.very-strong {
    background: #4caf50;
  }

  .strength-text {
    font-size: 12px;
    font-weight: 500;
  }

  .strength-text.weak {
    color: #f44336;
  }

  .strength-text.medium {
    color: #ff9800;
  }

  .strength-text.strong {
    color: #2196f3;
  }

  .strength-text.very-strong {
    color: #4caf50;
  }

  /* 表单样式 */
  .login-form,
  .register-form {
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;
  }

  .login-btn,
  .register-btn {
    padding: 10px 20px;
    background: #1976d2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s ease;
  }

  .login-btn:hover:not(:disabled),
  .register-btn:hover:not(:disabled) {
    background: #1565c0;
  }

  .login-btn:disabled,
  .register-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
</style>
