<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';
import Swal from "sweetalert2";
const router = useRouter();
const api = import.meta.env.VITE_API_URL;
const isLoading = ref(false); // 控制按鈕讀取狀態
// 使用者資料
const userData = ref({
  email: "",
  displayName: "",
  password: "",
  role: "admin"
});

const confirmPassword = ref("");
const signUp = async () => {
  try {
    isLoading.value = true; // 顯示讀取動畫
    await axios.post(`${api}/admin/sign_up`, userData.value);

    // 彈出成功提示視窗
    await Swal.fire({
      title: '註冊成功!',
      text: `註冊成功，請前往登入頁登入`,
      icon: 'success',
    })

    await router.push('/admin/signin');
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false; // 隱藏讀取動畫
  }
}
// 表單提交方法
const submit = async () => {
  if (userData.value.password !== confirmPassword.value) {
    alert("密碼與確認密碼不一致！");
    return;
  }
  await signUp();
  console.log("註冊資料：", userData.value);
};
</script>
<template>
  <div>
    <div class="container mx-auto mt-5">
      <h1 class="mb-5 text-center fw-bold pt-5">後台管理中心註冊</h1>
      <form class="row" @submit.prevent="submit">
        <div class="col-12">
          <div class="mb-4">
            <label class="form-label fw-bold fs-5" for="emailInput">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              id="emailInput"
              v-model="userData.email"
              autocomplete="email"
              required
            />
          </div>
        </div>
        <div class="col-12">
          <div class="mb-4">
            <label class="form-label fw-bold fs-5" for="nameInput">
              姓名
            </label>
            <input
              type="text"
              class="form-control"
              id="nameInput"
              v-model="userData.displayName"
              autocomplete="name"
              required
            />
          </div>
        </div>
        <div class="col-12">
          <div class="mb-4">
            <label class="form-label fw-bold fs-5" for="passwordInput">
              密碼
            </label>
            <input
              type="password"
              class="form-control"
              id="passwordInput"
              v-model="userData.password"
              autocomplete="new-password"
              required
              minlength="6"
            />
          </div>
        </div>
        <div class="col-12">
          <div class="mb-4">
            <label class="form-label fw-bold fs-5" for="againPasswordInput">
              確認密碼
            </label>
            <input
              type="password"
              class="form-control"
              id="againPasswordInput"
              v-model="confirmPassword"
              autocomplete="new-password"
              required
              minlength="8"
            />
          </div>
        </div>
        <div class="col-12 align-content-end">
          <button type="submit" class="btn btn-primary w-100 mb-4">
            <template v-if="isLoading">
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden"></span>
              </div>
              註冊中...
            </template>
            <template v-else>註冊</template>
          </button>
        </div>
      </form>
      <p class="mb-4">
        已經有帳號？
        <router-link to="/admin/signIn">登入</router-link>
      </p>
    </div>
  </div>
</template>
<style scoped>
  .container {
    max-width: 460px;
  }
</style>
