<script setup>
import ToastNotification from '@/components/ToastNotification.vue';
import { ref , onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
const api = import.meta.env.VITE_API_URL;

const router = useRouter();
// 從路由中取得參數
const route = useRoute();
const id = route.params.id || null;

// 判斷是否為編輯模式
const isEditMode = ref(!!id);

const productVariants = ref([]); // 定義變數 productVariants，初始值為空陣列
const categoryData = ref([]); // 存放類別資料
const subcategories = ref([]); // 存放子類別資料
const toast = ref(null); // 彈窗訊息

// 最主要資料處存區
const product = ref({
  title: '', // 產品名稱
  weight: '', // 重量
  material: '', // 材質
  warranty: '', // 保固
  retail_Price: '', // 終端售價
  origin_price: '', // 最低終端售價
  price: '', // 批發價
  unit: '', // 單位
  is_enabled: '', // 是否上架
  is_stock: '', // 庫存
  category: '', // 分類
  subcategory: '', // 子分類
  imageUrl: '',
  imagesUrl: [''],
  productVariants
})

// 產品類別
const fetchCategories = async () => {
  try {
    const { data } = await axios.get(`${api}/categories/all`);
    categoryData.value = Object.values(data.data);
  } catch (error) {
    console.error('取得產品類別失敗:', error);
  }
};

// 取得對應的子類別
const fetchSubcategories = async () => {
  if (!product.value.category) {
    subcategories.value = []; // 如果沒選類別，清空子類別
    return;
  }
  // 根據選擇的類別名稱找到對應的類別物件
  const selectedCategory = categoryData.value.find((item) => item.name === product.value.category);
  if (selectedCategory?.subcategories) {
    // 更新子類別資料
    subcategories.value = selectedCategory.subcategories;
  } else {
    subcategories.value = [];
  }
};
// 新增圖片數量
const addImagesItem = () => {
  product.value.imagesUrl.push('');
};
// 刪除圖片數量
const removeImagesItem = (index) => {
  product.value.imagesUrl.splice(index, 1);
};
// 新增顏色及數量及型號
const addRow = () => {
  productVariants.value.push({ model: '', color: '', quantity: null });
};
// 刪除指定顏色及數量及型號
const removeRow = (index) => {
  productVariants.value.splice(index, 1);
};
// 新增產品
const createProduct = async () => {
  try {
    const response = await axios.post(`${api}/products/product`, product.value);

    // 從後端的回應中提取訊息
    const successMessage = response.data.message || '產品新增成功！';

    // 使用 toast.success 顯示訊息
    toast.value.showSuccessToast(successMessage);

    product.value = {};
    productVariants.value = [];

    router.push('/admin/products');
  } catch (error) {
    const successMessage = error.message || '新增產品失敗';
    toast.value.showErrorToast(successMessage);
  }
}

// 編輯產品
const editProduct = async (id) => {
  try {
    const response = await axios.put(`${api}/products/product/${id}`, product.value);

    // 從後端的回應中提取訊息
    const successMessage = response.data.message || '產品編輯成功！';

    // 使用 toast.success 顯示訊息
    toast.value.showSuccessToast(successMessage);

    product.value = {};
    productVariants.value = [];

    router.push('/admin/products');

  } catch (error) {
    const successMessage = error.message || '編輯產品失敗';
    toast.value.showErrorToast(successMessage);
  }
}

onMounted ( async () => {
  await fetchCategories();
  if (isEditMode.value) {
    try {
      const { data } = await axios.get(`${api}/products/${id}`);
      product.value = data.data;
      productVariants.value = data.data.productVariants;
      // 如果有選擇的類別，更新子類別
      if (product.value.category) {
        fetchSubcategories();
      }
    } catch (error) {
      console.error('無法載入產品資料', error);
    }
  }
})

</script>

<template>
  <div class="container-fluid">
    <ToastNotification ref="toast"></ToastNotification>
    <div class="row mb-4">
      <div class="col d-flex justify-content-between align-items-center">
        <div>
          <h2>{{ isEditMode ? '編輯產品' : '新增產品' }}</h2>
          <nav>
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <router-link to="/admin/dashboard">首頁</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                <router-link to="/admin/products">產品</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                新增產品
              </li>
            </ol>
          </nav>
        </div>
        <router-link to="/admin/products" class="btn btn-primary"
          >回訂單列表</router-link
        >
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-lg-8">
        <div class="card mb-4">
          <div class="card-body">
            <h4 class="h5 mb-4">產品資訊</h4>
            <div class="row">
              <div class="mb-3 col-lg-6">
                <label class="form-label" for="productName">產品名稱</label
                ><input
                  class="form-control"
                  id="productName"
                  v-model="product.title"
                  type="text"
                />
              </div>
              <div class="mb-3 col-lg-6">
                <label class="form-label" for="productWeight">重量</label
                ><input class="form-control" type="number" id="productWeight" v-model="product.weight" />
              </div>
              <div class="mb-3 col-lg-6">
                <label class="form-label" for="productMaterial">材質</label
                ><input class="form-control" type="text" id="productMaterial" v-model="product.material" />
              </div>
              <div class="mb-3 col-lg-6">
                <label class="form-label" for="productWarranty">保固</label
                ><input class="form-control" type="text" id="productWarranty" v-model="product.warranty"  />
              </div>
              <div class="mb-3 col-lg-6">
                <label class="form-label" for="productUnit">單位</label
                ><input class="form-control" type="text" id="productUnit" v-model="product.unit"  />
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-4">
          <div class="card-body">
            <div class="col-12 d-flex align-items-center justify-content-between">
                <h4 class="mb-0 h5">顏色及數量</h4>
                <button @click="addRow" type="button" class="btn btn-primary">新增</button>
            </div>
            <div class="row mt-3" v-for="(variant, index) in productVariants" :key="index">
              <div class="col-3">
                <label class="form-label" :for="'form-model-' + index">型號</label>
                <input
                  type="text"
                  class="form-control"
                  :id="'form-model-' + index"
                  v-model="variant.model"
                  required
                />
              </div>
              <div class="col-3">
                <label class="form-label" :for="'form-color-' + index">顏色</label>
                <input
                  type="text"
                  class="form-control"
                  :id="'form-color-' + index"
                  v-model="variant.color"
                  required
                />
              </div>
              <div class="col-3">
                <label class="form-label" :for="'form-quantity-' + index">數量</label>
                <input
                  type="number"
                  class="form-control"
                  :id="'form-quantity-' + index"
                  v-model="variant.quantity"
                  required
                />
              </div>
              <div class="col-3 d-flex align-items-end">
                <button @click="removeRow(index)" type="button" class="btn btn-outline-danger w-100"> 刪除 </button>
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-4">
          <div class="card-body">
            <h4 class="h5 mb-4">產品圖片</h4>
            <div class="row">
              <div class="col-lg-3">
                <label class="form-label">產品主圖片</label>
                <input type="text" class="form-control" v-model="product.imageUrl">
                <img class="productImg img-fluid mb-3" :src="product.imageUrl" alt="" width="250"/>
              </div>
            </div>
            <div class="row">
              <div class="d-flex align-items-center mb-3 justify-content-between">
                <p class="mb-0 fs-5">產品其他圖片</p>
                <button class="btn btn-primary" @click="addImagesItem">新增</button>
              </div>
              <div v-for="(url, index) in product.imagesUrl" :key="index" class="col-lg-4">
                <label class="form-label" :for="'form-image-' + index">圖片{{ index + 1}}</label>
                <div class="d-flex justify-content-between">
                  <input type="text" class="form-control w-75" v-model="product.imagesUrl[index]" :id="'form-image-' + index">
                  <button class="btn btn-outline-danger" @click="removeImagesItem(index)">刪除</button>
                </div>
                <img class="productImg img-fluid my-3 w-100" :src="product.imagesUrl[index]" alt=""/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card mb-4">
          <div class="card-body">
            <h4 class="mb-4 h5">產品類別</h4>
            <div class="mb-3 col">
              <label class="form-label" for="productCategory">產品類別</label>
              <select class="form-select" id="productCategory" v-model="product.category" @change="fetchSubcategories">
                <option value="" disabled>請選擇產品類別</option>
                <option v-for="item in categoryData" :key="item.id" :value="item.name">{{ item.name }}</option>
              </select>
            </div>
            <div class="mb-3 col">
              <label class="form-label" for="productSubcategory">子類別</label>
              <select class="form-select" id="productSubcategory" v-model="product.subcategory" :disabled="subcategories.length === 0">
                <option value="" disabled>請選擇子類別</option>
                <option v-for="item in subcategories" :key="item.id" :value="item.name">{{ item.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="card mb-4">
          <div class="card-body">
            <div class="form-check form-switch mb-3">
              <input
                id="flexSwitchStock"
                class="form-check-input"
                type="checkbox"
                v-model="product.is_stock"
                :checked="product.is_stock"
              /><label for="flexSwitchStock" class="form-check-label"
                >有庫存</label
              >
            </div>
            <div class="mb-3">
              <label class="form-label">狀態</label><br />
              <div class="form-check form-check-inline">
                <input
                  id="inlineRadio1"
                  class="form-check-input"
                  type="radio"
                  v-model="product.is_enabled"
                  :value="1"
                  name="inlineRadioOptions"
                /><label title="" for="inlineRadio1" class="form-check-label"
                  >上架</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  id="inlineRadio2"
                  class="form-check-input"
                  type="radio"
                  v-model="product.is_enabled"
                  :value="0"
                  name="inlineRadioOptions"
                /><label title="" for="inlineRadio2" class="form-check-label"
                  >下架</label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-4">
          <div class="card-body">
            <h4 class="mb-4 h5">產品價格</h4>
            <div class="mb-3">
              <label class="form-label" for="productRetail_price">終端售價</label>
              <input class="form-control" id="productRetail_price" type="number" v-model="product.retail_Price" />
            </div>
            <div class="mb-3">
              <label class="form-label" for="productOrigin_price">最低終端售價</label>
              <input class="form-control" id="productOrigin_price" type="number" v-model="product.origin_price" />
            </div>
            <div class="mb-3">
              <label class="form-label" for="productPrice">批發價</label>
              <input class="form-control" id="productPrice" type="number" v-model="product.price" />
            </div>
          </div>
        </div>
        <button v-if="isEditMode" type="button" class="btn btn-success w-100" @click="editProduct(id)">編輯產品</button>
        <button v-else type="button" class="btn btn-success w-100" @click="createProduct">新增產品</button>
      </div>
    </div>
  </div>
</template>
