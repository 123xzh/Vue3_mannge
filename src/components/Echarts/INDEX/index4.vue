<template>
  <!-- <el-row class="home" style="margin-top: -10px" :gutter="24"> -->
  <!-- <el-col :span="12" :xs="12" :sm="12" :md="12" :lg="12" :xl="12"> -->
  <!-- <div class="container" id="container">
        <div class="row"> -->
  <!-- <el-card shadow="hover" style="height: 520px"> -->
  <!-- </el-card> -->
  <!-- </div>
      </div> -->
  <!-- <el-card shadow="hover" style="height: 250px"> </el-card> -->
  <!-- </el-col> -->
  <!-- <el-col  :span="12"  :xs="12" :sm="12" :md="12" :lg="12" :xl="12"> -->
  <!-- <el-card shadow="hover" style="height: 520px"> -->
  <!-- </el-card> -->
  <!-- <el-card style="height: 200px"></el-card> -->
  <!-- </el-col> -->
  <!-- </el-row> -->
  <div class="container" id="container">
    <div class="row">
      <div id="kl" class="col-md-6">
        <Kline />
      </div>
      <div id="kl" class="col-md-6">
        <chinamap />
      </div>
      <!-- <div id="kl" class="col-md-4" style="background: blue;">3</div> -->
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    chinamap: defineAsyncComponent(() =>
      import("@/components/Echarts/chinamap.vue")
    ),
    Kline: defineAsyncComponent(() => import("@/components/Echarts/Kline.vue")),
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>