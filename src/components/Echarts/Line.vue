<template>
  <div id="line"></div>
</template>

<script>
import { reactive, toRefs, inject, onMounted } from "vue";

export default {
  setup() {
    let echarts = inject("echarts");
    const state = reactive({
      count: 0,
    });
      onMounted(() => {
        var myChart = echarts.init(document.getElementById("line"));
        var option = {
          title: {
            text: "折线图",
          },
          tooltip: {},
          legend: {
            data: ["销量"],
          },
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "line",
              data: [5, 20, 36, 10, 10, 20],
            },
          ],
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
              window.addEventListener("resize", function () {
        myChart.resize();
      });
      });

    return {
      ...toRefs(state),
      echarts,
    };
  },
};
</script>

<style lang="scss" scoped>
#line{
  height: 650px;
  width: 550px;
}

</style>