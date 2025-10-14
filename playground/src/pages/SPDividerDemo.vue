<template>
  <DemoContainer title="SPDivider 分割线组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="水平和垂直分割线">
      <h3 class="subsection-title">水平分割线</h3>
      <div class="content-box">
        <p>这是第一段内容</p>
        <SPDivider />
        <p>这是第二段内容</p>
        <SPDivider />
        <p>这是第三段内容</p>
      </div>

      <sp-space :size="20" />

      <h3 class="subsection-title">垂直分割线</h3>
      <div class="vertical-content">
        <span>左侧内容</span>
        <SPDivider vertical />
        <span>中间内容</span>
        <SPDivider vertical />
        <span>右侧内容</span>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 带文字的分割线 -->
    <DemoSection title="带文字的分割线" subtitle="分割线中间可以显示文字">
      <h3 class="subsection-title">水平带文字</h3>
      <div class="content-box">
        <p>上方内容</p>
        <SPDivider>分割线文字</SPDivider>
        <p>中间内容</p>
        <SPDivider>重要信息</SPDivider>
        <p>下方内容</p>
      </div>

      <sp-space :size="20" />

      <h3 class="subsection-title">垂直带文字</h3>
      <div class="vertical-content">
        <span>左侧</span>
        <SPDivider vertical>中间</SPDivider>
        <span>右侧</span>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 自定义颜色 -->
    <DemoSection title="自定义颜色" subtitle="可以设置不同的分割线颜色">
      <div class="content-box">
        <p>默认颜色</p>
        <SPDivider />
        <p>红色分割线</p>
        <SPDivider color="red" />
        <p>蓝色分割线</p>
        <SPDivider color="blue" />
        <p>绿色分割线</p>
        <SPDivider color="green" />
        <p>主题色分割线</p>
        <SPDivider color="primary" />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 自定义厚度 -->
    <DemoSection title="自定义厚度" subtitle="调整分割线的粗细">
      <div class="content-box">
        <p>默认厚度（1px）</p>
        <SPDivider />
        <p>厚度 2px</p>
        <SPDivider :thickness="2" />
        <p>厚度 3px</p>
        <SPDivider :thickness="3" />
        <p>厚度 5px</p>
        <SPDivider :thickness="5" />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 自定义透明度 -->
    <DemoSection title="自定义透明度" subtitle="控制分割线的透明程度">
      <div class="content-box">
        <p>默认透明度</p>
        <SPDivider />
        <p>透明度 0.2（很淡）</p>
        <SPDivider :opacity="0.2" />
        <p>透明度 0.5（中等）</p>
        <SPDivider :opacity="0.5" />
        <p>透明度 1.0（不透明）</p>
        <SPDivider :opacity="1.0" />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 缩进分割线 -->
    <DemoSection title="缩进分割线" subtitle="分割线带有缩进效果">
      <h3 class="subsection-title">水平缩进</h3>
      <div class="content-box">
        <p>正常分割线</p>
        <SPDivider />
        <p>缩进分割线（左侧留白）</p>
        <SPDivider inset />
        <p>后续内容</p>
      </div>

      <sp-space :size="20" />

      <h3 class="subsection-title">垂直缩进</h3>
      <div class="vertical-content" style="height: 150px;">
        <span>左侧</span>
        <SPDivider vertical />
        <span>中间（正常）</span>
        <SPDivider vertical inset />
        <span>右侧（缩进）</span>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 自定义长度 -->
    <DemoSection title="自定义长度" subtitle="设置分割线的长度">
      <h3 class="subsection-title">水平长度</h3>
      <div class="content-box">
        <p>30% 长度</p>
        <SPDivider :length="'30%'" />
        <p>50% 长度</p>
        <SPDivider :length="'50%'" />
        <p>200px 固定长度</p>
        <SPDivider :length="200" />
      </div>

      <sp-space :size="20" />

      <h3 class="subsection-title">垂直长度</h3>
      <div class="vertical-content" style="height: 200px;">
        <span>左侧</span>
        <SPDivider vertical :length="80" />
        <span>中间</span>
        <SPDivider vertical :length="'50%'" />
        <span>右侧</span>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 实际应用场景 -->
    <DemoSection title="实际应用场景" subtitle="常见的使用案例">
      <h3 class="subsection-title">列表分隔</h3>
      <div class="list-example">
        <div class="list-item">
          <span class="icon">📝</span>
          <span>列表项 1</span>
        </div>
        <SPDivider inset />
        <div class="list-item">
          <span class="icon">📊</span>
          <span>列表项 2</span>
        </div>
        <SPDivider inset />
        <div class="list-item">
          <span class="icon">⚙️</span>
          <span>列表项 3</span>
        </div>
      </div>

      <sp-space :size="20" />

      <h3 class="subsection-title">工具栏分隔</h3>
      <div class="toolbar-example">
        <sp-btn size="small" variant="text">复制</sp-btn>
        <SPDivider vertical :length="24" />
        <sp-btn size="small" variant="text">粘贴</sp-btn>
        <SPDivider vertical :length="24" />
        <sp-btn size="small" variant="text">剪切</sp-btn>
        <SPDivider vertical :length="24" />
        <sp-btn size="small" variant="text">删除</sp-btn>
      </div>

      <sp-space :size="20" />

      <h3 class="subsection-title">章节分隔</h3>
      <div class="content-box">
        <h4>第一章</h4>
        <p>这是第一章的内容...</p>
        <SPDivider>💫 华丽的分割线 💫</SPDivider>
        <h4>第二章</h4>
        <p>这是第二章的内容...</p>
        <SPDivider>⭐ 继续阅读 ⭐</SPDivider>
        <h4>第三章</h4>
        <p>这是第三章的内容...</p>
      </div>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'
</script>

<style scoped>
.subsection-title {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: #666;
}

.content-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.content-box p {
  margin: 10px 0;
  color: #495057;
}

.content-box h4 {
  margin: 10px 0;
  color: #2c3e50;
}

.vertical-content {
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.vertical-content span {
  color: #495057;
  white-space: nowrap;
}

.list-example {
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.list-item:hover {
  background-color: #f5f5f5;
}

.list-item .icon {
  font-size: 20px;
}

.toolbar-example {
  display: flex;
  align-items: center;
  background: white;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  gap: 8px;
}
</style>
