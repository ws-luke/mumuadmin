<script setup>
  import { computed } from 'vue';
  import { useLoadingStore } from '@/stores/loading';
  
  const loadingStore = useLoadingStore();
  const show = computed(() => loadingStore.isLoading);
</script>
<template>
    <div v-if="show" class="loading-overlay">
        <div class="loader"></div>
    </div>
</template>
<style scoped>
  .loading-overlay {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 80px;
    height: 80px;
    background: rgba(0, 0, 0, 0.5);
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    border-radius: 6px;
  }
  .loader {
    width: 40px;
    padding: 4px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #fff;
    --_m: 
      conic-gradient(#0000 10%,#000),
      linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
            mask: var(--_m);
    -webkit-mask-composite: source-out;
            mask-composite: subtract;
    animation: l3 1s infinite linear;
  }
  @keyframes l3 {to{transform: rotate(1turn)}}
</style>
  