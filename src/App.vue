<template>
  <router-view></router-view>
</template>

<script>
import { provide } from "vue";
import axios from "axios";
import * as echarts from "echarts";
// 设置基准路径
axios.defaults.baseURL = "/info";
export default {
  name: "App",
  setup() {
    provide("echarts", echarts);
    provide("axios", axios);
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
/* #app{
  height: 100vh;
} */
</style>
