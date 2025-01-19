<script setup>
import ToastNotification from '@/components/ToastNotification.vue';
import { ref } from 'vue';
import axios from 'axios';
const api = import.meta.env.VITE_API_URL;
const toast = ref(null); // 彈窗訊息
const uploadFile = ref(null); // 上傳檔案
const url = ref('');
const isLoading = ref(false); // 控制按鈕讀取狀態
const handleFileChange = (event) => {
      uploadFile.value = event.target.files[0];
    };

const upload = async () => {
  try {
    isLoading.value = true; // 顯示讀取動畫
    const formData = new FormData();
    formData.append('file', uploadFile.value);

    const response = await axios.post(`${api}/files/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    const successMessage = response.data.message || '檔案上傳成功';

    // 更新圖片 URL
    url.value = response.data.imageURL;

    // 顯示成功訊息
    toast.value.showSuccessToast(successMessage);

  } catch (error) {
    toast.value.showErrorToast(error.response.data.message || '檔案上傳失敗');
  } finally {
    isLoading.value = false; // 隱藏讀取動畫
  }
}
// 複製 URL 到剪貼簿
const copyToClipboard = () => {
  if (!url.value) {
    toast.value.showErrorToast('無可複製的網址！');
    return;
  }

  navigator.clipboard.writeText(url.value).then(() => {
    toast.value.showSuccessToast('網址已成功複製！');
  }).catch(() => {
    toast.value.showErrorToast('複製失敗，請手動複製！');
  });
};
</script>

<template>
  <div>
    <ToastNotification ref="toast"></ToastNotification>

    <!-- 上傳表單 -->
    <div class="row mb-3">
      <div class="col">
        <input class="form-control" type="file" name="file" required @change="handleFileChange">
      </div>
      <div class="col">
        <button @click="upload" type="button" class="btn btn-primary" :disabled="isLoading">
          <template v-if="isLoading">
            <div class="spinner-border spinner-border-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            上傳中...
          </template>
          <template v-else>
            上傳
          </template>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-8">
          <label class="form-label">圖片網址:</label>
          <input type="text" class="form-control" v-model="url">
          <button @click="copyToClipboard" class="btn btn-secondary mt-2">複製網址</button>
      </div>
    </div>

  </div>
</template>
