<template>
  <DemoContainer title="SPDialog 对话框组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="最简单的对话框使用方式">
      <div class="demo-row">
        <sp-btn @click="basicDialog = true">打开基础对话框</sp-btn>

        <sp-dialog v-model="basicDialog">
          <div class="dialog-content">
            <h3>基础对话框</h3>
            <p>这是一个基础的对话框示例。</p>
            <div class="dialog-actions">
              <sp-btn
                @click="basicDialog = false"
                variant="text"
              >
                取消
              </sp-btn>
              <sp-btn
                @click="basicDialog = false"
                variant="filled"
              >
                确定
              </sp-btn>
            </div>
          </div>
        </sp-dialog>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 全屏对话框 -->
    <DemoSection title="全屏对话框" subtitle="占据整个屏幕空间的对话框">
      <div class="demo-row">
        <sp-btn
          @click="fullscreenDialog = true"
          variant="filled"
          color="primary"
        >
          打开全屏对话框
        </sp-btn>

        <sp-dialog
          v-model="fullscreenDialog"
          fullscreen
        >
          <div class="dialog-content fullscreen-content">
            <div class="dialog-header">
              <h3>全屏对话框</h3>
              <sp-btn
                @click="fullscreenDialog = false"
                variant="text"
                icon
              >
                ✕
              </sp-btn>
            </div>
            <div class="dialog-body">
              <p>这是一个全屏对话框，占据整个屏幕空间。</p>
              <p>适用于需要大量内容展示的场景。</p>
            </div>
            <div class="dialog-actions">
              <sp-btn
                @click="fullscreenDialog = false"
                variant="text"
              >
                关闭
              </sp-btn>
            </div>
          </div>
        </sp-dialog>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 可滚动对话框 -->
    <DemoSection title="可滚动对话框" subtitle="内容超出时显示滚动条">
      <div class="demo-row">
        <sp-btn
          @click="scrollableDialog = true"
          variant="filled"
          color="secondary"
        >
          打开可滚动对话框
        </sp-btn>

        <sp-dialog
          v-model="scrollableDialog"
          scrollable
          max-width="600px"
        >
          <div class="dialog-content">
            <h3>可滚动对话框</h3>
            <div class="scrollable-content">
              <p
                v-for="i in 20"
                :key="i"
              >
                这是第 {{ i }} 段内容。当内容超出对话框高度时，会出现滚动条。
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div class="dialog-actions">
              <sp-btn
                @click="scrollableDialog = false"
                variant="text"
              >
                取消
              </sp-btn>
              <sp-btn
                @click="scrollableDialog = false"
                variant="filled"
              >
                确定
              </sp-btn>
            </div>
          </div>
        </sp-dialog>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同尺寸 -->
    <DemoSection title="不同尺寸" subtitle="小、中、大三种尺寸的对话框">
      <div class="demo-row">
        <sp-btn
          @click="smallDialog = true"
          variant="outlined"
        >
          小对话框
        </sp-btn>
        <sp-btn
          @click="mediumDialog = true"
          variant="outlined"
        >
          中等对话框
        </sp-btn>
        <sp-btn
          @click="largeDialog = true"
          variant="outlined"
        >
          大对话框
        </sp-btn>

        <!-- 小对话框 -->
        <sp-dialog
          v-model="smallDialog"
          max-width="400px"
        >
          <div class="dialog-content">
            <h3>小对话框</h3>
            <p>这是一个小尺寸的对话框。</p>
            <div class="dialog-actions">
              <sp-btn
                @click="smallDialog = false"
                variant="text"
              >
                关闭
              </sp-btn>
            </div>
          </div>
        </sp-dialog>

        <!-- 中等对话框 -->
        <sp-dialog
          v-model="mediumDialog"
          max-width="600px"
        >
          <div class="dialog-content">
            <h3>中等对话框</h3>
            <p>这是一个中等尺寸的对话框，适合大多数使用场景。</p>
            <div class="dialog-actions">
              <sp-btn
                @click="mediumDialog = false"
                variant="text"
              >
                关闭
              </sp-btn>
            </div>
          </div>
        </sp-dialog>

        <!-- 大对话框 -->
        <sp-dialog
          v-model="largeDialog"
          max-width="800px"
        >
          <div class="dialog-content">
            <h3>大对话框</h3>
            <p>这是一个大尺寸的对话框，适合展示更多内容。</p>
            <p>可以包含表单、表格或其他复杂的内容结构。</p>
            <div class="dialog-actions">
              <sp-btn
                @click="largeDialog = false"
                variant="text"
              >
                关闭
              </sp-btn>
            </div>
          </div>
        </sp-dialog>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 带激活器的对话框 -->
    <DemoSection title="带激活器的对话框" subtitle="使用激活器插槽的对话框">
      <div class="demo-row">
        <sp-dialog v-model="activatorDialog">
          <template #activator="{ props }">
            <sp-btn
              v-bind="props"
              variant="filled"
              color="success"
            >
              点击打开对话框
            </sp-btn>
          </template>

          <div class="dialog-content">
            <h3>激活器对话框</h3>
            <p>这个对话框使用了激活器插槽，点击按钮即可打开。</p>
            <div class="dialog-actions">
              <sp-btn
                @click="activatorDialog = false"
                variant="text"
              >
                取消
              </sp-btn>
              <sp-btn
                @click="activatorDialog = false"
                variant="filled"
              >
                确定
              </sp-btn>
            </div>
          </div>
        </sp-dialog>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 表单对话框 -->
    <DemoSection title="表单对话框" subtitle="包含表单的对话框">
      <div class="demo-row">
        <sp-btn
          @click="formDialog = true"
          variant="filled"
          color="warning"
        >
          打开表单对话框
        </sp-btn>

        <sp-dialog
          v-model="formDialog"
          max-width="500px"
        >
          <div class="dialog-content">
            <h3>用户信息</h3>
            <sp-form @submit="handleFormSubmit">
              <sp-text-field
                v-model="formData.name"
                label="姓名"
                required
              />
              <sp-text-field
                v-model="formData.email"
                label="邮箱"
                type="email"
                required
              />
              <sp-textarea
                v-model="formData.message"
                label="留言"
                rows="3"
              />

              <div class="dialog-actions">
                <sp-btn
                  @click="formDialog = false"
                  variant="text"
                >
                  取消
                </sp-btn>
                <sp-btn
                  type="submit"
                  variant="filled"
                >
                  提交
                </sp-btn>
              </div>
            </sp-form>
          </div>
        </sp-dialog>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 确认对话框 -->
    <DemoSection title="确认对话框" subtitle="用于确认操作的对话框">
      <div class="demo-row">
        <sp-btn
          @click="confirmDialog = true"
          variant="filled"
          color="error"
        >
          删除操作
        </sp-btn>

        <sp-dialog
          v-model="confirmDialog"
          max-width="400px"
        >
          <div class="dialog-content">
            <div class="confirm-icon">⚠️</div>
            <h3>确认删除</h3>
            <p>您确定要删除这个项目吗？此操作无法撤销。</p>
            <div class="dialog-actions">
              <sp-btn
                @click="confirmDialog = false"
                variant="text"
              >
                取消
              </sp-btn>
              <sp-btn
                @click="handleDelete"
                variant="filled"
                color="error"
              >
                删除
              </sp-btn>
            </div>
          </div>
        </sp-dialog>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 嵌套对话框 -->
    <DemoSection title="嵌套对话框" subtitle="对话框中打开另一个对话框">
      <div class="demo-row">
        <sp-btn
          @click="parentDialog = true"
          variant="filled"
        >
          打开父对话框
        </sp-btn>

        <sp-dialog
          v-model="parentDialog"
          max-width="600px"
        >
          <div class="dialog-content">
            <h3>父对话框</h3>
            <p>这是父对话框，可以在其中打开子对话框。</p>
            <sp-btn
              @click="childDialog = true"
              variant="outlined"
            >
              打开子对话框
            </sp-btn>
            <div class="dialog-actions">
              <sp-btn
                @click="parentDialog = false"
                variant="text"
              >
                关闭
              </sp-btn>
            </div>
          </div>
        </sp-dialog>

        <sp-dialog
          v-model="childDialog"
          max-width="400px"
        >
          <div class="dialog-content">
            <h3>子对话框</h3>
            <p>这是嵌套在父对话框中的子对话框。</p>
            <div class="dialog-actions">
              <sp-btn
                @click="childDialog = false"
                variant="text"
              >
                关闭
              </sp-btn>
            </div>
          </div>
        </sp-dialog>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 事件监听 -->
    <DemoSection title="事件监听" subtitle="监听对话框的打开和关闭事件">
      <div class="demo-row">
        <sp-btn
          @click="eventDialog = true"
          variant="filled"
        >
          打开事件对话框
        </sp-btn>

        <sp-dialog
          v-model="eventDialog"
          @after-enter="onDialogEnter"
          @after-leave="onDialogLeave"
        >
          <div class="dialog-content">
            <h3>事件对话框</h3>
            <p>这个对话框会触发进入和离开事件。</p>
            <div class="event-log">
              <h4>事件日志：</h4>
              <ul>
                <li
                  v-for="(event, index) in eventLog"
                  :key="index"
                >
                  {{ event }}
                </li>
              </ul>
            </div>
            <div class="dialog-actions">
              <sp-btn
                @click="eventDialog = false"
                variant="text"
              >
                关闭
              </sp-btn>
            </div>
          </div>
        </sp-dialog>
      </div>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import DemoContainer from '../components/DemoContainer.vue'
  import DemoSection from '../components/DemoSection.vue'

  // 对话框状态
  const basicDialog = ref(false)
  const fullscreenDialog = ref(false)
  const scrollableDialog = ref(false)
  const smallDialog = ref(false)
  const mediumDialog = ref(false)
  const largeDialog = ref(false)
  const activatorDialog = ref(false)
  const formDialog = ref(false)
  const confirmDialog = ref(false)
  const parentDialog = ref(false)
  const childDialog = ref(false)
  const eventDialog = ref(false)

  // 表单数据
  const formData = reactive({
    name: '',
    email: '',
    message: '',
  })

  // 事件日志
  const eventLog = ref<string[]>([])

  // 表单提交
  const handleFormSubmit = (event: Event) => {
    event.preventDefault()
    console.log('表单数据:', formData)
    alert('表单提交成功！')
    formDialog.value = false
    // 重置表单
    Object.assign(formData, { name: '', email: '', message: '' })
  }

  // 删除操作
  const handleDelete = () => {
    alert('删除成功！')
    confirmDialog.value = false
  }

  // 对话框事件
  const onDialogEnter = () => {
    const timestamp = new Date().toLocaleTimeString()
    eventLog.value.push(`${timestamp} - 对话框已打开`)
  }

  const onDialogLeave = () => {
    const timestamp = new Date().toLocaleTimeString()
    eventLog.value.push(`${timestamp} - 对话框已关闭`)
  }
</script>

<style scoped>
  .demo-row {
    display: flex;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
  }

  .dialog-content {
    padding: 24px;
  }

  .dialog-content h3 {
    margin: 0 0 16px 0;
    font-size: 20px;
    font-weight: 600;
  }

  .dialog-content p {
    margin: 0 0 16px 0;
    color: var(--sp-color-text-secondary);
    line-height: 1.5;
  }

  .dialog-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;
  }

  .form-field {
    margin-bottom: 16px;
  }

  .form-field label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .form-field input,
  .form-field textarea {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--sp-color-border);
    border-radius: 4px;
    font-size: 14px;
  }

  .form-field textarea {
    resize: vertical;
    min-height: 80px;
  }

  .confirm-icon {
    font-size: 48px;
    text-align: center;
    margin-bottom: 16px;
  }

  .event-log {
    margin-top: 16px;
    padding: 16px;
    background: var(--sp-color-surface-variant);
    border-radius: 8px;
  }

  .event-log h4 {
    margin: 0 0 12px 0;
    font-size: 16px;
  }

  .event-log ul {
    margin: 0;
    padding-left: 20px;
  }

  .event-log li {
    margin-bottom: 4px;
    font-size: 14px;
    color: var(--sp-color-text-secondary);
  }

  .scrollable-content {
    height: 300px;
    overflow-y: auto;
    padding: 16px;
  }

  .scrollable-content p {
    margin-bottom: 16px;
  }
</style>
