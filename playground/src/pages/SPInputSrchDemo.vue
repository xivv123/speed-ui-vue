<template>
  <DemoContainer title="SPInputSrch 搜索输入框组件">
    <!-- 基础搜索 -->
    <DemoSection title="基础搜索" subtitle="默认搜索框">
      <sp-input-srch
        v-model="basicSearch"
        label="搜索框"
        placeholder="请输入搜索内容"
        @search="onBasicSearch"
      />
      <p style="margin-top: 8px; color: #666;">搜索值: {{ basicSearch }}</p>
      <p style="margin-top: 4px; color: #666;">最后搜索: {{ lastBasicSearch }}</p>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 搜索按钮位置 -->
    <DemoSection title="搜索按钮位置" subtitle="前置或后置搜索按钮">
      <div class="position-group">
        <div>
          <h4>搜索按钮在前面</h4>
          <sp-input-srch
            v-model="prependSearch"
            search-position="prepend"
            placeholder="搜索按钮在前面"
            @search="onPrependSearch"
          />
        </div>
        <div>
          <h4>搜索按钮在后面（默认）</h4>
          <sp-input-srch
            v-model="appendSearch"
            search-position="append"
            placeholder="搜索按钮在后面"
            @search="onAppendSearch"
          />
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 禁用和只读 -->
    <DemoSection title="禁用和只读状态" subtitle="不可编辑的状态">
      <div class="state-group">
        <div>
          <h4>禁用状态</h4>
          <sp-input-srch
            v-model="disabledSearch"
            disabled
            placeholder="禁用状态"
          />
        </div>
        <div>
          <h4>只读状态</h4>
          <sp-input-srch
            v-model="readonlySearch"
            readonly
            placeholder="只读状态"
          />
        </div>
      </div>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

const basicSearch = ref('')
const lastBasicSearch = ref('')
const prependSearch = ref('')
const appendSearch = ref('')
const disabledSearch = ref('禁用状态的值')
const readonlySearch = ref('只读状态的值')

function onBasicSearch(value: string) {
  lastBasicSearch.value = value
  console.log('基础搜索:', value)
}

function onPrependSearch(value: string) {
  console.log('前置搜索:', value)
}

function onAppendSearch(value: string) {
  console.log('后置搜索:', value)
}
</script>

<style scoped>
.position-group,
.state-group {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.position-group > div,
.state-group > div {
  flex: 1;
  min-width: 250px;
}

h4 {
  color: #555;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}
</style>
