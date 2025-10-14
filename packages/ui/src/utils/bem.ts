/**
 * Speed UI BEM 类名助手工具
 * 用于生成符合 BEM 规范的 CSS 类名
 * 默认使用 'sp' 作为命名空间前缀
 */

/**
 * 创建 BEM 类名助手
 * @param block 块名称（如 'button', 'input'）
 * @param namespace 命名空间前缀，默认为 'sp'
 * @returns BEM 助手对象
 */
export function createBEM<B extends string>(block: B, namespace: string = 'sp') {
  const blockName = `${namespace}-${block}`

  return {
    /**
     * 生成基础块类名
     * @returns sp-block
     */
    b: () => blockName,

    /**
     * 生成元素类名
     * @param element 元素名
     * @returns sp-block__element
     */
    e: <E extends string>(element: E) => `${blockName}__${element}`,

    /**
     * 生成修饰符类名
     * @param modifier 修饰符名
     * @returns sp-block--modifier
     */
    m: <M extends string>(modifier: M) => `${blockName}--${modifier}`,

    /**
     * 生成元素修饰符类名
     * @param element 元素名
     * @param modifier 修饰符名
     * @returns sp-block__element--modifier
     */
    em: <E extends string, M extends string>(element: E, modifier: M) => 
      `${blockName}__${element}--${modifier}`,

    /**
     * 生成状态类名（用于组合组件）
     * @param state 状态名
     * @returns sp-block-state
     */
    s: <S extends string>(state: S) => `${blockName}-${state}`,

    /**
     * 生成 CSS 选择器
     * @returns .sp-block
     */
    selector: () => `.${blockName}`,

    /**
     * 生成元素选择器
     * @param element 元素名
     * @returns .sp-block__element
     */
    selectorE: <E extends string>(element: E) => `.${blockName}__${element}`,

    /**
     * 生成修饰符选择器
     * @param modifier 修饰符名
     * @returns .sp-block--modifier
     */
    selectorM: <M extends string>(modifier: M) => `.${blockName}--${modifier}`,

    /**
     * 生成 CSS 变量名
     * @param variable 变量名
     * @returns --sp-block-variable
     */
    var: <V extends string>(variable: V) => `--${namespace}-${block}-${variable}`,

    /**
     * 生成 CSS 变量值
     * @param variable 变量名
     * @returns var(--sp-block-variable)
     */
    getVar: <V extends string>(variable: V) => `var(--${namespace}-${block}-${variable})`,

    /**
     * 生成 CSS 变量声明
     * @param variable 变量名
     * @param value 变量值
     * @returns --sp-block-variable: value;
     */
    setVar: <V extends string, S extends string>(variable: V, value: S) => 
      `--${namespace}-${block}-${variable}: ${value};`,

    /**
     * 批量生成 CSS 变量
     * @param vars 变量对象
     * @returns CSS 变量对象
     */
    vars: (vars: Record<string, string>) => {
      const result: Record<string, string> = {}
      for (const [key, value] of Object.entries(vars)) {
        result[`--${namespace}-${block}-${key}`] = value
      }
      return result
    },

    /**
     * 生成全局 CSS 变量名
     * @param variable 变量名
     * @returns --sp-variable
     */
    globalVar: <V extends string>(variable: V) => `--${namespace}-${variable}`,

    /**
     * 生成全局 CSS 变量值
     * @param variable 变量名
     * @returns var(--sp-variable)
     */
    getGlobalVar: <V extends string>(variable: V) => `var(--${namespace}-${variable})`
  }
}

/**
 * 默认的 BEM 助手创建函数（使用 sp 前缀）
 * @param block 块名称
 * @returns BEM 助手对象
 */
export function useBEM<B extends string>(block: B) {
  return createBEM(block, 'sp')
}

/**
 * 创建自定义命名空间的 BEM 助手
 * @param block 块名称
 * @param namespace 自定义命名空间
 * @returns BEM 助手对象
 */
export function useCustomBEM<B extends string>(block: B, namespace: string) {
  return createBEM(block, namespace)
}

/**
 * BEM 助手类型定义
 */
export type BEMHelper = ReturnType<typeof useBEM>

/**
 * 简化的 bemHelper 函数，兼容旧的 API
 * @param block 块名称
 * @returns BEM 助手对象
 */
export function bemHelper<B extends string>(block: B) {
  return useBEM(block)
}
