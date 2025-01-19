<script setup>
import Chart from 'chart.js/auto'
import { onMounted } from 'vue'
const dataObj = {
  // labels 為橫軸上的分類，為一個陣列
  labels: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  // datasets資料集為一個陣列，裡面的資料類型為一個一個物件
  datasets: [
    // 物件的屬性有 label 與 data
    {
      // label 為資料分類的名稱
      label: '2024',
      //  data 為資料內容，是一個陣列，相同 index 的數值會放在同一個橫軸的分類區間
      data: [10, 20, 70, 50, 40, 30, 60, 10, 30, 70, 90, 50],
    },
    {
      label: '2025',
      data: [20, 80, 40, 70, 50, 20, 100, 60, 20, 80, 90, 100],
    },
  ],
}
onMounted(() => {
  const ctx = document.getElementById('heroChart')
  let chart = new Chart(ctx, {
    // type 可以是 bar，也可以是 line
    type: 'line',
    data: dataObj,
    options: {
      responsive: true,
      // 如果不設 maintainAspectRatio,寬度會固定
      maintainAspectRatio: false,
      plugins: {
        legend: {
          // datasets裡每一個物件會變成圖例，出現在給定的位置
          position: 'top',
        },
      },
    },
  })
})
</script>

<template>
  <div class="container-fluid">
    <div class="row row-cols-3 mb-4">
      <div class="col">
        <div class="card h-100">
          <div class="card-body p-4">
            <div class="d-flex align-items-center justify-content-between mb-4">
              <h4 class="mb-0 fs-5 fw-bold">營業額</h4>
              <div
                class="cardTitleIcon rounded-circle alert alert-danger mb-0 p-0 border-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-currency-dollar"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z"
                  />
                </svg>
              </div>
            </div>
            <h3 class="fw-bold">$99,546,135</h3>
            <span class="fw-500">每月收入</span>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <div class="card-body p-4">
            <div class="d-flex align-items-center justify-content-between mb-4">
              <h4 class="mb-0 fs-5 fw-bold">訂單</h4>
              <div
                class="cardTitleIcon rounded-circle alert alert-warning mb-0 p-0 border-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-bag"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"
                  />
                </svg>
              </div>
            </div>
            <h3 class="fw-bold">35,218</h3>
            <div>
              <span class="fw-bold">35</span>
              新訂單
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <div class="card-body p-4">
            <div class="d-flex align-items-center justify-content-between mb-4">
              <h4 class="mb-0 fs-5 fw-bold">會員</h4>
              <div
                class="cardTitleIcon rounded-circle alert alert-primary mb-0 p-0 border-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-people"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
                  />
                </svg>
              </div>
            </div>
            <h3 class="fw-bold">39,555</h3>
            <div>
              今日增加
              <span class="fw-bold">35</span>
              位
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col">
        <div class="card h-100">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between">
              <div>
                <h3 class="mb-1 fs-5">收入</h3>
                <small>(比去年增加 63%)</small>
              </div>
              <div>
                <select class="form-select pe-5">
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </div>
            <div class="card-content-image">
              <canvas id="heroChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="p-4">
            <h3 class="fw-bold fs-5 mb-0">最近訂單</h3>
          </div>
          <div class="card-body p-0">
            <table class="table table-borderless">
              <thead class="table-light">
                <tr>
                  <th scope="col">訂單編號</th>
                  <th scope="col">產品名稱</th>
                  <th scope="col">訂購日期</th>
                  <th scope="col">價格</th>
                  <th scope="col">狀態</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">135432</th>
                  <td>C-C 60W 雙色編織充電線(粉灰)</td>
                  <td>2024年11月6日</td>
                  <td>$4,250,336</td>
                  <td><span class="badge bg-success">已出貨</span></td>
                </tr>
                <tr>
                  <th scope="row">135432</th>
                  <td>C-C 60W 雙色編織充電線(粉灰)</td>
                  <td>2024年11月6日</td>
                  <td>$4,250,336</td>
                  <td><span class="badge bg-success">已出貨</span></td>
                </tr>
                <tr>
                  <th scope="row">135432</th>
                  <td>C-C 60W 雙色編織充電線(粉灰)</td>
                  <td>2024年11月5日</td>
                  <td>$4,250,336</td>
                  <td><span class="badge bg-danger">已取消</span></td>
                </tr>
                <tr>
                  <th scope="row">135432</th>
                  <td>C-C 60W 雙色編織充電線(粉灰)</td>
                  <td>2024年11月3日</td>
                  <td>$4,250,336</td>
                  <td><span class="badge bg-warning">出貨中</span></td>
                </tr>
                <tr>
                  <th scope="row">135432</th>
                  <td>C-C 60W 雙色編織充電線(粉灰)</td>
                  <td>2024年11月1日</td>
                  <td>$4,250,336</td>
                  <td><span class="badge bg-primary">處理中</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.cardTitleIcon {
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.card-content-image {
  height: 350px;
}
</style>
