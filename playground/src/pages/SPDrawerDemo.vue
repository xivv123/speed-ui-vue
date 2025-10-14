<template>
  <DemoContainer title="SPDrawer 抽屉组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="从屏幕边缘滑出的面板">
      <sp-btn @click="basicDrawer = true">打开抽屉</sp-btn>
      <sp-drawer v-model="basicDrawer">
        <div class="drawer-content">
          <h3>抽屉标题</h3>
          <p>这是抽屉的内容区域</p>
          <sp-btn @click="basicDrawer = false">关闭</sp-btn>
        </div>
      </sp-drawer>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同位置 -->
    <DemoSection title="不同位置" subtitle="抽屉可以从四个方向滑出">
      <div class="button-group">
        <sp-btn @click="leftDrawer = true">左侧抽屉</sp-btn>
        <sp-btn @click="rightDrawer = true">右侧抽屉</sp-btn>
        <sp-btn @click="topDrawer = true">顶部抽屉</sp-btn>
        <sp-btn @click="bottomDrawer = true">底部抽屉</sp-btn>
      </div>

      <sp-drawer v-model="leftDrawer" location="left">
        <div class="drawer-content">
          <h3>左侧抽屉</h3>
          <p>从左侧滑入的抽屉</p>
          <sp-btn @click="leftDrawer = false">关闭</sp-btn>
        </div>
      </sp-drawer>

      <sp-drawer v-model="rightDrawer" location="right">
        <div class="drawer-content">
          <h3>右侧抽屉</h3>
          <p>从右侧滑入的抽屉</p>
          <sp-btn @click="rightDrawer = false">关闭</sp-btn>
        </div>
      </sp-drawer>

      <sp-drawer v-model="topDrawer" location="top" width="100%">
        <div class="drawer-content">
          <h3>顶部抽屉</h3>
          <p>从顶部滑入的抽屉</p>
          <sp-btn @click="topDrawer = false">关闭</sp-btn>
        </div>
      </sp-drawer>

      <sp-drawer v-model="bottomDrawer" location="bottom">
        <div class="drawer-content">
          <h3>底部抽屉</h3>
          <p>从底部滑入的抽屉</p>
          <sp-btn @click="bottomDrawer = false">关闭</sp-btn>
        </div>
      </sp-drawer>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同宽度 -->
    <DemoSection title="自定义宽度" subtitle="可以设置不同的抽屉宽度">
      <div class="button-group">
        <sp-btn @click="smallDrawer = true">小抽屉 (200px)</sp-btn>
        <sp-btn @click="mediumDrawer = true">中等抽屉 (400px)</sp-btn>
        <sp-btn @click="largeDrawer = true">大抽屉 (600px)</sp-btn>
      </div>

      <sp-drawer v-model="smallDrawer" :width="200">
        <div class="drawer-content">
          <h3>小抽屉</h3>
          <p>宽度: 200px</p>
          <sp-btn @click="smallDrawer = false">关闭</sp-btn>
        </div>
      </sp-drawer>

      <sp-drawer v-model="mediumDrawer" :width="400">
        <div class="drawer-content">
          <h3>中等抽屉</h3>
          <p>宽度: 400px</p>
          <sp-btn @click="mediumDrawer = false">关闭</sp-btn>
        </div>
      </sp-drawer>

      <sp-drawer v-model="largeDrawer" :width="600">
        <div class="drawer-content">
          <h3>大抽屉</h3>
          <p>宽度: 600px</p>
          <sp-btn @click="largeDrawer = false">关闭</sp-btn>
        </div>
      </sp-drawer>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 使用 activator 插槽 -->
    <DemoSection title="使用 Activator 插槽" subtitle="通过插槽更方便地控制触发元素">
      <sp-drawer v-model="activatorDrawer">
        <template #activator="{ props }">
          <sp-btn v-bind="props">点击打开抽屉</sp-btn>
        </template>
        <div class="drawer-content">
          <h3>通过 Activator 打开</h3>
          <p>使用 activator 插槽可以更方便地控制触发元素</p>
          <sp-btn @click="activatorDrawer = false">关闭</sp-btn>
        </div>
      </sp-drawer>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 实际应用场景 -->
    <DemoSection title="实际应用场景" subtitle="常见的使用案例">
      <!-- 导航菜单 -->
      <div class="scenario">
        <h3>导航菜单</h3>
        <sp-btn @click="navDrawer = true">打开导航</sp-btn>
        <sp-drawer v-model="navDrawer" location="left" :width="280">
          <div class="drawer-content nav-drawer">
            <div class="nav-header">
              <h3>导航菜单</h3>
              <sp-btn icon @click="navDrawer = false">×</sp-btn>
            </div>
            <div class="nav-body">
              <div class="nav-item" @click="handleNavClick('home')">🏠 首页</div>
              <div class="nav-item" @click="handleNavClick('profile')">👤 个人中心</div>
              <div class="nav-item" @click="handleNavClick('settings')">⚙️ 设置</div>
              <div class="nav-item" @click="handleNavClick('about')">ℹ️ 关于</div>
            </div>
          </div>
        </sp-drawer>
      </div>

      <sp-space :size="20" />

      <!-- 筛选面板 -->
      <div class="scenario">
        <h3>筛选面板</h3>
        <sp-btn @click="filterDrawer = true">打开筛选</sp-btn>
        <sp-drawer v-model="filterDrawer" location="right" :width="320">
          <div class="drawer-content filter-drawer">
            <div class="filter-header">
              <h3>筛选条件</h3>
              <sp-btn text @click="filterDrawer = false">完成</sp-btn>
            </div>
            <div class="filter-body">
              <div class="filter-section">
                <h4>价格区间</h4>
                <sp-checkbox v-model="filters.price1">0-100元</sp-checkbox>
                <sp-checkbox v-model="filters.price2">100-500元</sp-checkbox>
                <sp-checkbox v-model="filters.price3">500元以上</sp-checkbox>
              </div>
              <div class="filter-section">
                <h4>品牌</h4>
                <sp-checkbox v-model="filters.brand1">品牌A</sp-checkbox>
                <sp-checkbox v-model="filters.brand2">品牌B</sp-checkbox>
                <sp-checkbox v-model="filters.brand3">品牌C</sp-checkbox>
              </div>
              <div class="filter-actions">
                <sp-btn @click="resetFilters" variant="outlined">重置</sp-btn>
                <sp-btn @click="applyFilters" color="primary">应用</sp-btn>
              </div>
            </div>
          </div>
        </sp-drawer>
      </div>

      <sp-space :size="20" />

      <!-- 详情面板 -->
      <div class="scenario">
        <h3>详情面板</h3>
        <sp-btn @click="detailDrawer = true">查看详情</sp-btn>
        <sp-drawer v-model="detailDrawer" location="right" :width="480">
          <div class="drawer-content detail-drawer">
            <div class="detail-header">
              <h3>商品详情</h3>
              <sp-btn icon @click="detailDrawer = false">×</sp-btn>
            </div>
            <div class="detail-body">
              <div class="product-image">
                <div class="image-placeholder">📦 产品图片</div>
              </div>
              <div class="product-info">
                <h2>产品名称</h2>
                <div class="price">¥299.00</div>
                <p class="description">这是一个很棒的产品，拥有出色的质量和设计...</p>
                <div class="specs">
                  <div class="spec-item">
                    <span class="label">颜色：</span>
                    <span class="value">黑色</span>
                  </div>
                  <div class="spec-item">
                    <span class="label">尺寸：</span>
                    <span class="value">中号</span>
                  </div>
                  <div class="spec-item">
                    <span class="label">库存：</span>
                    <span class="value">99件</span>
                  </div>
                </div>
                <sp-btn color="primary" block>加入购物车</sp-btn>
              </div>
            </div>
          </div>
        </sp-drawer>
      </div>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

// 基础抽屉状态
const basicDrawer = ref(false)
const leftDrawer = ref(false)
const rightDrawer = ref(false)
const topDrawer = ref(false)
const bottomDrawer = ref(false)

// 不同宽度
const smallDrawer = ref(false)
const mediumDrawer = ref(false)
const largeDrawer = ref(false)

// Activator
const activatorDrawer = ref(false)

// 应用场景
const navDrawer = ref(false)
const filterDrawer = ref(false)
const detailDrawer = ref(false)

// 筛选条件
const filters = reactive({
  price1: false,
  price2: false,
  price3: false,
  brand1: false,
  brand2: false,
  brand3: false,
})

const handleNavClick = (route: string) => {
  console.log('导航到:', route)
  navDrawer.value = false
}

const resetFilters = () => {
  Object.keys(filters).forEach(key => {
    filters[key as keyof typeof filters] = false
  })
}

const applyFilters = () => {
  console.log('应用筛选:', filters)
  filterDrawer.value = false
}
</script>

<style scoped>
.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.drawer-content {
  padding: 24px;
}

.scenario {
  margin-bottom: 16px;
}

.scenario h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
}

/* 导航抽屉样式 */
.nav-drawer {
  padding: 0;
}

.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e0e0e0;
}

.nav-header h3 {
  margin: 0;
}

.nav-body {
  padding: 8px 0;
}

.nav-item {
  padding: 12px 24px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: #f5f5f5;
}

/* 筛选抽屉样式 */
.filter-drawer {
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e0e0e0;
}

.filter-header h3 {
  margin: 0;
}

.filter-body {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.filter-section {
  margin-bottom: 24px;
}

.filter-section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
}

.filter-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

/* 详情抽屉样式 */
.detail-drawer {
  padding: 0;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e0e0e0;
}

.detail-header h3 {
  margin: 0;
}

.detail-body {
  padding: 24px;
}

.image-placeholder {
  width: 100%;
  height: 200px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  margin-bottom: 24px;
}

.product-info h2 {
  margin: 0 0 12px 0;
  font-size: 20px;
}

.price {
  font-size: 24px;
  color: #e91e63;
  font-weight: bold;
  margin-bottom: 16px;
}

.description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 24px;
}

.specs {
  margin-bottom: 24px;
}

.spec-item {
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.spec-item .label {
  font-weight: 500;
  width: 80px;
}

.spec-item .value {
  color: #666;
}
</style>
