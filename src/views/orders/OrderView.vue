<template>
  <div class="container-fluid">
    <div class="row mb-4">
      <div class="col">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <h2>訂單詳情</h2>
            <nav>
              <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item">
                  <router-link to="/admin/dashboard">首頁</router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link to="/admin/orders">訂單</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  訂單詳情
                </li>
              </ol>
            </nav>
          </div>
          <router-link to="/admin/orders" class="btn btn-primary">
            返回訂單耊表
          </router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col mb-4">
        <div class="card">
          <div class="p-4">
            <div class="justify-content-between row mb-5">
              <div
                class="mb-2 mb-lg-0 col-lg-4 col-md-6 col-12 d-flex align-items-center"
              >
                <h2 class="me-3 mb-0">訂單編號:354354</h2>
                <span class="badge bg-warning">處理中</span>
              </div>
              <div class="col-lg-2 col-md-4 col-12">
                <select class="form-select">
                  <option value="">訂單狀態</option>
                  <option value="已完成">已完成</option>
                  <option value="處理中">處理中</option>
                  <option value="已取消">已取消</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-4 col-md-4 col-12 mb-3">
                <h5 class="mb-3">客戶詳情</h5>
                <p class="mb-1">賴小姐</p>
                <p class="mb-1">sherry@gmail.com</p>
                <p class="mb-1">0912-345-678</p>
              </div>
              <div class="col-lg-4 col-md-4 col-12 mb-3">
                <h5 class="mb-3">收件地址</h5>
                <p class="mb-1">台中市西區台灣大道二段二號99樓之99</p>
                <p class="mb-1">公司名稱：<span>鼎沐科技有限公司</span></p>
              </div>
              <div class="col-lg-4 col-md-4 col-12 mb-3">
                <h5 class="mb-3">訂單詳情</h5>
                <p class="mb-1">訂單編號：<span>6543543541</span></p>
                <p class="mb-1">訂單日期：<span>2024年11月8日</span></p>
                <p class="mb-1">訂單總額：<span>4,555,968</span></p>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <div class="table-responsive">
                <table
                  class="table align-middle table-centered table-hover text-nowrap"
                >
                  <thead class="table-light">
                    <tr>
                      <th colspan="1">產品</th>
                      <th colspan="1">價格</th>
                      <th colspan="1">數量</th>
                      <th colspan="1">總額</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img
                          class="productImg me-3"
                          src="https://i3.momoshop.com.tw/1700643770/goodsimg/0012/126/928/12126928_R.webp"
                          alt=""
                        />
                        <span>C-C 60W 雙色編織充電線(粉灰)</span>
                      </td>
                      <td>5,000</td>
                      <td>100</td>
                      <td>500,000</td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          class="productImg me-3"
                          src="https://i3.momoshop.com.tw/1700643770/goodsimg/0012/126/928/12126928_R.webp"
                          alt=""
                        />
                        <span>C-C 60W 雙色編織充電線(粉灰)</span>
                      </td>
                      <td>5,000</td>
                      <td>100</td>
                      <td>500,000</td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          class="productImg me-3"
                          src="https://i3.momoshop.com.tw/1700643770/goodsimg/0012/126/928/12126928_R.webp"
                          alt=""
                        />
                        <span>C-C 60W 雙色編織充電線(粉灰)</span>
                      </td>
                      <td>5,000</td>
                      <td>100</td>
                      <td>500,000</td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          class="productImg me-3"
                          src="https://i3.momoshop.com.tw/1700643770/goodsimg/0012/126/928/12126928_R.webp"
                          alt=""
                        />
                        <span>C-C 60W 雙色編織充電線(粉灰)</span>
                      </td>
                      <td>5,000</td>
                      <td>100</td>
                      <td>500,000</td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          class="productImg me-3"
                          src="https://i3.momoshop.com.tw/1700643770/goodsimg/0012/126/928/12126928_R.webp"
                          alt=""
                        />
                        <span>C-C 60W 雙色編織充電線(粉灰)</span>
                      </td>
                      <td>5,000</td>
                      <td>100</td>
                      <td>500,000</td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          class="productImg me-3"
                          src="https://i3.momoshop.com.tw/1700643770/goodsimg/0012/126/928/12126928_R.webp"
                          alt=""
                        />
                        <span>C-C 60W 雙色編織充電線(粉灰)</span>
                      </td>
                      <td>5,000</td>
                      <td>100</td>
                      <td>500,000</td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          class="productImg me-3"
                          src="https://i3.momoshop.com.tw/1700643770/goodsimg/0012/126/928/12126928_R.webp"
                          alt=""
                        />
                        <span>C-C 60W 雙色編織充電線(粉灰)</span>
                      </td>
                      <td>5,000</td>
                      <td>100</td>
                      <td>500,000</td>
                    </tr>
                    <tr>
                      <td class="border-bottom-0 pb-0"></td>
                      <td class="border-bottom-0 pb-0"></td>
                      <td colspan="1" class="fw-medium text-dark">小計：</td>
                      <td class="fw-medium text-dark">2,000,000</td>
                    </tr>
                    <tr>
                      <td class="border-bottom-0 pb-0"></td>
                      <td class="border-bottom-0 pb-0"></td>
                      <td colspan="1" class="fw-medium text-dark">稅金：</td>
                      <td class="fw-medium text-dark">100,000</td>
                    </tr>
                    <tr>
                      <td class="border-bottom-0 pb-0"></td>
                      <td class="border-bottom-0 pb-0"></td>
                      <td colspan="1" class="fw-medium text-dark">運費：</td>
                      <td class="fw-medium text-dark">1,000</td>
                    </tr>
                    <tr>
                      <td class="border-bottom-0 pb-0"></td>
                      <td class="border-bottom-0 pb-0"></td>
                      <td colspan="1" class="fw-medium text-dark">總金額：</td>
                      <td class="fw-medium text-dark">4,010,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="card-body mb-3">
            <div class="row">
              <div class="col-12 col-md-6 mb-4">
                <h6>付款資訊</h6>
                <p>貨到付款</p>
              </div>
              <div class="col-12 col-md-6">
                <h5>備註</h5>
                <textarea
                  rows="3"
                  placeholder="訂單備註"
                  class="mb-3 form-control"
                ></textarea>
                <button type="button" class="btn btn-primary">儲存備註</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
