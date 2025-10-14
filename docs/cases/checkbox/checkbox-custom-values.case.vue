<text>
> 实际应用场景，复选框控制其他组件的启用状态
</text>

<template>
  <div class="checkbox-practical-demo">
    <div class="form-item">
      <sp-checkbox
        v-model="includeFiles"
        label="Include files"
      />
      <sp-text-field
        v-model="filePattern"
        label="File pattern"
        placeholder="*.js, *.vue, *.ts"
        :disabled="!includeFiles"
        variant="outlined"
      />
    </div>

    <div class="form-item">
      <sp-checkbox
        v-model="enableNotifications"
        label="I only work if you check the box"
      />
      <sp-text-field
        v-model="emailAddress"
        label="Email address"
        placeholder="your@email.com"
        :disabled="!enableNotifications"
        variant="outlined"
      />
    </div>

    <div class="form-item">
      <sp-checkbox
        v-model="agreeTerms"
        label="I agree to the terms and conditions"
      />
      <sp-btn
        :disabled="!agreeTerms"
        color="primary"
        variant="filled"
      >
        Submit
      </sp-btn>
    </div>

    <div class="form-item">
      <sp-checkbox
        v-model="enableAdvanced"
        label="Enable advanced options"
      />
      <div
        class="advanced-options"
        :class="{ disabled: !enableAdvanced }"
      >
        <sp-text-field
          v-model="advancedOption1"
          label="Max connections"
          :disabled="!enableAdvanced"
          variant="outlined"
          type="number"
        />
        <sp-text-field
          v-model="advancedOption2"
          label="Timeout (ms)"
          :disabled="!enableAdvanced"
          variant="outlined"
          type="number"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const includeFiles = ref(false)
  const filePattern = ref('')

  const enableNotifications = ref(false)
  const emailAddress = ref('')

  const agreeTerms = ref(false)

  const enableAdvanced = ref(false)
  const advancedOption1 = ref('10')
  const advancedOption2 = ref('5000')
</script>

<style scoped>
  .checkbox-practical-demo {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .form-item {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .advanced-options {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 6px;
    transition: opacity 0.2s;
  }

  .advanced-options.disabled {
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    .advanced-options {
      flex-direction: column;
    }
  }
</style>
