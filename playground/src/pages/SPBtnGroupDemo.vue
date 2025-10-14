<template>
  <DemoContainer title="SPBtnGroup 按钮组组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="将多个按钮组合在一起">
      <sp-btn-group>
        <sp-btn>按钮 1</sp-btn>
        <sp-btn>按钮 2</sp-btn>
        <sp-btn>按钮 3</sp-btn>
      </sp-btn-group>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同变体 -->
    <DemoSection title="不同变体" subtitle="支持多种视觉样式">
      <div class="demo-grid">
        <div>
          <h3 class="subsection-title">Elevated（浮起）</h3>
          <sp-btn-group variant="elevated">
            <sp-btn>左</sp-btn>
            <sp-btn>中</sp-btn>
            <sp-btn>右</sp-btn>
          </sp-btn-group>
        </div>

        <div>
          <h3 class="subsection-title">Flat（平面）</h3>
          <sp-btn-group variant="flat">
            <sp-btn>左</sp-btn>
            <sp-btn>中</sp-btn>
            <sp-btn>右</sp-btn>
          </sp-btn-group>
        </div>

        <div>
          <h3 class="subsection-title">Tonal（色调）</h3>
          <sp-btn-group variant="tonal">
            <sp-btn>左</sp-btn>
            <sp-btn>中</sp-btn>
            <sp-btn>右</sp-btn>
          </sp-btn-group>
        </div>

        <div>
          <h3 class="subsection-title">Outlined（轮廓）</h3>
          <sp-btn-group variant="outlined">
            <sp-btn>左</sp-btn>
            <sp-btn>中</sp-btn>
            <sp-btn>右</sp-btn>
          </sp-btn-group>
        </div>

        <div>
          <h3 class="subsection-title">Text（文本）</h3>
          <sp-btn-group variant="text">
            <sp-btn>左</sp-btn>
            <sp-btn>中</sp-btn>
            <sp-btn>右</sp-btn>
          </sp-btn-group>
        </div>

        <div>
          <h3 class="subsection-title">Plain（朴素）</h3>
          <sp-btn-group variant="plain">
            <sp-btn>左</sp-btn>
            <sp-btn>中</sp-btn>
            <sp-btn>右</sp-btn>
          </sp-btn-group>
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同颜色 -->
    <DemoSection title="不同颜色" subtitle="设置按钮组的主题色">
      <div class="button-row">
        <sp-btn-group color="primary">
          <sp-btn>主要</sp-btn>
          <sp-btn>按钮</sp-btn>
          <sp-btn>组</sp-btn>
        </sp-btn-group>

        <sp-btn-group color="secondary">
          <sp-btn>次要</sp-btn>
          <sp-btn>按钮</sp-btn>
          <sp-btn>组</sp-btn>
        </sp-btn-group>

        <sp-btn-group color="success">
          <sp-btn>成功</sp-btn>
          <sp-btn>按钮</sp-btn>
          <sp-btn>组</sp-btn>
        </sp-btn-group>

        <sp-btn-group color="warning">
          <sp-btn>警告</sp-btn>
          <sp-btn>按钮</sp-btn>
          <sp-btn>组</sp-btn>
        </sp-btn-group>

        <sp-btn-group color="error">
          <sp-btn>错误</sp-btn>
          <sp-btn>按钮</sp-btn>
          <sp-btn>组</sp-btn>
        </sp-btn-group>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同尺寸 -->
    <DemoSection title="不同尺寸" subtitle="调整按钮组的大小">
      <div class="button-col">
        <div>
          <h3 class="subsection-title">超小尺寸</h3>
          <sp-btn-group>
            <sp-btn size="x-small">按钮 1</sp-btn>
            <sp-btn size="x-small">按钮 2</sp-btn>
            <sp-btn size="x-small">按钮 3</sp-btn>
          </sp-btn-group>
        </div>

        <div>
          <h3 class="subsection-title">小尺寸</h3>
          <sp-btn-group>
            <sp-btn size="small">按钮 1</sp-btn>
            <sp-btn size="small">按钮 2</sp-btn>
            <sp-btn size="small">按钮 3</sp-btn>
          </sp-btn-group>
        </div>

        <div>
          <h3 class="subsection-title">默认尺寸</h3>
          <sp-btn-group>
            <sp-btn>按钮 1</sp-btn>
            <sp-btn>按钮 2</sp-btn>
            <sp-btn>按钮 3</sp-btn>
          </sp-btn-group>
        </div>

        <div>
          <h3 class="subsection-title">大尺寸</h3>
          <sp-btn-group>
            <sp-btn size="large">按钮 1</sp-btn>
            <sp-btn size="large">按钮 2</sp-btn>
            <sp-btn size="large">按钮 3</sp-btn>
          </sp-btn-group>
        </div>

        <div>
          <h3 class="subsection-title">超大尺寸</h3>
          <sp-btn-group>
            <sp-btn size="x-large">按钮 1</sp-btn>
            <sp-btn size="x-large">按钮 2</sp-btn>
            <sp-btn size="x-large">按钮 3</sp-btn>
          </sp-btn-group>
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 垂直方向 -->
    <DemoSection title="垂直方向" subtitle="按钮垂直排列">
      <div class="button-row">
        <sp-btn-group direction="vertical">
          <sp-btn>按钮 1</sp-btn>
          <sp-btn>按钮 2</sp-btn>
          <sp-btn>按钮 3</sp-btn>
        </sp-btn-group>

        <sp-btn-group direction="vertical" variant="outlined" color="primary">
          <sp-btn>复制</sp-btn>
          <sp-btn>粘贴</sp-btn>
          <sp-btn>删除</sp-btn>
        </sp-btn-group>

        <sp-btn-group direction="vertical" variant="tonal" color="success">
          <sp-btn>保存</sp-btn>
          <sp-btn>导出</sp-btn>
          <sp-btn>打印</sp-btn>
        </sp-btn-group>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 分割线 -->
    <DemoSection title="分割线" subtitle="按钮之间添加分割线">
      <div class="button-row">
        <sp-btn-group divided>
          <sp-btn>按钮 1</sp-btn>
          <sp-btn>按钮 2</sp-btn>
          <sp-btn>按钮 3</sp-btn>
        </sp-btn-group>

        <sp-btn-group divided variant="outlined" color="primary">
          <sp-btn>左对齐</sp-btn>
          <sp-btn>居中</sp-btn>
          <sp-btn>右对齐</sp-btn>
        </sp-btn-group>

        <sp-btn-group divided direction="vertical">
          <sp-btn>选项 A</sp-btn>
          <sp-btn>选项 B</sp-btn>
          <sp-btn>选项 C</sp-btn>
        </sp-btn-group>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 圆角 -->
    <DemoSection title="圆角样式" subtitle="不同的圆角大小">
      <div class="button-col">
        <div>
          <h3 class="subsection-title">无圆角</h3>
          <sp-btn-group rounded="0">
            <sp-btn>按钮 1</sp-btn>
            <sp-btn>按钮 2</sp-btn>
            <sp-btn>按钮 3</sp-btn>
          </sp-btn-group>
        </div>

        <div>
          <h3 class="subsection-title">小圆角</h3>
          <sp-btn-group rounded="sm">
            <sp-btn>按钮 1</sp-btn>
            <sp-btn>按钮 2</sp-btn>
            <sp-btn>按钮 3</sp-btn>
          </sp-btn-group>
        </div>

        <div>
          <h3 class="subsection-title">默认圆角</h3>
          <sp-btn-group>
            <sp-btn>按钮 1</sp-btn>
            <sp-btn>按钮 2</sp-btn>
            <sp-btn>按钮 3</sp-btn>
          </sp-btn-group>
        </div>

        <div>
          <h3 class="subsection-title">大圆角</h3>
          <sp-btn-group rounded="lg">
            <sp-btn>按钮 1</sp-btn>
            <sp-btn>按钮 2</sp-btn>
            <sp-btn>按钮 3</sp-btn>
          </sp-btn-group>
        </div>

        <div>
          <h3 class="subsection-title">超大圆角</h3>
          <sp-btn-group rounded="xl">
            <sp-btn>按钮 1</sp-btn>
            <sp-btn>按钮 2</sp-btn>
            <sp-btn>按钮 3</sp-btn>
          </sp-btn-group>
        </div>

        <div>
          <h3 class="subsection-title">胶囊形状</h3>
          <sp-btn-group rounded="pill">
            <sp-btn>按钮 1</sp-btn>
            <sp-btn>按钮 2</sp-btn>
            <sp-btn>按钮 3</sp-btn>
          </sp-btn-group>
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 带图标 -->
    <DemoSection title="带图标的按钮组" subtitle="按钮包含图标">
      <div class="button-row">
        <sp-btn-group variant="outlined">
          <sp-btn prepend-icon="mdi-format-bold">粗体</sp-btn>
          <sp-btn prepend-icon="mdi-format-italic">斜体</sp-btn>
          <sp-btn prepend-icon="mdi-format-underline">下划线</sp-btn>
        </sp-btn-group>

        <sp-btn-group color="primary">
          <sp-btn icon="mdi-thumb-up" />
          <sp-btn icon="mdi-thumb-down" />
          <sp-btn icon="mdi-share" />
        </sp-btn-group>

        <sp-btn-group variant="tonal" direction="vertical">
          <sp-btn prepend-icon="mdi-content-cut">剪切</sp-btn>
          <sp-btn prepend-icon="mdi-content-copy">复制</sp-btn>
          <sp-btn prepend-icon="mdi-content-paste">粘贴</sp-btn>
        </sp-btn-group>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 实际应用场景 -->
    <DemoSection title="实际应用场景" subtitle="常见的使用案例">
      <div class="scenarios">
        <div class="scenario">
          <h3>分页控制</h3>
          <sp-btn-group variant="outlined">
            <sp-btn icon="mdi-chevron-left" />
            <sp-btn>1</sp-btn>
            <sp-btn>2</sp-btn>
            <sp-btn>3</sp-btn>
            <sp-btn>4</sp-btn>
            <sp-btn>5</sp-btn>
            <sp-btn icon="mdi-chevron-right" />
          </sp-btn-group>
        </div>

        <div class="scenario">
          <h3>视图切换</h3>
          <sp-btn-group variant="tonal">
            <sp-btn :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'">
              列表视图
            </sp-btn>
            <sp-btn :class="{ active: viewMode === 'grid' }" @click="viewMode = 'grid'">
              网格视图
            </sp-btn>
            <sp-btn :class="{ active: viewMode === 'card' }" @click="viewMode = 'card'">
              卡片视图
            </sp-btn>
          </sp-btn-group>
          <sp-space :size="8" />
          <div class="status-display">当前视图: {{ viewMode }}</div>
        </div>

        <div class="scenario">
          <h3>文本对齐</h3>
          <sp-btn-group divided variant="outlined">
            <sp-btn icon="mdi-format-align-left" @click="textAlign = 'left'" />
            <sp-btn icon="mdi-format-align-center" @click="textAlign = 'center'" />
            <sp-btn icon="mdi-format-align-right" @click="textAlign = 'right'" />
            <sp-btn icon="mdi-format-align-justify" @click="textAlign = 'justify'" />
          </sp-btn-group>
          <sp-space :size="8" />
          <div class="text-preview" :style="{ textAlign }">
            这是一段示例文本，用于演示文本对齐效果。
          </div>
        </div>

        <div class="scenario">
          <h3>数量选择器</h3>
          <sp-btn-group>
            <sp-btn @click="count > 0 && count--">-</sp-btn>
            <sp-btn disabled style="min-width: 60px">{{ count }}</sp-btn>
            <sp-btn @click="count++">+</sp-btn>
          </sp-btn-group>
        </div>
      </div>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

const viewMode = ref('list')
const textAlign = ref('left')
const count = ref(1)
</script>

<style scoped>
.subsection-title {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #666;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
}

.button-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.status-display {
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  color: #333;
  font-size: 14px;
}

.scenarios {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.scenario {
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.scenario h3 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.text-preview {
  padding: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  color: #333;
  line-height: 1.6;
}

.active {
  background-color: rgba(25, 118, 210, 0.12) !important;
}
</style>
