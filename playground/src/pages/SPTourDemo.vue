<template>
  <DemoContainer title="SPTour 引导漫游组件">
    <!-- 控制面板 -->
    <DemoSection title="控制面板" subtitle="启动不同类型的引导流程">
      <div class="control-buttons">
        <sp-btn @click="startBasicTour" color="success" size="large">
          🚀 开始基础引导
        </sp-btn>
        <sp-btn @click="startAdvancedTour" color="primary" size="large">
          ⭐ 高级功能引导
        </sp-btn>
        <sp-btn @click="stopTour" variant="outlined" size="large">
          ⏹️ 停止引导
        </sp-btn>
      </div>
      <div class="tour-status">
        <p><strong>当前状态:</strong> {{ showTour ? '引导进行中' : '未开始' }}</p>
        <p><strong>当前步骤:</strong> {{ (currentStep + 1) + ' / ' + currentTourSteps.length }}</p>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 功能演示区域 -->
    <DemoSection title="功能演示区域" subtitle="这些是应用的主要功能模块">
      <div class="feature-grid">
        <div class="feature-card" id="feature-1">
          <div class="feature-icon">📊</div>
          <h4>数据统计</h4>
          <p>查看详细的数据分析和统计报告</p>
          <sp-btn size="small">查看详情</sp-btn>
        </div>

        <div class="feature-card" id="feature-2">
          <div class="feature-icon">⚙️</div>
          <h4>系统设置</h4>
          <p>配置系统参数和个人偏好设置</p>
          <sp-btn size="small">进入设置</sp-btn>
        </div>

        <div class="feature-card" id="feature-3">
          <div class="feature-icon">👥</div>
          <h4>用户管理</h4>
          <p>管理用户账户和权限分配</p>
          <sp-btn size="small">管理用户</sp-btn>
        </div>

        <div class="feature-card" id="feature-4">
          <div class="feature-icon">📝</div>
          <h4>内容编辑</h4>
          <p>创建和编辑各种类型的内容</p>
          <sp-btn size="small">开始编辑</sp-btn>
        </div>
      </div>
    </DemoSection>

    <!-- sp-tour 组件 -->
    <sp-tour
      v-model="showTour"
      v-model:current="currentStep"
      :steps="currentTourSteps"
      :closable="true"
      :show-indicator="true"
      :keyboard="true"
      :highlight-target="true"
      :mask="true"
      @finish="onTourFinish"
      @skip="onTourSkip"
      @close="onTourClose"
    />
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

const showTour = ref(false)
const currentStep = ref(0)
const currentTourSteps = ref<any[]>([])

const basicTourSteps = [
  {
    title: '欢迎使用 sp-tour 组件',
    description: '这是一个功能强大的用户引导组件，可以帮助新用户快速了解应用功能。',
    target: '.demo-container',
    placement: 'bottom',
  },
  {
    title: '功能区域',
    description: '这些是应用的主要功能模块，每个模块都有不同的作用。',
    target: '.feature-grid',
    placement: 'bottom',
  },
  {
    title: '数据统计功能',
    description: '这里可以查看详细的数据分析报告。',
    target: '#feature-1',
    placement: 'right',
  },
]

const advancedTourSteps = [
  {
    title: '数据统计功能',
    description: '这里可以查看详细的数据分析报告，包括用户行为、系统性能等指标。',
    target: '#feature-1',
    placement: 'right',
  },
  {
    title: '系统设置中心',
    description: '在系统设置中，您可以配置各种参数，包括主题、语言、通知等。',
    target: '#feature-2',
    placement: 'left',
  },
  {
    title: '用户管理模块',
    description: '管理所有用户账户，分配权限，查看用户活动状态。',
    target: '#feature-3',
    placement: 'right',
  },
  {
    title: '内容编辑器',
    description: '强大的内容编辑功能，支持富文本、图片、视频等多种媒体类型。',
    target: '#feature-4',
    placement: 'left',
  },
]

const startBasicTour = () => {
  currentTourSteps.value = basicTourSteps
  currentStep.value = 0
  showTour.value = true
}

const startAdvancedTour = () => {
  currentTourSteps.value = advancedTourSteps
  currentStep.value = 0
  showTour.value = true
}

const stopTour = () => {
  showTour.value = false
}

const onTourFinish = () => {
  console.log('引导完成')
  showTour.value = false
}

const onTourSkip = () => {
  console.log('跳过引导')
  showTour.value = false
}

const onTourClose = () => {
  console.log('关闭引导')
  showTour.value = false
}
</script>

<style scoped>
.control-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.tour-status {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.tour-status p {
  margin: 8px 0;
  color: #666;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-card h4 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 18px;
}

.feature-card p {
  margin: 0 0 16px 0;
  color: #666;
  line-height: 1.6;
}
</style>
