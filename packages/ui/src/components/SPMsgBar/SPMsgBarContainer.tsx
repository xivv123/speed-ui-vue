// Styles
import './SPMsgBar.sass'

// Components
import { SPMsgBar } from './SPMsgBar'
import { SPBtn } from '../SPBtn'

// Composables
import { useMsgBar } from './useMsgBar'

// Utilities
import { defineComponent } from 'vue'

export const SPMsgBarContainer = defineComponent({
  name: 'SPMsgBarContainer',

  setup() {
    const msgBar = useMsgBar()

    return () => (
      <>
        {msgBar.list.value.map((item) => (
          <SPMsgBar
            key={item.id}
            v-model={item.visible}
            text={item.text}
            color={item.color}
            variant={item.variant}
            location={item.location}
            timeout={item.timeout}
            timer={item.timer}
            multiLine={item.multiLine}
            vertical={item.vertical}
            rounded={item.rounded}
            onUpdate:modelValue={(visible: boolean) => {
              if (!visible) {
                msgBar.hide(item.id)
              }
            }}
          >
            {item.actions.length > 0 && (
              <template v-slot:actions>
                {item.actions.map((action, index) => (
                  <SPBtn
                    key={index}
                    variant={action.variant || 'text'}
                    color={action.color}
                    size="small"
                    onClick={action.onClick}
                  >
                    {action.text}
                  </SPBtn>
                ))}
              </template>
            )}
          </SPMsgBar>
        ))}
      </>
    )
  },
})

export type SPMsgBarContainer = InstanceType<typeof SPMsgBarContainer>