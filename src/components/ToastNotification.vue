<script setup>
import { toast } from 'vue3-toastify';

// 顯示成功的 Toast
const showSuccessToast = (message) => {
  toast.success(message);
};

// 顯示錯誤的 Toast
const showErrorToast = (message) => {
  toast.error(message);
};

// 顯示信息的 Toast
const showInfoToast = (message) => {
  toast.info(message);
};

// 顯示警告的 Toast
const showWarningToast = (message) => {
  toast.warning(message);
};

defineExpose({
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  showWarningToast
});
</script>

<template>
    <div>

    </div>
</template>


  