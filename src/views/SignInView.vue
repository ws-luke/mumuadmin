<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const api = import.meta.env.VITE_API_URL;
const isLoading = ref(false); // 控制按鈕讀取狀態
const errorMessage = ref(""); // 錯誤訊息
// 使用者資料
const userData = ref({
  email: "",
  password: "",
});

const signIn = async () => {
  try {
    isLoading.value = true; // 顯示讀取動畫
    errorMessage.value = ""; // 清除錯誤訊息
    const response = await axios.post(`${api}/admin/sign_in`, userData.value);
    console.log(response);
    // 請求成功後跳轉
    localStorage.setItem("token", response.data.token);
    router.push("/admin");
  } catch (error) {
    console.error(error);
    // 設定錯誤訊息
    errorMessage.value =
      error.response?.data?.message || "登入失敗，請檢查帳號或密碼！";
  } finally {
    isLoading.value = false; // 隱藏讀取動畫
  }
};

// 表單提交方法
const submit = async () => {
  // 驗證表單
  if (!userData.value.email || !userData.value.password) {
    errorMessage.value = "請輸入完整的電子郵件與密碼";
    return;
  }
  if (userData.value.password.length < 6) {
    errorMessage.value = "密碼至少需要 6 個字元";
    return;
  }
  await signIn();
};
</script>

<template>
  <div>
    <div class="container mx-auto mt-5">
      <h1 class="fw-bold text-center mb-5 pt-5">後台管理中心</h1>
      <form>
        <!-- 錯誤訊息 -->
        <p v-if="errorMessage" class="text-danger text-center mb-3">
          {{ errorMessage }}
        </p>
        <div class="form-floating mb-4">
          <input
            type="email"
            class="form-control"
            id="emailInput"
            v-model="userData.email"
            placeholder="電子郵件"
            autocomplete="email"
            required
          />
          <label for="emailInput">電子郵件</label>
        </div>
        <div class="form-floating mb-4">
          <input
            type="password"
            class="form-control"
            id="passwordInput"
            v-model="userData.password"
            placeholder="密碼"
            autocomplete="new-password"
            required
            minlength="6"
          />
          <label for="passwordInput">密碼</label>
        </div>
        <button
          type="button"
          class="btn btn-primary w-100 mb-4"
          @click="submit"
          :disabled="isLoading"
        >
          <template v-if="isLoading">
            <div class="spinner-border spinner-border-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </template>
          <template v-else>登入</template>
        </button>
      </form>
      <p  class="text-center">
        <router-link to="/admin/signUp">註冊</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 460px;
}
.text-danger {
  color: red;
}
</style>
