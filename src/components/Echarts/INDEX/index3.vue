<template>
  <div class="container" id="container">
    <div class="row">
      <div id="kl" class="col-md-6">
        <scatter />
      </div>
      <div id="kl" class="col-md-6">
        <pie />
      </div>
      <!-- <div id="kl" class="col-md-4" style="background: blue;">3</div> -->
    </div>
  </div>

</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    scatter: defineAsyncComponent(() =>
      import("@/components/Echarts/scatter.vue")
    ),
    pie: defineAsyncComponent(() => import("@/components/Echarts/pie.vue")),
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
// #container{
// display: inline;
// }
</style>