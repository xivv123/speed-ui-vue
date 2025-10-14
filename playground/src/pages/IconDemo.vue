<template>
  <div class="icon-demo">
    <h1>🎨 Icon 通用图标组件演示</h1>
    <p>基于 @vicons/ionicons5 的通用图标组件</p>

    <!-- 基础图标演示 -->
    <div class="demo-section">
      <h2>🔧 基础图标</h2>
      <div class="icon-grid">
        <div class="icon-item">
          <Icon
            name="Search"
            :size="24"
          />
          <span>Search</span>
        </div>
        <div class="icon-item">
          <Icon
            name="Close"
            :size="24"
          />
          <span>Close</span>
        </div>
        <div class="icon-item">
          <Icon
            name="Checkmark"
            :size="24"
          />
          <span>Checkmark</span>
        </div>
        <div class="icon-item">
          <Icon
            name="Add"
            :size="24"
          />
          <span>Add</span>
        </div>
        <div class="icon-item">
          <Icon
            name="Remove"
            :size="24"
          />
          <span>Remove</span>
        </div>
      </div>
    </div>

    <!-- 眼睛图标演示 -->
    <div class="demo-section">
      <h2>👁️ 眼睛图标</h2>
      <div class="icon-grid">
        <div class="icon-item">
          <Icon
            name="Eye"
            :size="24"
          />
          <span>Eye</span>
        </div>
        <div class="icon-item">
          <Icon
            name="EyeOutline"
            :size="24"
          />
          <span>EyeOutline</span>
        </div>
        <div class="icon-item">
          <Icon
            name="EyeOff"
            :size="24"
          />
          <span>EyeOff</span>
        </div>
        <div class="icon-item">
          <Icon
            name="EyeOffOutline"
            :size="24"
          />
          <span>EyeOffOutline</span>
        </div>
      </div>
    </div>

    <!-- 尺寸演示 -->
    <div class="demo-section">
      <h2>📏 尺寸演示</h2>
      <div class="size-demo">
        <div class="size-item">
          <Icon
            name="Heart"
            :size="16"
          />
          <span>16px</span>
        </div>
        <div class="size-item">
          <Icon
            name="Heart"
            :size="20"
          />
          <span>20px</span>
        </div>
        <div class="size-item">
          <Icon
            name="Heart"
            :size="24"
          />
          <span>24px</span>
        </div>
        <div class="size-item">
          <Icon
            name="Heart"
            :size="32"
          />
          <span>32px</span>
        </div>
        <div class="size-item">
          <Icon
            name="Heart"
            :size="48"
          />
          <span>48px</span>
        </div>
      </div>
    </div>

    <!-- 颜色演示 -->
    <div class="demo-section">
      <h2>🎨 颜色演示</h2>
      <div class="color-demo">
        <div class="color-item">
          <Icon
            name="Star"
            :size="32"
            color="#1890ff"
          />
          <span>Primary</span>
        </div>
        <div class="color-item">
          <Icon
            name="Star"
            :size="32"
            color="#52c41a"
          />
          <span>Success</span>
        </div>
        <div class="color-item">
          <Icon
            name="Star"
            :size="32"
            color="#faad14"
          />
          <span>Warning</span>
        </div>
        <div class="color-item">
          <Icon
            name="Star"
            :size="32"
            color="#ff4d4f"
          />
          <span>Error</span>
        </div>
      </div>
    </div>

    <!-- 可点击演示 -->
    <div class="demo-section">
      <h2>🖱️ 可点击演示</h2>
      <div class="clickable-demo">
        <div class="clickable-item">
          <Icon
            name="Heart"
            :size="32"
            :color="liked ? '#ff4d4f' : '#ccc'"
            :clickable="true"
            @click="handleLike"
          />
          <span>{{ liked ? '已喜欢' : '点击喜欢' }}</span>
        </div>
        <div class="clickable-item">
          <Icon
            name="Star"
            :size="32"
            :color="starred ? '#faad14' : '#ccc'"
            :clickable="true"
            @click="handleStar"
          />
          <span>{{ starred ? '已收藏' : '点击收藏' }}</span>
        </div>
      </div>
    </div>

    <!-- 常用图标展示 -->
    <div class="demo-section">
      <h2>📦 常用图标展示</h2>
      <div class="icon-grid">
        <div class="icon-item">
          <Icon
            name="Document"
            :size="24"
          />
          <span>Document</span>
        </div>
        <div class="icon-item">
          <Icon
            name="Folder"
            :size="24"
          />
          <span>Folder</span>
        </div>
        <div class="icon-item">
          <Icon
            name="Save"
            :size="24"
          />
          <span>Save</span>
        </div>
        <div class="icon-item">
          <Icon
            name="Download"
            :size="24"
          />
          <span>Download</span>
        </div>
        <div class="icon-item">
          <Icon
            name="Create"
            :size="24"
          />
          <span>Create</span>
        </div>
        <div class="icon-item">
          <Icon
            name="Trash"
            :size="24"
          />
          <span>Trash</span>
        </div>
        <div class="icon-item">
          <Icon
            name="Play"
            :size="24"
          />
          <span>Play</span>
        </div>
        <div class="icon-item">
          <Icon
            name="Refresh"
            :size="24"
          />
          <span>Refresh</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Icon from '../../../packages/ui/src/components/icon/Icon.vue'

  // 交互状态
  const liked = ref(false)
  const starred = ref(false)

  // 事件处理
  const handleLike = () => {
    liked.value = !liked.value
  }

  const handleStar = () => {
    starred.value = !starred.value
  }
</script>

<style scoped>
  .icon-demo {
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .demo-section {
    margin-bottom: 48px;
    padding: 24px;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    background: #fafafa;
  }

  .demo-section h2 {
    margin: 0 0 24px 0;
    color: #1890ff;
    font-size: 20px;
    font-weight: 600;
  }

  .demo-section h3 {
    margin: 0 0 16px 0;
    color: #333;
    font-size: 16px;
    font-weight: 500;
  }

  .icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 16px;
  }

  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;
    border: 1px solid #e8e8e8;
    border-radius: 6px;
    background: white;
    transition: all 0.2s ease;
  }

  .icon-item:hover {
    border-color: #1890ff;
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.1);
  }

  .icon-item span {
    font-size: 12px;
    color: #666;
    text-align: center;
  }

  .size-demo {
    display: flex;
    align-items: center;
    gap: 32px;
    flex-wrap: wrap;
  }

  .size-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .color-demo {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
  }

  .color-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .clickable-demo {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
  }

  .clickable-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;
    border: 1px solid #e8e8e8;
    border-radius: 6px;
    background: white;
  }

  .disabled-demo {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
  }

  .disabled-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;
    border: 1px solid #e8e8e8;
    border-radius: 6px;
    background: white;
  }

  .icon-showcase {
    display: grid;
    gap: 32px;
  }

  .showcase-category {
    padding: 16px;
    border: 1px solid #e8e8e8;
    border-radius: 6px;
    background: white;
  }

  h1 {
    text-align: center;
    color: #1890ff;
    margin-bottom: 8px;
  }

  p {
    text-align: center;
    color: #666;
    margin-bottom: 32px;
  }
</style>
