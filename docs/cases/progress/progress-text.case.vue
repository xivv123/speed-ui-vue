<template>
  <div class="progress-text-demo">
    <h4>带文字提示的进度条</h4>
    
    <div class="demo-section">
      <h5>上传进度</h5>
      <div
        v-progress="{
          value: uploadProgress,
          color: 'blue',
          height: 6,
          text: `上传中 ${uploadProgress}%`,
          autoDisappear: false
        }"
        class="demo-container"
      >
        <div class="content">
          <p>文件上传进度: {{ uploadProgress }}%</p>
          <div class="controls">
            <button @click="startUpload" :disabled="uploading">开始上传</button>
            <button @click="pauseUpload" :disabled="!uploading">暂停</button>
            <button @click="resetUpload">重置</button>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h5>下载进度</h5>
      <div
        v-progress="{
          value: downloadProgress,
          color: 'green',
          height: 4,
          text: `下载中 ${downloadProgress}%`,
          autoDisappear: true
        }"
        class="demo-container"
      >
        <div class="content">
          <p>文件下载进度: {{ downloadProgress }}%</p>
          <div class="controls">
            <button @click="startDownload" :disabled="downloading">开始下载</button>
            <button @click="resetDownload">重置</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const uploadProgress = ref(0)
const downloadProgress = ref(0)
const uploading = ref(false)
const downloading = ref(false)
let uploadTimer = null
let downloadTimer = null

function startUpload() {
  uploading.value = true
  uploadTimer = setInterval(() => {
    if (uploadProgress.value < 100) {
      uploadProgress.value += Math.random() * 10
      if (uploadProgress.value > 100) {
        uploadProgress.value = 100
      }
    } else {
      clearInterval(uploadTimer)
      uploading.value = false
    }
  }, 500)
}

function pauseUpload() {
  uploading.value = false
  if (uploadTimer) {
    clearInterval(uploadTimer)
    uploadTimer = null
  }
}

function resetUpload() {
  pauseUpload()
  uploadProgress.value = 0
}

function startDownload() {
  downloading.value = true
  downloadTimer = setInterval(() => {
    if (downloadProgress.value < 100) {
      downloadProgress.value += Math.random() * 15
      if (downloadProgress.value > 100) {
        downloadProgress.value = 100
      }
    } else {
      clearInterval(downloadTimer)
      downloading.value = false
    }
  }, 300)
}

function resetDownload() {
  downloading.value = false
  if (downloadTimer) {
    clearInterval(downloadTimer)
    downloadTimer = null
  }
  downloadProgress.value = 0
}
</script>

<style scoped>
.progress-text-demo {
  padding: 1rem;
}

.demo-section {
  margin-bottom: 2rem;
}

.demo-section h5 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-weight: 600;
}

.demo-container {
  position: relative;
  height: 120px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
}

.content {
  text-align: center;
}

.controls {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.controls button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.controls button:hover:not(:disabled) {
  background: #f0f0f0;
  border-color: #999;
}

.controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>