<script setup>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
</script>

<template>
  <Datepicker v-model="date" :enableTimePicker="false" locale="zh"></Datepicker>
</template>
