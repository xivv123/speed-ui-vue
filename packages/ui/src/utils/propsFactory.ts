// Types
// Inline IfAny to avoid depending on '@vue/shared'
type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N
import type { ComponentObjectPropsOptions, Prop, PropType } from 'vue'
import { consoleWarn } from './console'

/**
 * propsFactory（Speed UI 版本）
 *
 * 设计目标：
 * - 类型友好：维持现有强类型推断（和原用法完全兼容）
 * - 运行时更安全：Object/Array 默认值自动包成工厂函数，避免实例间共享引用
 * - 易调试：支持记录 `source`，并在默认值 key 不匹配时发出警告
 * - 可扩展：支持选项对象（不破坏旧签名）
 */

export interface PropsFactoryOptions {
  /** 记录来源，便于调试（通常传组件名） */
  source?: string
  /** 默认值为对象/数组时，是否强制包成工厂函数（默认 true） */
  wrapObjectDefaults?: boolean
  /** 传入 defaults 的键不存在于 props 时，是否给出警告（默认 true） */
  warnUnknownDefaults?: boolean
}

function isObjectLike(val: any) {
  return val !== null && typeof val === 'object'
}

function wrapDefaultIfNeeded(value: any) {
  // 避免实例间共享默认引用：对象/数组默认值转为工厂函数
  if (Array.isArray(value) || isObjectLike(value)) {
    // 使用浅拷贝，已满足绝大多数默认值场景
    return () => (Array.isArray(value) ? [...value] : { ...value })
  }
  return value
}

export function propsFactory<
  PropsOptions extends ComponentObjectPropsOptions
>(props: PropsOptions, srcOrOptions?: string | PropsFactoryOptions) {
  const options: PropsFactoryOptions =
    typeof srcOrOptions === 'string'
      ? { source: srcOrOptions }
      : { wrapObjectDefaults: true, warnUnknownDefaults: true, ...(srcOrOptions ?? {}) }

  return <Defaults extends PartialKeys<PropsOptions> = {}>(
    defaults?: Defaults
  ): AppendDefault<PropsOptions, Defaults> => {
    if (defaults && options.warnUnknownDefaults) {
      for (const key of Object.keys(defaults)) {
        if (!(key in props)) {
          consoleWarn(
            `propsFactory: unknown default key '${String(
              key
            )}'${options.source ? ` in '${options.source}'` : ''}`
          )
        }
      }
    }

    const out = Object.keys(props).reduce<any>((obj, key) => {
      const base = (props as any)[key]
      const isObjectDefinition =
        typeof base === 'object' && base != null && !Array.isArray(base)
      const definition = isObjectDefinition ? base : { type: base }

      if (defaults && key in defaults) {
        const defVal = (defaults as any)[key]
        obj[key] = {
          ...definition,
          default:
            options.wrapObjectDefaults === false
              ? defVal
              : wrapDefaultIfNeeded(defVal),
        }
      } else {
        obj[key] = definition
      }

      if (options.source && !obj[key].source) {
        obj[key].source = options.source
      }

      return obj
    }, {})

    return out
  }
}

type AppendDefault<T extends ComponentObjectPropsOptions, D extends PartialKeys<T>> = {
  [P in keyof T]-?: unknown extends D[P]
    ? T[P]
    : T[P] extends Record<string, unknown>
      ? Omit<T[P], 'type' | 'default'> & {
        type: PropType<MergeTypeDefault<T[P], D[P]>>
        default: MergeDefault<T[P], D[P]>
      }
      : {
        type: PropType<MergeTypeDefault<T[P], D[P]>>
        default: MergeDefault<T[P], D[P]>
      }
}

type MergeTypeDefault<T, D, P = InferPropType<T>> = unknown extends D
  ? P
  : (P | D)
type MergeDefault<T, D, P = InferPropType<T>> = unknown extends D
  ? P
  : (NonNullable<P> | D)

/**
 * Like `Partial<T>` but doesn't care what the value is
 */
type PartialKeys<T> = { [P in keyof T]?: unknown }

// Copied from Vue
type InferPropType<T> = [T] extends [null]
  ? any // null & true would fail to infer
  : [T] extends [{ type: null | true }]
    // As TS issue https://github.com/Microsoft/TypeScript/issues/14829
    // somehow `ObjectConstructor` when inferred from { (): T } becomes `any`
    // `BooleanConstructor` when inferred from PropConstructor(with PropMethod) becomes `Boolean`
    ? any
    : [T] extends [ObjectConstructor | { type: ObjectConstructor }]
      ? Record<string, any>
      : [T] extends [BooleanConstructor | { type: BooleanConstructor }]
        ? boolean
        : [T] extends [DateConstructor | { type: DateConstructor }]
          ? Date
          : [T] extends [(infer U)[] | { type: (infer U)[] }]
            ? U extends DateConstructor
              ? Date | InferPropType<U>
              : InferPropType<U>
            : [T] extends [Prop<infer V, infer D>]
              ? unknown extends V
                ? IfAny<V, V, D>
                : V
              : T
