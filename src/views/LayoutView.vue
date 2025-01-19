<script setup>
import { RouterView } from 'vue-router'
import TopMenuView from '@/components/TopMenuView.vue'
import LeftMenuView from '@/components/LeftMenuView.vue'
</script>

<template>
  <TopMenuView></TopMenuView>
  <div class="mainWrapper">
    <LeftMenuView></LeftMenuView>
    <div class="mainContentWrapper">
      <RouterView />
    </div>
  </div>
</template>
<style scoped>
.mainWrapper {
  display: flex;
  min-height: 100%;
}
.mainContentWrapper {
  flex-grow: 1;
  padding: 90px 16px;
  width: calc(100% - 280px);
}
</style>
