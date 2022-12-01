<template>
    <div class="container" id="container">
    <div class="row">
      <div id="kl" class="col-md-6">
        <radar/>

      </div>
      <div id="kl" class="col-md-6">
        <sunburst/>

      </div>
      <!-- <div id="kl" class="col-md-4" style="background: blue;">3</div> -->
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent} from 'vue'
export default {
    components: {
		radar:defineAsyncComponent(()=>import('@/components/Echarts/radar.vue')),
		sunburst:defineAsyncComponent(()=>import('@/components/Echarts/sunburst.vue'))
	},
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>