<script setup>
import ToastNotification from '@/components/ToastNotification.vue';
import { ref , onMounted } from 'vue';
import * as bootstrap from 'bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
const api = import.meta.env.VITE_API_URL;

const toast = ref(null); // 彈窗訊息
const categoriesData = ref([]); // 主類別內容
const selectedCategory = ref({ name: '',is_enabled: '', subcategories: '' }); // 選擇的主類別
const categoryModalRef = ref(null); // 主類別彈窗元素
const categoryId = ref(null); // 主類別ID
const subCategoriesData = ref([]); // 子類別內容
const selectedSubCategory = ref({ name: '',is_enabled: '' }); // 選擇的子類別
const subCategoryModalRef = ref(null); // 子類別彈窗元素

// 開啟新增或編輯主類別彈窗
const openEditCategoryModal = (category) => {
  selectedCategory.value = { ...category };
  const modal = new bootstrap.Modal(categoryModalRef.value);
  modal.show();
};

//關閉主類別彈窗
const closeCategoryModal = () => {
  const modalElement  = document.getElementById('categoryModal');
  if (modalElement) {
    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modal.hide(); // 正確關閉 Modal
  }
}
// 取得主類別資料
const getCategoryData = async () => {
  const { data } = await axios.get(`${api}/categories/all`);
  categoriesData.value = Object.values(data.data);
}

// 儲存主類別
const saveCategory = async () => {
  try {
    if (selectedCategory.value.id) {
      // 有 ID 則更新類別
      const response = await axios.put(`${api}/categories/${selectedCategory.value.id}`, selectedCategory.value);
      const successMessage = response.data.message || '類別已成功更新';
      toast.value.showSuccessToast(successMessage);
    } else {
      // 無 ID 則新增類別
      const response = await axios.post(`${api}/categories/category`, selectedCategory.value);
      const successMessage = response.data.message || '類別已成功儲存';
      toast.value.showSuccessToast(successMessage);
    }
    await getCategoryData(); // 重新載入資料
    closeCategoryModal();
  } catch (error) {
    console.error('儲存類別失敗:', error);
  }
}

// 刪除主類別
const deleteCategory = async (id) => {
  try {
    const result = await Swal.fire({
      title: "刪除主類",
      text: "確定要刪除主類別嗎",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "確定",
      cancelButtonText: "取消"
    });

    // 如果使用者確認刪除
    if (result.isConfirmed) {
      // 發送刪除請求
      const response = await axios.delete(`${api}/categories/${id}`);
      const successMessage = response.data.message || "類別已成功刪除";

      // 顯示成功訊息
      toast.value.showSuccessToast(successMessage);

      // 彈出成功提示視窗
      await Swal.fire({
        title: "成功!",
        text: "刪除主類別成功",
        icon: "success"
      });

      // 重新載入資料
      await getCategoryData();
    }
  } catch (error) {
    console.error("刪除類別失敗:", error);

    // 顯示錯誤提示
    toast.value.showErrorToast("刪除類別失敗，請稍後再試");
  }
}


// 開啟新增或編輯子類別彈窗
const openEditSubCategoryModal = (subcategory) => {
  selectedSubCategory.value = { ...subcategory };
  const modal = new bootstrap.Modal(subCategoryModalRef.value);
  modal.show();
};
//關閉主類別彈窗
const closeSubCategoryModal = () => {
  const modalElement  = document.getElementById('subCategoryModal');
  if (modalElement) {
    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modal.hide(); // 正確關閉 Modal
  }
}
// 取得子類別資料
const getSubCategoryData = async (categoryId) => {
  try {
    const { data } = await axios.get(`${api}/categories/${categoryId}/subcategories`);
    subCategoriesData.value = Object.values(data.data);
  } catch (error) {
    console.error('取得子類別資料失敗:', error);
  }
}

// 開啟子類別
const openSubcategory = (category) => {
  try {
    subCategoriesData.value = Object.values(category.subcategories);
    categoryId.value = category.id;
  } catch (error) {
    console.error('開啟子類別失敗:', error);
  }
}

// 儲存子類別
const saveSubCategory = async () => {
  try {
    const id = categoryId.value;
    if (selectedSubCategory.value.categoryId) {
      // 有 ID 則更新類別
      const response = await axios.put(`${api}/categories/${id}/subcategories`, selectedSubCategory.value);
      const successMessage = response.data.message || '子類別已成功更新';
      toast.value.showSuccessToast(successMessage);
    } else {
      // 無 ID 則新增類別
      const response = await axios.post(`${api}/categories/${id}/subcategories`, selectedSubCategory.value);
      const successMessage = response.data.message || '子類別已成功儲存';
      toast.value.showSuccessToast(successMessage);
    }
    selectedSubCategory.value = {};
    await getCategoryData(); // 重新載入資料
    await getSubCategoryData(id);
    closeSubCategoryModal();
  } catch (error) {
    console.error('儲存類別失敗:', error);
  }
}

// 刪除子類別
const deleteSubCategory = async (subcategoryId) => {
  try {
    // 顯示確認視窗
    const result = await Swal.fire({
      title: "刪除主類",
      text: "確定要刪除子類別嗎",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "確定",
      cancelButtonText: "取消"
    });

    // 如果使用者確認刪除
    if (result.isConfirmed) {
      // 發送刪除請求
      const response = await axios.delete(`${api}/categories/${categoryId.value}/subcategories/${subcategoryId}`);
      const successMessage = response.data.message || '子類別已成功刪除';
      toast.value.showSuccessToast(successMessage);

      await Swal.fire({
        title: "成功!",
        text: "刪除子類別成功",
        icon: "success"
      });

      // 重新載入資料
      await getSubCategoryData(categoryId.value);
      // 如果子類別為空，提示使用者
      if (subCategoriesData.value.length === 0) {
        toast.value.showInfoToast('目前沒有子類別資料');
      }
    }
  } catch (error) {
    console.error('刪除子類別失敗:', error);
  }
}

onMounted(async () => {
  try {
    await getCategoryData();
  } catch (error) {
    console.error('API 請求失敗:', error);
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
            <h2>類別</h2>
            <nav>
              <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item">
                  <router-link to="/admin/dashboard">首頁</router-link>
                </li>
                <li class="breadcrumb-item active">類別</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- 主類別卡片 -->
      <div class="col-6">
        <div class="card">
          <div class="p-4">
            <div class="justify-content-between d-flex">
              <select class="form-select w-auto">
                <option value="">狀態</option>
                <option value="published">已上架</option>
                <option value="unpublished">未上架</option>
              </select>
              <button @click="openEditCategoryModal({})" type="button" class="btn btn-primary">新增分類</button>
            </div>
          </div>
          <div class="card-body p-0">
            <table class="table table-borderless align-middle table-hover">
              <thead class="table-light">
                <tr>
                  <th colspan="1">
                    <input class="form-check-input" type="checkbox" />
                  </th>
                  <th colspan="1">名稱</th>
                  <th colspan="1">狀態</th>
                  <th colspan="1"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="category in categoriesData" :key="category.id">
                  <td colspan="1">
                    <input class="form-check-input" type="checkbox" />
                  </td>
                  <td>{{ category.name }}</td>
                  <td><span class="badge" :class="[ category.is_enabled ? 'bg-success' : 'bg-secondary']">{{ category.is_enabled ? '已上架' : '未上架' }}</span></td>
                  <td colspan="1" class="text-end">
                    <button @click="openEditCategoryModal(category)" class="btn text-primary">編輯</button>
                    <button @click="deleteCategory(category.id)" class="btn text-danger">刪除</button>
                    <button @click="openSubcategory(category)" class="btn text-secondary">子選單</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="border-top d-md-flex justify-content-between align-items-center p-3">
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
                    <a class="page-link rounded-1" role="button" tabindex="0" href="#"
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
      <!-- 子類別卡片 -->
      <div class="col-6">
        <div class="card">
          <div class="p-4">
            <div class="justify-content-between d-flex">
              <select class="form-select w-auto">
                <option value="">狀態</option>
                <option value="published">已上架</option>
                <option value="unpublished">未上架</option>
              </select>
              <button @click="openEditSubCategoryModal({})" type="button" class="btn btn-primary" :disabled="!categoryId">新增子選單</button>
            </div>
          </div>
          <div class="card-body p-0">
            <div v-if="subCategoriesData.length === 0" class="text-center p-3">
              <p class="text-muted">尚無子類別資料</p>
            </div>
            <div v-else class="table-responsive">
              <table class="table table-borderless align-middle table-hover">
                <thead class="table-light">
                  <tr>
                    <th colspan="1">
                      <input class="form-check-input" type="checkbox" />
                    </th>
                    <th colspan="1">名稱</th>
                    <th colspan="1">狀態</th>
                    <th colspan="1"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="subcategory in subCategoriesData" :key="subcategory.id">
                    <td colspan="1">
                      <input class="form-check-input" type="checkbox" />
                    </td>
                    <td>{{ subcategory.name }}</td>
                    <td><span class="badge" :class="[ subcategory.is_enabled ? 'bg-success' : 'bg-secondary']">{{ subcategory.is_enabled ? '已上架' : '未上架' }}</span></td>
                    <td colspan="1" class="text-end">
                      <button @click="openEditSubCategoryModal(subcategory)" type="button" class="btn text-primary">編輯</button>
                      <button @click="deleteSubCategory(subcategory.id)" type="button" class="btn text-danger">刪除</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分類視窗 -->
    <div class="modal fade" id="categoryModal" ref="categoryModalRef">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedCategory.id ? '編輯主類別' : '新增主類別' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="mb-4 col-12">
                <label class="form-label">類別名稱</label>
                <input v-model="selectedCategory.name" class="form-control" type="text" />
              </div>
              <div class="mb-4 col-12">
                <label class="form-label">狀態</label>
                <select class="form-select" v-model="selectedCategory.is_enabled">
                  <option :value="1">上架</option>
                  <option :value="0">下架</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="saveCategory(selectedCategory.id)" type="button" class="btn btn-primary">儲存</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 子選單視窗 -->
    <div class="modal fade" id="subCategoryModal" ref="subCategoryModalRef">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedSubCategory.categoryId ? '編輯子類別' : '新增子類別' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="mb-4 col-12">
                <label class="form-label">名稱</label>
                <input v-model="selectedSubCategory.name" class="form-control" type="text" />
              </div>
              <div class="mb-4 col-12">
                <label class="form-label">狀態</label>
                <select class="form-select" v-model="selectedSubCategory.is_enabled">
                  <option :value="1">上架</option>
                  <option :value="0">下架</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="saveSubCategory()" type="button" class="btn btn-primary">儲存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
