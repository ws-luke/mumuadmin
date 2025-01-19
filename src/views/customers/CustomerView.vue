<script setup>
import { ref } from 'vue'
import DateComponent from '@/components/DateComponent.vue'
const date = ref()
</script>
<template>
  <div class="container-fluid">
    <div class="row mb-4">
      <div class="col">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <h2>會員資料</h2>
            <nav>
              <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item">
                  <router-link to="/admin/dashboard">首頁</router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link to="/admin/customers">會員</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  會員資料
                </li>
              </ol>
            </nav>
          </div>
          <router-link to="/admin/customers" class="btn btn-primary">
            返回會員列表
          </router-link>
        </div>
      </div>
    </div>
    <from class="row">
      <div class="col-12 col-lg-6">
        <div class="card mb-4">
          <div class="card-body">
            <h4 class="h5 mb-4">會員資訊</h4>
            <div class="row">
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">姓名</label>
                <input class="form-control" type="text" />
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">性別</label>
                <select class="form-select">
                  <option>性別</option>
                  <option value="1">男性</option>
                  <option value="2">女性</option>
                </select>
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">生日</label>
                <DateComponent v-model="date"></DateComponent>
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">手機號碼</label>
                <input class="form-control" type="number" />
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">Email</label>
                <input class="form-control" type="email" />
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">Line</label>
                <input class="form-control" type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="card mb-4">
          <div class="card-body">
            <h4 class="h5 mb-4">公司資訊</h4>
            <div class="row">
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">公司名稱 / 賣場名稱</label>
                <input class="form-control" type="text" />
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">統編</label>
                <input class="form-control" type="number" />
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">地址</label>
                <input class="form-control" type="text" />
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">賣場通路</label>
                <input class="form-control" type="text" />
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">對接業務</label>
                <select class="form-select">
                  <option>對接業務</option>
                  <option value="Luke">Luke</option>
                  <option value="Billy">Billy</option>
                  <option value="Sherry">Sherry</option>
                  <option value="Eileen">Eileen</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="card mb-4">
          <div class="card-body">
            <h4 class="h5 mb-4">帳號資訊</h4>
            <div class="row">
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">帳號</label>
                <input class="form-control" type="text" />
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">密碼</label>
                <input class="form-control" type="text" />
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">會員等級</label>
                <select class="form-select">
                  <option>會員等級</option>
                  <option value="一般會員">一般會員</option>
                  <option value="銀牌會員">銀牌會員</option>
                  <option value="金牌會員">金牌會員</option>
                  <option value="鑽石會員">鑽石會員</option>
                  <option value="黑卡會員">黑卡會員</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary w-100">儲存</button>
      </div>
    </from>
  </div>
</template>
