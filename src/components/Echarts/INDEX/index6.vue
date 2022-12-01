<template>
    <div class="container" id="container">
    <div class="row">
      <div id="kl" class="col-md-6">
        <graph/>

      </div>
      <div id="kl" class="col-md-6">
        <tree/>

      </div>
      <!-- <div id="kl" class="col-md-4" style="background: blue;">3</div> -->
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent} from 'vue'
export default {
    components: {
		graph:defineAsyncComponent(()=>import('@/components/Echarts/graph.vue')),
		tree:defineAsyncComponent(()=>import('@/components/Echarts/tree.vue'))
	},
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>