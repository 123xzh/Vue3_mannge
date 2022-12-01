<template>
  <div id="scatter"></div>
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
      var myChart = echarts.init(document.getElementById("scatter"));
      var option = {
        title: {
          text: "散点图",
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
            type: "scatter",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener('resize', function () {
    myChart.resize();
      myChart.setOption(option);
    // console.log("asaddss");
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



 @media screen and (max-width: 400px) {
              #scatter {
                width: 350px;
                height: 400px;
                // background-color: rgb(207, 201, 95);
            }
        }
 @media screen and (max-width: 967px) {
              #scatter {
                width: 550px;
                height: 500px;
                // background-color: rgb(0, 94, 255);

            }
        }
 @media screen and (min-width: 1080px) {
              #scatter {
                width: 650px;
                height: 500px;
                // background-color: rgb(225, 0, 255);

            }
        }
       
        

</style>