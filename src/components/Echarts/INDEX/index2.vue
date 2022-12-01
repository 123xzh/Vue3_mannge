<template>
  <div class="container">
    <div class="row">
      <div id="k1" class="col-md-6 ">
        <LINE />
      </div>
      <div id="k2" class="col-md-6">
        <BAR />
      </div>
      <!-- <div id="kl" class="col-md-4" style="background: blue;">3</div> -->
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    LINE: defineAsyncComponent(() => import("@/components/Echarts/Line.vue")),
    BAR: defineAsyncComponent(() => import("@/components/Echarts/bar.vue")),
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>

</style>