<template>
  <DemoContainer title="SPAlert 警告提示组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="最简单的警告提示">
      <SPAlert>这是一个基础的 Alert 提示</SPAlert>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同类型 -->
    <DemoSection title="不同类型" subtitle="提供四种类型的警告提示">
      <div class="alert-group">
        <SPAlert type="success">
          <strong>成功！</strong> 您的操作已成功完成。
        </SPAlert>
        <SPAlert type="info">
          <strong>提示：</strong> 这是一条普通的信息提示。
        </SPAlert>
        <SPAlert type="warning">
          <strong>警告！</strong> 请注意这个重要的警告信息。
        </SPAlert>
        <SPAlert type="error">
          <strong>错误！</strong> 操作失败，请重试。
        </SPAlert>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 带标题 -->
    <DemoSection title="带标题" subtitle="为警告提示添加标题">
      <div class="alert-group">
        <SPAlert type="success" title="操作成功">
          您的数据已经成功保存到服务器。
        </SPAlert>
        <SPAlert type="warning" title="注意事项">
          此操作将会影响所有相关的数据，请谨慎操作。
        </SPAlert>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 可关闭的提示 -->
    <DemoSection title="可关闭的提示" subtitle="添加关闭按钮的警告提示">
      <div class="alert-group">
        <SPAlert type="info" closable>
          这是一个可以关闭的提示，点击右侧的 × 按钮关闭。
        </SPAlert>
        <SPAlert type="success" title="欢迎回来！" closable @click:close="handleClose">
          您已成功登录系统，上次登录时间：2024-01-15 10:30
        </SPAlert>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 边框样式 -->
    <DemoSection title="边框样式" subtitle="在不同位置显示强调边框">
      <div class="alert-group">
        <SPAlert type="info" border="start">左侧边框样式</SPAlert>
        <SPAlert type="success" border="top">顶部边框样式</SPAlert>
        <SPAlert type="warning" border="end">右侧边框样式</SPAlert>
        <SPAlert type="error" border="bottom">底部边框样式</SPAlert>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 边框颜色 -->
    <DemoSection title="边框颜色" subtitle="自定义边框颜色">
      <div class="alert-group">
        <SPAlert border="start" border-color="primary">自定义主色调边框</SPAlert>
        <SPAlert border="start" border-color="success">自定义成功色边框</SPAlert>
        <SPAlert border="start" border-color="warning">自定义警告色边框</SPAlert>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 突出显示 -->
    <DemoSection title="突出显示" subtitle="使用 prominent 属性让图标更大更醒目">
      <div class="alert-group">
        <SPAlert type="info" prominent>
          这是一个突出显示的信息提示，图标更大更醒目。
        </SPAlert>
        <SPAlert type="error" prominent title="严重错误">
          系统检测到严重错误，请立即联系管理员处理。
        </SPAlert>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 密度 -->
    <DemoSection title="密度" subtitle="调整组件的内边距大小">
      <div class="alert-group">
        <SPAlert type="info" density="compact">紧凑密度的提示</SPAlert>
        <SPAlert type="info" density="default">默认密度的提示</SPAlert>
        <SPAlert type="info" density="comfortable">舒适密度的提示</SPAlert>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 自定义图标 -->
    <DemoSection title="自定义图标" subtitle="使用自定义图标">
      <div class="alert-group">
        <SPAlert type="success" icon="mdi-check-circle">
          使用自定义图标的成功提示
        </SPAlert>
        <SPAlert type="info" icon="mdi-information">
          使用自定义图标的信息提示
        </SPAlert>
        <SPAlert icon="mdi-fire" color="orange">
          使用火焰图标和橙色主题
        </SPAlert>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 无图标 -->
    <DemoSection title="无图标" subtitle="隐藏默认图标">
      <div class="alert-group">
        <SPAlert type="success" :icon="false">
          这是一个没有图标的成功提示
        </SPAlert>
        <SPAlert type="warning" :icon="false">
          这是一个没有图标的警告提示
        </SPAlert>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 变体样式 -->
    <DemoSection title="变体样式" subtitle="不同的视觉风格">
      <div class="alert-group">
        <SPAlert type="info" variant="flat">扁平样式（默认）</SPAlert>
        <SPAlert type="info" variant="elevated">提升样式（带阴影）</SPAlert>
        <SPAlert type="info" variant="tonal">色调样式</SPAlert>
        <SPAlert type="info" variant="outlined">轮廓样式</SPAlert>
        <SPAlert type="info" variant="text">文本样式</SPAlert>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- Outlined 轮廓样式 -->
    <DemoSection
      title="Outlined 轮廓样式"
      subtitle="彩色边框和文字，背景透明，适合突出但不强烈的提示"
    >
      <div class="alert-group">
        <SPAlert variant="outlined" color="purple" title="Outlined Alert">
          Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra
          felis nunc et lorem. Duis vel nibh at velit scelerisque suscipit.
        </SPAlert>

        <SPAlert type="success" variant="outlined">
          Praesent venenatis metus at tortor pulvinar varius. Aenean commodo ligula eget dolor.
          Praesent ac massa at ligula laoreet iaculis.
        </SPAlert>

        <SPAlert type="warning" variant="outlined">
          Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Suspendisse non
          nisl sit amet velit hendrerit rutrum.
        </SPAlert>

        <SPAlert type="error" variant="outlined" title="Error Alert">
          发生了一个错误，请检查您的输入并重试。如果问题持续存在，请联系技术支持。
        </SPAlert>

        <SPAlert type="info" variant="outlined" prominent>
          这是一个带有 prominent 属性的 outlined 样式提示，图标会更大更醒目。
        </SPAlert>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 圆角 -->
    <DemoSection title="圆角" subtitle="不同的圆角大小">
      <div class="alert-group">
        <SPAlert type="info" rounded="0">无圆角</SPAlert>
        <SPAlert type="info" rounded="sm">小圆角</SPAlert>
        <SPAlert type="info" rounded="lg">大圆角</SPAlert>
        <SPAlert type="info" rounded="xl">超大圆角</SPAlert>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 控制显示/隐藏 -->
    <DemoSection title="控制显示/隐藏" subtitle="通过 v-model 控制提示的显示状态">
      <div class="control-buttons">
        <SPBtn @click="showAlert = !showAlert">
          {{ showAlert ? '隐藏' : '显示' }} Alert
        </SPBtn>
        <SPBtn @click="resetAlert" color="secondary">重置</SPBtn>
      </div>
      <sp-space :size="16" />
      <SPAlert v-model="showAlert" type="info" title="可控制的提示" closable>
        这是一个可以通过按钮控制显示/隐藏的提示。关闭后可以通过"显示"按钮重新显示。
      </SPAlert>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 实际应用场景 -->
    <DemoSection title="实际应用场景" subtitle="常见的使用案例">
      <!-- 表单验证提示 -->
      <div class="scenario">
        <h3>表单验证提示</h3>
        <SPAlert
          v-if="formErrors.length > 0"
          type="error"
          title="表单验证失败"
          closable
          @click:close="formErrors = []"
        >
          <ul class="error-list">
            <li v-for="error in formErrors" :key="error">{{ error }}</li>
          </ul>
        </SPAlert>
        <SPBtn @click="simulateFormError">模拟表单错误</SPBtn>
      </div>

      <sp-space :size="20" />

      <!-- 操作成功提示 -->
      <div class="scenario">
        <h3>操作成功提示</h3>
        <SPAlert
          v-if="showSuccessMsg"
          type="success"
          title="保存成功"
          closable
          @click:close="showSuccessMsg = false"
        >
          您的更改已成功保存，{{ countdown }} 秒后自动关闭。
        </SPAlert>
        <SPBtn @click="simulateSuccess">模拟保存成功</SPBtn>
      </div>

      <sp-space :size="20" />

      <!-- 系统通知 -->
      <div class="scenario">
        <h3>系统通知</h3>
        <SPAlert type="warning" title="系统维护通知" prominent border="start">
          系统将于今晚 22:00 - 24:00 进行维护升级，届时将无法访问。请提前保存您的工作。
        </SPAlert>
      </div>

      <sp-space :size="20" />

      <!-- 帮助提示 -->
      <div class="scenario">
        <h3>帮助提示</h3>
        <SPAlert type="info" variant="tonal" icon="mdi-lightbulb-on">
          <strong>小提示：</strong> 您可以使用快捷键 Ctrl+S 快速保存当前内容。
        </SPAlert>
      </div>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

const showAlert = ref(true)
const formErrors = ref<string[]>([])
const showSuccessMsg = ref(false)
const countdown = ref(5)
let countdownTimer: ReturnType<typeof setInterval> | null = null

const handleClose = () => {
  console.log('Alert 被关闭了')
}

const resetAlert = () => {
  showAlert.value = true
}

const simulateFormError = () => {
  formErrors.value = ['用户名不能为空', '密码长度至少为 6 位', '邮箱格式不正确']
}

const simulateSuccess = () => {
  showSuccessMsg.value = true
  countdown.value = 5

  if (countdownTimer) {
    clearInterval(countdownTimer)
  }

  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      showSuccessMsg.value = false
      if (countdownTimer) {
        clearInterval(countdownTimer)
        countdownTimer = null
      }
    }
  }, 1000)
}

watch(showSuccessMsg, newVal => {
  if (!newVal && countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
})
</script>

<style scoped>
.alert-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.control-buttons {
  display: flex;
  gap: 12px;
}

.scenario {
  margin-bottom: 16px;
}

.scenario h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.error-list {
  margin: 0;
  padding-left: 20px;
}

.error-list li {
  margin: 4px 0;
}
</style>
