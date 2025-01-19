<script setup>
import ToastNotification from '@/components/ToastNotification.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
const api = import.meta.env.VITE_API_URL
const toast = ref(null) // 彈窗訊息
const customersData = ref([]) // 會員資料
const pagination = ref({}) // 分頁資料

const getCategories = async () => {
  try {
    const { data } = await axios.get(`${api}/admin/users`)
    customersData.value = Object.values(data.data)
    console.log(customersData.value)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  try {
    await getCategories()
  } catch (error) {
    console.error(error.message)
  }
})
</script>

<template>
  <div class="container-fluid">
    <ToastNotification ref="toast"></ToastNotification>
    <div class="row mb-4">
      <div class="col">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <h2>會員</h2>
            <nav>
              <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item">
                  <router-link to="/admin/dashboard">首頁</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">會員</li>
              </ol>
            </nav>
          </div>
          <router-link to="/admin/customer" class="btn btn-primary">
            新增會員
          </router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="p-4">
            <div class="justify-content-between row">
              <div class="mb-2 mb-lg-0 col-lg-4 col-md-6 col-12">
                <form class="d-flex">
                  <input
                    placeholder="搜尋類別"
                    class="form-control"
                    type="search"
                  />
                </form>
              </div>
              <div class="col-lg-2 col-md-4 col-12">
                <select class="form-select">
                  <option value="">狀態</option>
                  <option value="published">已上架</option>
                  <option value="unpublished">未上架</option>
                </select>
              </div>
            </div>
          </div>
          <div class="card-body p-0">
            <table class="table table-borderless align-middle table-hover">
              <thead class="table-light">
                <tr>
                  <th colspan="1">
                    <input class="form-check-input" type="checkbox" />
                  </th>
                  <th colspan="1">姓名</th>
                  <th colspan="1">狀態</th>
                  <!-- <th colspan="1">等級</th> -->
                  <th colspan="1">電話</th>
                  <th colspan="1">電子郵件</th>
                  <th colspan="1">總消費金額</th>
                  <th colspan="1">註冊日期</th>
                  <th colspan="1"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="customer in customersData" :key="customer.id">
                  <td colspan="1">
                    <input class="form-check-input" type="checkbox" />
                  </td>
                  <td>{{ customer.userName }}</td>
                  <!-- <td>黑卡會員</td> -->
                  <td>
                    <span
                      class="badge"
                      :class="[
                        customer.verified ? 'bg-success' : 'bg-secondary',
                      ]"
                      >{{ customer.verified ? '已驗證' : '未驗證' }}</span
                    >
                  </td>
                  <td>{{ customer.phoneNumber }}</td>
                  <td>{{ customer.email }}</td>
                  <td>4,000,000</td>
                  <td>{{ customer.createdAt }}</td>
                  <td>
                    <div class="dropdown">
                      <button
                        class="text-reset btn p-0 border-0"
                        id=""
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="fs-5"
                        >
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="12" cy="5" r="1"></circle>
                          <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                      </button>
                      <div
                        class="dropdown-menu dropdown-menu-end py-0"
                        aria-labelledby=""
                      >
                        <ul class="p-2 list-unstyled mb-0">
                          <li>
                            <router-link
                              to="/admin/customer"
                              class="dropdown-item px-1 d-flex align-items-center"
                              href="#"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-trash me-2"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                />
                                <path
                                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                />
                              </svg>
                              編輯
                            </router-link>
                          </li>
                          <li>
                            <button
                              class="dropdown-item px-1 d-flex align-items-center btn"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-pencil-square me-2"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                />
                                <path
                                  fill-rule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                />
                              </svg>
                              刪除
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="border-top d-md-flex justify-content-between align-items-center p-3"
            >
              <div>顯示1到 10 個項目 （共14 個項目）</div>
              <nav class="mt-2 mt-md-0 navbar navbar-expand">
                <ul class="mb-0 pagination">
                  <li class="page-item mx-1 disabled">
                    <span class="page-link">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-chevron-left"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                        />
                      </svg>
                    </span>
                  </li>
                  <li class="page-item mx-1 active">
                    <span class="page-link rounded-1"
                      >1<span class="visually-hidden">(current)</span></span
                    >
                  </li>
                  <li class="page-item mx-1">
                    <a
                      class="page-link rounded-1"
                      role="button"
                      tabindex="0"
                      href="#"
                      >2</a
                    >
                  </li>
                  <li class="page-item mx-1">
                    <a class="page-link" role="button" tabindex="0" href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-chevron-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
