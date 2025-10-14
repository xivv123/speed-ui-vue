// Components
import { SPListItem } from '@/components/SPList'
import { SPCheckboxBtn } from '@/components/SPCheckbox'
import SpIcon from '@/components/icon'

// Utilities
import { camelizeProps, genericComponent, useRender } from '@/utils'

// Types
import type { PropType } from 'vue'
import type { ListItem } from '@/composables/list-items'

export const SPSelectItem = genericComponent()({
  name: 'SPSelectItem',

  props: {
    item: {
      type: Object as PropType<ListItem>,
      required: true,
    },
    itemProps: {
      type: Object as PropType<Record<string, unknown>>, 
      required: true,
    },
    multiple: Boolean,
    hideSelected: Boolean,
  },

  setup(props) {
    useRender(() => {
      const camelizedProps = camelizeProps(props.item.props)

      return (
        <SPListItem
          {...(props.itemProps as any)}
          role="option"
        >
          {{
            prepend: ({ isSelected }: { isSelected: boolean }) => (
              <>
                {props.multiple && !props.hideSelected ? (
                  <SPCheckboxBtn
                    key={props.item.value}
                    modelValue={isSelected}
                    tabindex="-1"
                  />
                ) : undefined}

                {camelizedProps.prependIcon && (
                  <SpIcon name={camelizedProps.prependIcon} />
                )}
              </>
            ),
          }}
        </SPListItem>
      )
    })

    return {}
  },
})

export type SPSelectItem = InstanceType<typeof SPSelectItem>