<template>
  <div class="overview-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">Overview 组件总览</h1>
      <p class="page-description">以下是 Speed UI 提供的所有组件。</p>
    </div>

    <!-- 搜索框 -->
    <div class="search-container">
      <sp-text-field
        label="输入您想搜索的组件"
        v-model="searchQuery"
        placeholder="Search Components"
        prepend-inner-icon="search"
        variant="outlined"
        class="search-field"
      />
    </div>

    <!-- 组件分类和卡片 -->
    <div
      v-for="category in filteredComponents"
      :key="category.category"
      class="category-section"
    >
      <div class="category-header">
        <h2 class="category-title">{{ category.category }}</h2>
        <span class="category-count">{{ category.categoryCount }}</span>
      </div>

      <div class="component-grid">
        <div
          v-for="component in category.items"
          :key="component.name"
          class="component-card"
          @click="navigateToComponent(component.link)"
        >
          <div class="card-header">
            <h3 class="component-title">{{ component.title }}</h3>
          </div>

          <div class="card-content">
            <div
              class="component-demo"
              v-html="component.demo"
            ></div>
          </div>

          <div class="card-footer">
            <p class="component-description">{{ component.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'

  const searchQuery = ref('')

  const components = [
    // Basic 基础组件
    {
      category: 'Basic 基础组件',
      categoryCount: 5,
      items: [
        {
          name: 'btn',
          title: 'btn 按钮',
          description: '常用的操作按钮，支持多种类型和状态',
          link: '/components/btn',
          demo: `<button style="background: #409eff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">按钮</button>`,
        },
        {
          name: 'btngroup',
          title: 'btngroup 按钮组',
          description: '按钮组合组件，用于展示一组相关操作',
          link: '/components/btngroup',
          demo: `<div style="display: flex; gap: 0;"><button style="background: #409eff; color: white; border: none; padding: 6px 12px; border-radius: 4px 0 0 4px; cursor: pointer; font-size: 12px;">左</button><button style="background: #409eff; color: white; border: none; padding: 6px 12px; cursor: pointer; font-size: 12px;">中</button><button style="background: #409eff; color: white; border: none; padding: 6px 12px; border-radius: 0 4px 4px 0; cursor: pointer; font-size: 12px;">右</button></div>`,
        },
        {
          name: 'card',
          title: 'card 卡片',
          description: '通用卡片容器组件',
          link: '/components/card',
          demo: `<div style="border: 1px solid #e4e7ed; border-radius: 4px; padding: 16px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.05);"><div style="font-size: 14px; font-weight: 600;">卡片标题</div><div style="font-size: 12px; color: #909399; margin-top: 8px;">卡片内容</div></div>`,
        },
        {
          name: 'divider',
          title: 'divider 分割线',
          description: '用于分隔不同内容区域的线条',
          link: '/components/divider',
          demo: `<div style="width: 100%; height: 1px; background: #dcdfe6; margin: 8px 0;"></div>`,
        },
        {
          name: 'tag',
          title: 'tag 标签',
          description: '用于标记和分类的小型标签',
          link: '/components/tag',
          demo: `<div style="display: inline-block; padding: 4px 8px; background: #ecf5ff; color: #409eff; border-radius: 4px; font-size: 12px;">标签</div>`,
        },
      ],
    },
    // Layout 布局组件
    {
      category: 'Layout 布局组件',
      categoryCount: 2,
      items: [
        {
          name: 'grid',
          title: 'grid 栅格',
          description: '栅格系统，用于创建响应式布局',
          link: '/components/grid',
          demo: `<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px;"><div style="background: #e1f3ff; padding: 8px; text-align: center; border-radius: 2px; font-size: 12px;">Col</div><div style="background: #e1f3ff; padding: 8px; text-align: center; border-radius: 2px; font-size: 12px;">Col</div><div style="background: #e1f3ff; padding: 8px; text-align: center; border-radius: 2px; font-size: 12px;">Col</div></div>`,
        },
        {
          name: 'space',
          title: 'space 间距',
          description: '设置组件之间的间距',
          link: '/components/space',
          demo: `<div style="display: flex; gap: 8px;"><div style="width: 30px; height: 30px; background: #409eff; border-radius: 4px;"></div><div style="width: 30px; height: 30px; background: #67c23a; border-radius: 4px;"></div><div style="width: 30px; height: 30px; background: #e6a23c; border-radius: 4px;"></div></div>`,
        },
      ],
    },
    // Form 表单组件
    {
      category: 'Form 表单组件',
      categoryCount: 15,
      items: [
        {
          name: 'textfield',
          title: 'textfield 单行文本框',
          description: '基础的单行文本输入组件',
          link: '/components/textfield',
          demo: `<input style="border: 1px solid #dcdfe6; border-radius: 4px; padding: 8px 12px; width: 120px; font-size: 14px;" placeholder="请输入内容" />`,
        },
        {
          name: 'textarea',
          title: 'textarea 多行文本框',
          description: '多行文本输入组件',
          link: '/components/textarea',
          demo: `<textarea style="border: 1px solid #dcdfe6; border-radius: 4px; padding: 8px 12px; width: 120px; height: 60px; font-size: 14px; resize: none;" placeholder="请输入内容..."></textarea>`,
        },
        {
          name: 'select',
          title: 'select 选择框',
          description: '下拉选择组件',
          link: '/components/select',
          demo: `<div style="position: relative; width: 120px;"><input style="border: 1px solid #dcdfe6; border-radius: 4px; padding: 8px 12px; width: 100%; font-size: 14px;" placeholder="请选择" readonly /><span style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); color: #c0c4cc;">▼</span></div>`,
        },
        {
          name: 'combo',
          title: 'combo 选择器',
          description: '组合选择器，支持搜索和自定义选项',
          link: '/components/combo',
          demo: `<div style="position: relative; width: 120px;"><input style="border: 1px solid #dcdfe6; border-radius: 4px; padding: 8px 12px; width: 100%; font-size: 14px;" placeholder="搜索..." /><span style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); color: #c0c4cc;">⌄</span></div>`,
        },
        {
          name: 'form',
          title: 'form 表单',
          description: '表单容器组件',
          link: '/components/form',
          demo: `<div style="border: 1px dashed #ddd; padding: 12px; border-radius: 4px; font-size: 12px; text-align: center; color: #909399;">Form Container</div>`,
        },
        {
          name: 'formitem',
          title: 'formitem 表单项',
          description: '表单项组件，包含标签和表单控件',
          link: '/components/formitem',
          demo: `<div style="margin-bottom: 8px;"><label style="display: block; font-size: 12px; color: #606266; margin-bottom: 4px;">标签</label><input style="border: 1px solid #dcdfe6; border-radius: 4px; padding: 6px 10px; width: 100px; font-size: 12px;" /></div>`,
        },
        {
          name: 'cascader',
          title: 'cascader 级联选择器',
          description: '级联选择组件，适用于多级分类选择',
          link: '/components/cascader',
          demo: `<div style="position: relative; width: 120px;"><input style="border: 1px solid #dcdfe6; border-radius: 4px; padding: 8px 12px; width: 100%; font-size: 14px;" placeholder="请选择" readonly /><span style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); color: #c0c4cc;">›</span></div>`,
        },
        {
          name: 'switch',
          title: 'switch 开关',
          description: '开关切换组件',
          link: '/components/switch',
          demo: `<div style="width: 40px; height: 20px; background: #409eff; border-radius: 10px; position: relative;"><div style="width: 16px; height: 16px; background: white; border-radius: 50%; position: absolute; top: 2px; right: 2px; transition: all 0.3s;"></div></div>`,
        },
        {
          name: 'radio',
          title: 'radio 单选',
          description: '单选框组件',
          link: '/components/radio',
          demo: `<label style="display: flex; align-items: center; gap: 6px; font-size: 14px;"><input type="radio" name="demo" style="margin: 0;" />选项</label>`,
        },
        {
          name: 'radiogroup',
          title: 'radiogroup 单选组',
          description: '单选框组合组件',
          link: '/components/radiogroup',
          demo: `<div style="display: flex; gap: 12px;"><label style="display: flex; align-items: center; gap: 4px; font-size: 12px;"><input type="radio" name="group" style="margin: 0;" />选项1</label><label style="display: flex; align-items: center; gap: 4px; font-size: 12px;"><input type="radio" name="group" style="margin: 0;" />选项2</label></div>`,
        },
        {
          name: 'checkbox',
          title: 'checkbox 复选',
          description: '复选框组件',
          link: '/components/checkbox',
          demo: `<label style="display: flex; align-items: center; gap: 6px; font-size: 14px;"><input type="checkbox" style="margin: 0;" />选项</label>`,
        },
        {
          name: 'slider',
          title: 'slider 滑块',
          description: '滑块组件',
          link: '/components/slider',
          demo: `<div style="width: 120px; height: 6px; background: #e4e7ed; border-radius: 3px; position: relative;"><div style="width: 50%; height: 100%; background: #409eff; border-radius: 3px;"></div><div style="width: 12px; height: 12px; background: #409eff; border-radius: 50%; position: absolute; top: -3px; left: 50%; transform: translateX(-50%);"></div></div>`,
        },
        {
          name: 'badge',
          title: 'badge 徽章',
          description: '徽章组件，用于显示数字或状态标记',
          link: '/components/badge',
          demo: `<div style="position: relative; display: inline-block;"><button style="background: #409eff; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px;">按钮</button><span style="position: absolute; top: -6px; right: -6px; background: #f56c6c; color: white; border-radius: 10px; padding: 2px 5px; font-size: 10px; min-width: 16px; text-align: center;">3</span></div>`,
        },
        {
          name: 'segmented',
          title: 'segmented 分段控制器',
          description: '分段选择控制器',
          link: '/components/segmented',
          demo: `<div style="display: flex; background: #f0f0f0; border-radius: 4px; padding: 2px;"><button style="background: white; border: none; padding: 4px 12px; border-radius: 3px; font-size: 12px; cursor: pointer;">选项1</button><button style="background: transparent; border: none; padding: 4px 12px; font-size: 12px; cursor: pointer;">选项2</button></div>`,
        },
        {
          name: 'inputnum',
          title: 'inputnum 数字输入框',
          description: '数字输入组件',
          link: '/components/inputnum',
          demo: `<div style="display: flex; align-items: center; border: 1px solid #dcdfe6; border-radius: 4px; width: fit-content;"><button style="background: transparent; border: none; padding: 4px 8px; cursor: pointer; font-size: 12px;">-</button><input style="border: none; width: 40px; text-align: center; font-size: 12px;" value="1" /><button style="background: transparent; border: none; padding: 4px 8px; cursor: pointer; font-size: 12px;">+</button></div>`,
        },
      ],
    },
    // Navigation 导航组件
    {
      category: 'Navigation 导航组件',
      categoryCount: 1,
      items: [
        {
          name: 'menu',
          title: 'menu 菜单',
          description: '菜单导航组件',
          link: '/components/menu',
          demo: `<div style="border: 1px solid #e4e7ed; border-radius: 4px; padding: 8px; background: white; width: 120px;"><div style="padding: 6px 12px; font-size: 12px; cursor: pointer; border-radius: 2px; margin-bottom: 2px; background: #ecf5ff; color: #409eff;">菜单项1</div><div style="padding: 6px 12px; font-size: 12px; cursor: pointer;">菜单项2</div></div>`,
        },
      ],
    },
    // Data Display 数据展示
    {
      category: 'Data Display 数据展示',
      categoryCount: 3,
      items: [
        {
          name: 'list',
          title: 'list 列表',
          description: '列表展示组件',
          link: '/components/list',
          demo: `<div style="border: 1px solid #e4e7ed; border-radius: 4px; padding: 8px; background: white; width: 140px;"><div style="padding: 6px 8px; font-size: 12px; border-bottom: 1px solid #f0f0f0;">列表项 1</div><div style="padding: 6px 8px; font-size: 12px; border-bottom: 1px solid #f0f0f0;">列表项 2</div><div style="padding: 6px 8px; font-size: 12px;">列表项 3</div></div>`,
        },
        {
          name: 'progcir',
          title: 'progcir 环形进度条',
          description: '环形进度条组件',
          link: '/components/progcir',
          demo: `<svg width="60" height="60"><circle cx="30" cy="30" r="25" fill="none" stroke="#e4e7ed" stroke-width="4"></circle><circle cx="30" cy="30" r="25" fill="none" stroke="#409eff" stroke-width="4" stroke-dasharray="157" stroke-dashoffset="39" transform="rotate(-90 30 30)"></circle><text x="30" y="35" text-anchor="middle" font-size="12" fill="#606266">75%</text></svg>`,
        },
        {
          name: 'progresslinear',
          title: 'progresslinear 条形进度条',
          description: '条形进度条组件',
          link: '/components/progresslinear',
          demo: `<div style="width: 120px; height: 8px; background: #e4e7ed; border-radius: 4px; overflow: hidden;"><div style="width: 60%; height: 100%; background: #409eff;"></div></div>`,
        },
      ],
    },
    // Feedback 反馈组件
    {
      category: 'Feedback 反馈组件',
      categoryCount: 8,
      items: [
        {
          name: 'dialog',
          title: 'dialog 弹窗',
          description: '对话框组件',
          link: '/components/dialog',
          demo: `<div style="border: 1px solid #e4e7ed; border-radius: 4px; padding: 16px; background: white; width: 140px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"><div style="font-size: 14px; font-weight: 600; margin-bottom: 8px;">对话框标题</div><div style="font-size: 12px; color: #606266;">这是对话框内容</div></div>`,
        },
        {
          name: 'msgbar',
          title: 'msgbar 消息条',
          description: '消息提示条组件',
          link: '/components/msgbar',
          demo: `<div style="background: #f0f9ff; border: 1px solid #b3d8ff; border-radius: 4px; padding: 8px 12px; font-size: 12px; color: #409eff;">这是一条消息提示</div>`,
        },
        {
          name: 'tour',
          title: 'tour 指引',
          description: '漫游式引导组件',
          link: '/components/tour',
          demo: `<div style="position: relative; background: white; border: 2px solid #409eff; border-radius: 8px; padding: 12px; width: 140px; box-shadow: 0 2px 12px rgba(64,158,255,0.3);"><div style="font-size: 12px; font-weight: 600; margin-bottom: 4px;">引导标题</div><div style="font-size: 11px; color: #606266;">这里是引导说明文字</div><div style="position: absolute; top: -8px; left: 20px; width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 8px solid #409eff;"></div></div>`,
        },
        {
          name: 'tooltip',
          title: 'tooltip 提示框',
          description: '文字提示组件',
          link: '/components/tooltip',
          demo: `<div style="position: relative; display: inline-block;"><button style="background: #409eff; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px;">悬停我</button><div style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background: #303133; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px; white-space: nowrap; margin-bottom: 4px;">提示信息</div></div>`,
        },
        {
          name: 'collapse',
          title: 'collapse 折叠面板',
          description: '折叠面板组件',
          link: '/components/collapse',
          demo: `<div style="border: 1px solid #e4e7ed; border-radius: 4px; background: white; width: 140px;"><div style="padding: 10px 12px; font-size: 12px; font-weight: 600; border-bottom: 1px solid #e4e7ed; display: flex; justify-content: space-between; align-items: center;">面板标题 <span style="color: #909399;">▼</span></div><div style="padding: 10px 12px; font-size: 11px; color: #606266;">面板内容</div></div>`,
        },
        {
          name: 'notification',
          title: 'notification 通知提醒',
          description: '通知提醒组件',
          link: '/components/notification',
          demo: `<div style="border: 1px solid #e4e7ed; border-radius: 4px; padding: 12px; background: white; width: 140px; box-shadow: 0 2px 12px rgba(0,0,0,0.1);"><div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">通知标题</div><div style="font-size: 11px; color: #606266;">这是通知内容描述</div></div>`,
        },
        {
          name: 'loading',
          title: 'loading 加载状态',
          description: '加载状态组件',
          link: '/components/loading',
          demo: `<div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #606266;"><div style="width: 16px; height: 16px; border: 2px solid #e4e7ed; border-top-color: #409eff; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>加载中...</div><style>@keyframes spin { to { transform: rotate(360deg); } }</style>`,
        },
        {
          name: 'overlay',
          title: 'overlay 遮罩层',
          description: '遮罩层组件',
          link: '/components/overlay',
          demo: `<div style="position: relative; width: 140px; height: 80px; background: #f5f5f5; border-radius: 4px; overflow: hidden;"><div style="position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">遮罩层</div></div>`,
        },
      ],
    },
    // 指令
    {
      category: '指令',
      categoryCount: 1,
      items: [
        {
          name: 'progress',
          title: 'progress 加载指令',
          description: '顶部进度条加载指令',
          link: '/components/progress',
          demo: `<div style="width: 140px; height: 3px; background: #e4e7ed; border-radius: 2px; overflow: hidden; position: relative;"><div style="width: 70%; height: 100%; background: linear-gradient(to right, #409eff, #66b1ff); position: absolute; left: 0;"></div></div>`,
        },
      ],
    },
  ]

  const filteredComponents = computed(() => {
    if (!searchQuery.value) return components

    return components
      .map(category => ({
        ...category,
        items: category.items.filter(
          item =>
            item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            item.title
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase())
        ),
      }))
      .filter(category => category.items.length > 0)
  })

  const navigateToComponent = link => {
    if (typeof window !== 'undefined') {
      window.location.href = link
    }
  }
</script>

<style scoped>
  .overview-container {
    /* max-width: 1200px; */
    margin: 0 auto;
    padding: 24px;
  }

  .page-header {
    margin-bottom: 40px;
    text-align: left;
    overflow: visible;
    height: auto;
  }

  .page-title {
    font-size: 32px;
    font-weight: 700;
    color: var(--vp-c-text-1);
    margin: 0 0 16px 0;
    letter-spacing: -0.025em;
    line-height: 1.2;
    background: linear-gradient(
      135deg,
      var(--vp-c-brand-1),
      var(--vp-c-brand-2)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    /* 添加回退颜色，确保在不支持渐变文字的浏览器中也能显示 */
    color: var(--vp-c-brand-1);
    /* 确保文字不被截断 */
    overflow: visible;
    white-space: nowrap;
  }
  
  /* 为不支持 background-clip: text 的浏览器提供回退 */
  @supports not (-webkit-background-clip: text) {
    .page-title {
      color: var(--vp-c-brand-1) !important;
      background: none !important;
      -webkit-text-fill-color: unset !important;
    }
  }

  .page-description {
    font-size: 18px;
    color: var(--vp-c-text-2);
    margin: 0;
    line-height: 1.6;
    font-weight: 400;
  }

  .search-container {
    margin-bottom: 32px;
  }

  .search-field {
    width: 100%;
  }

  .category-section {
    margin-bottom: 48px;
  }

  .category-header {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 24px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--vp-c-divider);
  }

  .category-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--vp-c-text-1);
    margin: 0;
    line-height: 1.2;
  }

  .category-count {
    background: var(--vp-c-brand);
    color: white;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 500;
    line-height: 1;
    margin-top: -2px;
  }

  .component-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }

  .component-card {
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    padding: 20px;
    background: var(--vp-c-bg);
    transition: all 0.3s ease;
    cursor: pointer;
    height: 200px;
    display: flex;
    flex-direction: column;
  }

  .component-card:hover {
    border-color: var(--vp-c-brand);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .card-header {
    margin-bottom: 16px;
  }

  .component-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--vp-c-text-1);
    margin: 0;
  }

  .card-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    min-height: 80px;
  }

  .component-demo {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-footer {
    margin-top: auto;
  }

  .component-description {
    font-size: 14px;
    color: var(--vp-c-text-2);
    margin: 0;
    line-height: 1.4;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .overview-container {
      padding: 16px;
    }

    .component-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .component-card {
      height: auto;
      min-height: 180px;
    }
  }
</style>
