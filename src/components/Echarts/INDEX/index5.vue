<template>

    <div class="container" id="container">
    <div class="row">
      <div id="kl" class="col-md-6">
        <boxplot/>

      </div>
      <div id="kl" class="col-md-6">
        <heatmap/>

      </div>
      <!-- <div id="kl" class="col-md-4" style="background: blue;">3</div> -->
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent} from 'vue'
export default {
    components: {
		boxplot:defineAsyncComponent(()=>import('@/components/Echarts/boxplot.vue')),
		heatmap:defineAsyncComponent(()=>import('@/components/Echarts/heatmap.vue'))
	},
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>