import { createRouter, createWebHistory } from 'vue-router'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '../i18n'
import type { Locale } from '../i18n'

// 页面组件
const Home = () => import('../views/Home.vue')

// 基础组件
const SPBtnDemo = () => import('../pages/SPBtnDemo.vue')
const SPBtnGroupDemo = () => import('../pages/SPBtnGroupDemo.vue')
const SPBadgeDemo = () => import('../pages/SPBadgeDemo.vue')
const SPTagDemo = () => import('../pages/SPTagDemo.vue')
const IconDemo = () => import('../pages/IconDemo.vue')
const SPDividerDemo = () => import('../pages/SPDividerDemo.vue')

// 布局组件
const SPRowColDemo = () => import('../pages/SPRowColDemo.vue')
const SPSpaceDemo = () => import('../pages/SPSpaceDemo.vue')
const SPLayoutDemo = () => import('../pages/SPLayoutDemo.vue')
const SPCardDemo = () => import('../pages/SPCardDemo.vue')

// 表单组件
const SPTextFieldDemo = () => import('../pages/SPTextFieldDemo.vue')
const SPTextareaDemo = () => import('../pages/SPTextareaDemo.vue')
const SPSelectDemo = () => import('../pages/SPSelectDemo.vue')
const SPCheckboxDemo = () => import('../pages/SPCheckboxDemo.vue')
const SPRadioDemo = () => import('../pages/SPRadioDemo.vue')
const SPSwitchTsxDemo = () => import('../pages/SPSwitchTsxDemo.vue')
const SPSliderDemo = () => import('../pages/SPSliderDemo.vue')
const SPFormDemo = () => import('../pages/SPFormDemo.vue')

// 表单扩展
const SPInputNumDemo = () => import('../pages/SPInputNumDemo.vue')
const SPInputPwdDemo = () => import('../pages/SPInputPwdDemo.vue')
const SPInputSrchDemo = () => import('../pages/SPInputSrchDemo.vue')
const SPCascaderDemo = () => import('../pages/SPCascaderDemo.vue')
const SPComboDemo = () => import('../pages/SPComboDemo.vue')
const SPSegmentedDemo = () => import('../pages/SPSegmentedDemo.vue')

// 反馈组件
const SPAlertDemo = () => import('../pages/SPAlertDemo.vue')
const SPDialogDemo = () => import('../pages/SPDialogDemo.vue')
const SPLoadingDemo = () => import('../pages/SPLoadingDemo.vue')
const SPProgCirDemo = () => import('../pages/SPProgCirDemo.vue')
const SPMsgBarDemo = () => import('../pages/SPMsgBarDemo.vue')

// 导航组件
const SPMenuDemo = () => import('../pages/SPMenuDemo.vue')
const SPDrawerDemo = () => import('../pages/SPDrawerDemo.vue')
const SPNavigationDrawerDemo = () => import('../pages/SPNavigationDrawerDemo.vue')
const SPSidebarDemo = () => import('../pages/SPSidebarDemo.vue')
const SPTourDemo = () => import('../pages/SPTourDemo.vue')
const SPGlobalBannerDemo = () => import('../pages/SPGlobalBannerDemo.vue')

// 数据展示
const SPListDemo = () => import('../pages/SPListDemo.vue')
const SPCollapseDemo = () => import('../pages/SPCollapseDemo.vue')
const SPScrollbarDemo = () => import('../pages/SPScrollbarDemo.vue')

// 特效组件
const SPExpandBtnDemo = () => import('../pages/SPExpandBtnDemo.vue')
const SPStretchBtnDemo = () => import('../pages/SPStretchBtnDemo.vue')
const SPFlipTextDemo = () => import('../pages/SPFlipTextDemo.vue')
const SPScrollTextDemo = () => import('../pages/SPScrollTextDemo.vue')

// 路由配置
const routes = [
  // 首页
  {
    path: '/',
    redirect: `/${DEFAULT_LOCALE}`,
  },
  {
    path: '/:locale',
    component: Home,
    beforeEnter: (to: any) => {
      const locale = to.params.locale as Locale
      if (!SUPPORTED_LOCALES.includes(locale)) {
        return `/${DEFAULT_LOCALE}`
      }
    },
  },

  // 基础组件
  {
    path: '/:locale/spbtn-demo',
    component: SPBtnDemo,
  },
  {
    path: '/:locale/sp-btn-group-demo',
    component: SPBtnGroupDemo,
  },
  {
    path: '/:locale/sp-badge-demo',
    component: SPBadgeDemo,
  },
  {
    path: '/:locale/sp-tag-demo',
    component: SPTagDemo,
  },
  {
    path: '/:locale/icon-demo',
    component: IconDemo,
  },
  {
    path: '/:locale/sp-divider-demo',
    component: SPDividerDemo,
  },

  // 布局组件
  {
    path: '/:locale/sp-row-col-demo',
    component: SPRowColDemo,
  },
  {
    path: '/:locale/sp-space-demo',
    component: SPSpaceDemo,
  },
  {
    path: '/:locale/layout-demo',
    component: SPLayoutDemo,
  },
  {
    path: '/:locale/sp-card-demo',
    component: SPCardDemo,
  },

  // 表单组件
  {
    path: '/:locale/sp-text-field-demo',
    component: SPTextFieldDemo,
  },
  {
    path: '/:locale/sp-textarea-demo',
    component: SPTextareaDemo,
  },
  {
    path: '/:locale/sp-select-demo',
    component: SPSelectDemo,
  },
  {
    path: '/:locale/sp-checkbox-demo',
    component: SPCheckboxDemo,
  },
  {
    path: '/:locale/sp-radio-demo',
    component: SPRadioDemo,
  },
  {
    path: '/:locale/sp-switch-tsx-demo',
    component: SPSwitchTsxDemo,
  },
  {
    path: '/:locale/sp-slider-demo',
    component: SPSliderDemo,
  },
  {
    path: '/:locale/sp-form-demo',
    component: SPFormDemo,
  },

  // 表单扩展
  {
    path: '/:locale/sp-input-num-demo',
    component: SPInputNumDemo,
  },
  {
    path: '/:locale/sp-input-pwd-demo',
    component: SPInputPwdDemo,
  },
  {
    path: '/:locale/sp-input-srch-demo',
    component: SPInputSrchDemo,
  },
  {
    path: '/:locale/sp-cascader-demo',
    component: SPCascaderDemo,
  },
  {
    path: '/:locale/sp-combo-demo',
    component: SPComboDemo,
  },
  {
    path: '/:locale/sp-segmented-demo',
    component: SPSegmentedDemo,
  },

  // 反馈组件
  {
    path: '/:locale/sp-alert-demo',
    component: SPAlertDemo,
  },
  {
    path: '/:locale/sp-dialog-demo',
    component: SPDialogDemo,
  },
  {
    path: '/:locale/sp-loading-demo',
    component: SPLoadingDemo,
  },
  {
    path: '/:locale/sp-prog-cir-demo',
    component: SPProgCirDemo,
  },

  {
    path: '/:locale/sp-msg-bar-demo',
    component: SPMsgBarDemo,
  },

  // 导航组件
  {
    path: '/:locale/sp-menu-demo',
    component: SPMenuDemo,
  },
  {
    path: '/:locale/sp-drawer-demo',
    component: SPDrawerDemo,
  },
  {
    path: '/:locale/sp-navigation-drawer-demo',
    component: SPNavigationDrawerDemo,
  },
  {
    path: '/:locale/sp-sidebar-demo',
    component: SPSidebarDemo,
  },
  {
    path: '/:locale/sp-tour-demo',
    component: SPTourDemo,
  },
  {
    path: '/:locale/sp-global-banner-demo',
    component: SPGlobalBannerDemo,
  },

  // 数据展示
  {
    path: '/:locale/sp-list-demo',
    component: SPListDemo,
  },
  {
    path: '/:locale/sp-collapse-demo',
    component: SPCollapseDemo,
  },
  {
    path: '/:locale/sp-scrollbar-demo',
    component: SPScrollbarDemo,
  },

  // 特效组件
  {
    path: '/:locale/sp-expand-btn-demo',
    component: SPExpandBtnDemo,
  },
  {
    path: '/:locale/sp-stretch-btn-demo',
    component: SPStretchBtnDemo,
  },
  {
    path: '/:locale/sp-flip-text-demo',
    component: SPFlipTextDemo,
  },
  {
    path: '/:locale/sp-scroll-text-demo',
    component: SPScrollTextDemo,
  },
]

// 创建路由实例
export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫：同步路由语言和 i18n 语言
router.beforeEach(to => {
  const locale = to.params.locale as Locale
  if (locale && SUPPORTED_LOCALES.includes(locale)) {
    localStorage.setItem('speed-ui-locale', locale)
    document.querySelector('html')?.setAttribute('lang', locale)
  }
})
