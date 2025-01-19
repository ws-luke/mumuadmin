import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //後台
    {
      path: '/',
      name: 'admin',
      component: () => import('@/views/LayoutView.vue'),
      children: [
        {
          path: '/admin/dashboard', // 儀錶版
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: '/admin/categories', // 產品類別
          name: 'categories',
          component: () =>
            import('@/views/categories/CategoriesView.vue'),
        },
        {
          path: '/admin/products', // 產品列表
          name: 'products',
          component: () => import('@/views/products/ProductsView.vue'),
        },
        {
          path: '/admin/product/:id?', // 新增產品 + 編輯產品
          name: 'product-form',
          component: () => import('@/views/products/ProductView.vue'),
          props: true, // 自動將路由參數傳給組件
        },
        {
          path: '/admin/upload', // 上傳檔案
          name: 'upload',
          component: () => import('@/views/uploadView.vue'),
        },
        {
          path: '/admin/orders', // 訂單列表
          name: 'orders',
          component: () => import('@/views/orders/OrdersView.vue'),
        },
        {
          path: '/admin/order', // 訂單
          name: 'order',
          component: () => import('@/views/orders/OrderView.vue'),
        },
        {
          path: '/admin/customers', // 會員
          name: 'customers',
          component: () => import('@/views/customers/CustomersView.vue'),
        },
        {
          path: '/admin/customer', // 會員
          name: 'customer',
          component: () => import('@/views/customers/CustomerView.vue'),
        },
        {
          path: '/admin/dashboard', // 管理者
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
      ],
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/signup', // 註冊
      name: 'adminSignup',
      component: () => import('@/views/SignUpView.vue'),
    },
    {
      path: '/admin/signin', // 登入
      name: 'adminSignin',
      component: () => import('@/views/SignInView.vue'),
    },
  ],
})
export default router
