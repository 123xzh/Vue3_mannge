<template>
  <div id="graph"></div>
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
      var myChart = echarts.init(document.getElementById("graph"));
      var option = {
        title: {
          text: "关系图",
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "none",
            symbolSize: 50,
            roam: true,
            label: {
              show: true,
            },
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20,
            },
            data: [
              {
                name: "Node 1",
                x: 300,
                y: 300,
              },
              {
                name: "Node 2",
                x: 800,
                y: 300,
              },
              {
                name: "Node 3",
                x: 550,
                y: 100,
              },
              {
                name: "Node 4",
                x: 550,
                y: 500,
              },
            ],
            // links: [],
            links: [
              {
                source: 0,
                target: 1,
                symbolSize: [5, 20],
                label: {
                  show: true,
                },
                lineStyle: {
                  width: 5,
                  curveness: 0.2,
                },
              },
              {
                source: "Node 2",
                target: "Node 1",
                label: {
                  show: true,
                },
                lineStyle: {
                  curveness: 0.2,
                },
              },
              {
                source: "Node 1",
                target: "Node 3",
              },
              {
                source: "Node 2",
                target: "Node 3",
              },
              {
                source: "Node 2",
                target: "Node 4",
              },
              {
                source: "Node 1",
                target: "Node 4",
              },
            ],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0,
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });

    return {
      ...toRefs(state),
      echarts,
    };
  },
};
</script>

<style lang="scss" scoped>
#graph {
  height: 650px;
  width: 550px;
}
</style>