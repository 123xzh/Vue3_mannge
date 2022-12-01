<template>
  <div id="pie" class="pie"></div>
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
      var myChart = echarts.init(document.getElementById("pie"));
      var option = {
        title: {
          text: "饼状图",
        },
        legend: {
          top: "bottom",
        },
        tooltip: {
          trigger: "item",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [50, 180],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: "rose 1" },
              { value: 38, name: "rose 2" },
              { value: 32, name: "rose 3" },
              { value: 30, name: "rose 4" },
              { value: 28, name: "rose 5" },
              { value: 26, name: "rose 6" },
              { value: 22, name: "rose 7" },
              { value: 18, name: "rose 8" },
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });
      window.addEventListener("resize", function () {
        myChart.resize();
      });

    return {
      ...toRefs(state),
      echarts,
    };
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 467px) {
  #pie {
    height: 300px;
    // width: 350px;
    // background-color: rgb(221, 255, 0);
  }
}
@media screen and (max-width: 1067px) {
  #pie {
    height: 650px;
    width: 550px;
    // background-color: rgb(30, 255, 0);
  }
}
//     移动端
@media screen and (min-device-width: 200px) and (max-device-width: 400px) {
  #pie {
    width: 250px;
    height: 300px;
    // background-color: aqua;
  }
}
@media screen and (min-device-width: 400px) and (max-device-width: 900px) {
  #pie {
    width: 550px;
    height: 500px;
    // background-color: rgb(255, 89, 0);
  }
}
/* 2. 小屏幕下  大于等于768  布局容器改为 750px */

// @media screen and (min-width: 768px) {
//     #scatter {
//         width: 450px;
//         height: 500px;
//     }
// }
/* 3. 中等屏幕下 大于等于 992px   布局容器修改为 970px */

// @media screen and (min-device-width: 992px) {
//      #pie  {
//         width: 970px;
//          height: 500px;
//     }
// }
</style>