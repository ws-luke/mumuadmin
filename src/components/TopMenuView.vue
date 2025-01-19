<template>
  <nav class="navbar navbar-light topMenu px-3">
    <div class="container-fluid">
      <div class="d-flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="32"
          height="32"
          fill="currentColor"
          class="bi bi-text-indent-right text-inherit d-block d-xl-none me-4"
        >
          <path
            d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m10.646 2.146a.5.5 0 0 1 .708.708L11.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708zM2 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
          ></path>
        </svg>
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>
      <div class="d-flex">
        <div class="dropdown">
          <a
            class="notifyBtn p-0 text-secondary"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-bell"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"
              />
            </svg>
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              2
            </span>
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuButton1"
          >
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
        <div class="dropdown ms-4">
          <a
            class=""
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://freshcart-next-js-template.netlify.app/images/avatar/avatar-1.jpg"
              class="avatar rounded-circle"
              alt=""
            />
          </a>
          <div
            class="dropdown-menu dropdown-menu-end py-0"
            aria-labelledby="userDropdown"
          >
            <div class="lh-1 p-3 border-bottom">
              <h5 class="mb-1 h6 fw-bold">LUKE</h5>
              <small>weisound.luke@gmail.com</small>
            </div>
            <ul class="p-2 list-unstyled mb-0">
              <li>
                <router-link class="dropdown-item px-1" to="/admin/dashboard"
                  >首頁</router-link
                >
              </li>
              <li><a class="dropdown-item px-1" href="#">設定</a></li>
            </ul>
            <div class="border-top p-3">
              <a class="dropdown-item text-primary p-0" href="#">登出</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.topMenu {
  background-color: hsla(0, 0%, 100%, 0.8);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  width: calc(100% - 280px);
  height: 72px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;
}
@media (max-width: 1200px) {
  .topMenu {
    width: 100%;
  }
}
.notifyBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
}
.avatar {
  width: 2.5rem;
  height: 2.5rem;
}
</style>
