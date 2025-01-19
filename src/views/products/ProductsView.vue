<script setup>
import ToastNotification from '@/components/ToastNotification.vue'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'
const api = import.meta.env.VITE_API_URL
const toast = ref(null) // 彈窗訊息
const router = useRouter()
const productsData = ref([]) // 商品資料
const pagination = ref({}) // 分頁資料
const categories = ref([]) // 類別資料
const selectedCategory = ref('') // 選擇的類別
const searchQuery = ref('') // 搜尋關鍵字
const loadedImages = ref({}) // 用於追蹤每個圖片是否載入完成
// 取得商品列表，並傳遞分頁和搜尋參數
const getProducts = async (
  page = 1,
  limit = 10,
  category = '',
  status = '',
) => {
  try {
    const { data } = await axios.get(`${api}/products/all`, {
      params: { page, limit, category, status }, // 傳遞分頁、類別 狀態
    })
    if (data?.data) {
      productsData.value = data.data.products || []
      pagination.value = data.data.pagination || pagination.value
    } else {
      console.warn('無效的 API 回應結構', data)
    }
  } catch (error) {
    console.error('API 請求失敗:', error)
  }
}

// 當圖片成功載入後，更新 `loadedImages` 狀態
const onImageLoad = productId => {
  loadedImages.value[productId] = true
}
// 編輯商品
const editProduct = id => {
  router.push(`/admin/product/${id}`)
}

// 刪除商品
const deleteProduct = async (id, title) => {
  try {
    const result = await Swal.fire({
      title: '刪除產品',
      text: `確定要刪除${title}嗎`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#b6b6b6',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    })

    // 如果使用者確認刪除
    if (result.isConfirmed) {
      // 發送刪除請求
      const response = await axios.delete(`${api}/products/product/${id}`)
      const successMessage = response.data.message || '產品刪除成功！'

      // 顯示成功訊息
      toast.value.showSuccessToast(successMessage)

      // 彈出成功提示視窗
      await Swal.fire({
        title: '成功!',
        text: `刪除${title}成功`,
        icon: 'success',
      })

      await getProducts(
        pagination.value.currentPage,
        pagination.value.limit,
        selectedCategory.value,
        searchQuery.value,
      )
    }
  } catch (error) {
    console.error('API 請求失敗:', error)
    toast.value.showErrorToast(error)
  }
}

// 計算目前頁面顯示的商品範圍
const startItem = computed(() =>
  Math.max((pagination.value.currentPage - 1) * pagination.value.limit + 1, 0),
)
const endItem = computed(() =>
  Math.min(
    pagination.value.currentPage * pagination.value.limit,
    pagination.value.totalItems,
  ),
)

// 動態生成頁碼
const totalPages = computed(() =>
  Array.from({ length: pagination.value.totalPages }, (_, i) => i + 1),
)

// 處理頁數變更
const changePage = async page => {
  if (page < 1 || page > pagination.value.totalPages) return
  if (page !== pagination.value.currentPage) {
    pagination.value.currentPage = page
    await getProducts(
      page,
      pagination.value.limit,
      selectedCategory.value,
      searchQuery.value,
    )
  }
}

// 取得類別資料
const getCategories = async () => {
  try {
    const { data } = await axios.get(`${api}/categories/all`)
    categories.value = Object.values(data.data)
  } catch (error) {
    console.error('API 請求失敗:', error)
  }
}

// 處理類別選擇變更
const fetchProducts = async () => {
  await getProducts(
    1,
    pagination.value.limit,
    selectedCategory.value,
    searchQuery.value,
  )
}

// 處理上架選擇變更
// const isEnabledProducts = async (status) => {
//   await getProducts(1, pagination.value.limit, selectedCategory.value, status);
// };

onMounted(async () => {
  try {
    await getProducts()
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
            <h2>產品</h2>
            <nav>
              <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item">
                  <router-link to="/admin/dashboard">首頁</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">產品</li>
              </ol>
            </nav>
          </div>
          <router-link to="/admin/product" class="btn btn-primary">
            新增產品
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
                    placeholder="搜尋產品"
                    class="form-control"
                    type="search"
                  />
                </form>
              </div>
              <div class="col-lg-2 col-md-4 col-12">
                <!-- <select class="form-select" @change="isEnabledProducts($event.target.value)">
                  <option value="">狀態</option>
                  <option value="1">以上架</option>
                  <option value="0">未上架</option>
                </select> -->
                <select
                  class="form-select"
                  v-model="selectedCategory"
                  @change="fetchProducts"
                >
                  <option value="">所有類別</option>
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.name"
                  >
                    {{ category.name }}
                  </option>
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
                  <th colspan="1">圖片</th>
                  <th colspan="1">產品名稱</th>
                  <th colspan="1">類別</th>
                  <th colspan="1">狀態</th>
                  <th colspan="1">價格</th>
                  <th colspan="1">上架日期</th>
                  <th colspan="1"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in productsData" :key="product.id">
                  <td colspan="1">
                    <input class="form-check-input" type="checkbox" />
                  </td>
                  <td>
                    <div
                      v-if="!loadedImages[product.id]"
                      class="productImg bg-light placeholder-glow"
                    >
                      <span class="placeholder w-100 h-100"></span>
                    </div>
                    <img
                      class="productImg"
                      :src="product.imageUrl"
                      :alt="product.title"
                      @load="onImageLoad(product.id)"
                    />
                  </td>
                  <td>{{ product.title }}</td>
                  <td>{{ product.category }}</td>
                  <td>
                    <span
                      class="badge"
                      :class="[
                        product.is_enabled ? 'bg-success' : 'bg-secondary',
                      ]"
                      >{{ product.is_enabled ? '已上架' : '未上架' }}</span
                    >
                  </td>
                  <td>{{ product.price }}</td>
                  <td>{{ product.createdAt }}</td>
                  <td>
                    <div class="dropdown">
                      <button
                        class="text-reset btn p-0 border-0"
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
                      <div class="dropdown-menu dropdown-menu-end py-0">
                        <ul class="p-2 list-unstyled mb-0">
                          <li>
                            <button
                              type="button"
                              @click="editProduct(product.id)"
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
                              編輯
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              @click="deleteProduct(product.id, product.title)"
                              class="dropdown-item px-1 d-flex align-items-center btn"
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
          </div>
        </div>
      </div>
    </div>
    <div
      class="border-top d-md-flex justify-content-between align-items-center p-3"
    >
      <div>
        顯示 {{ startItem }} - {{ endItem }} 共 {{ pagination.totalItems }} 筆
      </div>
      <nav>
        <ul class="pagination mb-0">
          <li
            class="page-item"
            :class="{ disabled: pagination.currentPage === 1 }"
          >
            <button
              class="page-link"
              @click="changePage(pagination.currentPage - 1)"
            >
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
            </button>
          </li>
          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: page === pagination.currentPage }"
          >
            <button class="page-link" @click="changePage(page)">
              {{ page }}
            </button>
          </li>
          <li
            class="page-item"
            :class="{
              disabled: pagination.currentPage === pagination.totalPages,
            }"
          >
            <button
              class="page-link"
              @click="changePage(pagination.currentPage + 1)"
            >
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
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
