<template>
  <DemoContainer title="SPMsgBar 消息条组件">
    <!-- 控制面板 -->
    <DemoSection title="控制面板" subtitle="显示不同类型的消息">
      <div class="control-buttons">
        <sp-btn @click="showSuccessMsg" color="success">
          显示成功消息
        </sp-btn>
        <sp-btn @click="showWarningMsg" color="warning">
          显示警告消息
        </sp-btn>
        <sp-btn @click="showErrorMsg" color="error">
          显示错误消息
        </sp-btn>
        <sp-btn @click="showInfoMsg" color="info">
          显示信息消息
        </sp-btn>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="基本的消息通知">
      <sp-btn @click="basicMsgVisible = true" variant="outlined">
        显示基础消息
      </sp-btn>
      <SPMsgBar
        v-model="basicMsgVisible"
        text="这是一条基础消息通知"
        :timeout="5000"
      />
    </DemoSection>

    <sp-space :size="24" />

    <!-- 带操作按钮 -->
    <DemoSection title="带操作按钮" subtitle="可以添加操作按钮">
      <sp-btn @click="actionMsgVisible = true" variant="outlined">
        显示带操作的消息
      </sp-btn>
      <SPMsgBar
        v-model="actionMsgVisible"
        text="操作已完成，您可以撤销此操作"
        :timeout="5000"
      >
        <template #actions>
          <sp-btn @click="handleUndo" variant="text" size="small">
            撤销
          </sp-btn>
          <sp-btn @click="actionMsgVisible = false" variant="text" size="small">
            关闭
          </sp-btn>
        </template>
      </SPMsgBar>
    </DemoSection>
  </DemoContainer>

  <!-- 程序化消息容器 -->
  <SPMsgBarContainer />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'
import { SPMsgBar, SPMsgBarContainer, useMsgBar } from '@speed-ui/ui'

const msgBar = useMsgBar()

const basicMsgVisible = ref(false)
const actionMsgVisible = ref(false)

const showSuccessMsg = () => {
  msgBar.success('操作成功完成！', { timeout: 3000 })
}

const showWarningMsg = () => {
  msgBar.warning('请注意检查您的输入！', { timeout: 4000 })
}

const showErrorMsg = () => {
  msgBar.error('操作失败，请稍后重试', { timeout: 5000 })
}

const showInfoMsg = () => {
  msgBar.info('这是一条提示信息', { timeout: 3000 })
}

const handleUndo = () => {
  console.log('执行撤销操作')
  actionMsgVisible.value = false
}
</script>

<style scoped>
.control-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
</style>
