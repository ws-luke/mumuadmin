<template>
    <div class="container-fluid">
        <div class="row mb-4">
            <div class="col">
                <div class="d-flex align-items-center justify-content-between">
                <div>
                    <h2>輪播圖</h2>
                    <nav>
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                        <router-link to="/admin/dashboard">首頁</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">輪播圖</li>
                    </ol>
                    </nav>
                </div>
                <button type="button" class="btn btn-primary">
                    新增輪播圖
                </button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h5 class="mb-4">輪播圖 - 1</h5>
                        <div class="row">
                            <div class="mb-3 col-4">
                                <label class="form-label" for="pcImage">電腦版圖片</label>
                                <input class="form-control" id="pcImage" type="text">
                                <img src="" class="img-fluid">
                            </div>
                            <div class="mb-3 col-4">
                                <label class="form-label" for="mobileImage">手機版圖片</label>
                                <input class="form-control" id="mobileImage" type="text">
                                <img src="" class="img-fluid">
                            </div>
                            <div class="mb-3 col-4">
                                <label class="form-label" for="productUrl">商品網址</label>
                                <input class="form-control" id="productUrl" type="text">
                            </div>
                            <div class="mb-3 col-4">
                                <label class="form-label" for="imageAlt">圖片標籤</label>
                                <input class="form-control" id="imageAlt" type="text">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>