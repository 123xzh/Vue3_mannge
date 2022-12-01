<template>
  <div ref="chart" id="map"></div>
</template>

<script>
import { ref, onMounted, inject } from "vue";

import chinaMap from "@/assets/china.json";

export default {
  setup() {
    let echarts = inject("echarts");
    const chart = ref();
    onMounted(() => {
      var myChart = echarts.init(chart.value);
      echarts.registerMap("china", chinaMap);
      var option = {
        geo: {
          show: true,
          map: "china",
          emphasis: {
            show: true,
            label: {
              show: false,
            },
          },
          roam: false,
          itemStyle: {
            areaColor: "#031525",
            borderWidth: 0,
            borderColor: "#00ffff",
            shadowColor: "#3C8CE7",
            shadowBlur: 15,
          },
          // top: 90,
          // bottom: 80,
        },
        tooltip: {
          show: true,
          triggerOn: "mousemove",
          formatter: function (params) {
            // console.log(params);
            var html =
              "<span style='background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%); background-clip:text;-webkit-background-clip:text; color: transparent;'>" +
              params.name +
              " </span><br/>";
            html +=
              "<span style='background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%); background-clip:text;-webkit-background-clip:text; color:transparent;'>平均薪资：" +
              params.value +
              "K</span><br/>";
            return html;
          },
          backgroundColor: "rgba(29, 38, 71)",
          // 额外附加的阴影
          extraCssText: "box-shadow:0 0 4px rgba(11, 19, 43,0.8)",
          textStyle: {
            // color: "background-image: linear-gradient( 135deg, #FFF720 10%, #3CD500 100%);",
            fontsize: 30,
          },
        },
        grid: {
          bottom: "60%",
          left: "50%",
          width: "80%",
        },
        title: {
          text: "地图",
        },
        visualMap: {
          //   设置连续类型
          type: "continuous",
          min: 0,
          max: 30,
          //   滑动效果
          calculable: false,
          realtime: true, //拖拽时，是否实时更新
          hoverLink: true,
          inRange: {
            color: ["#00f2fe", "#4facfe", "#0250c5", "#0018E8"],
          },
          textStyle: {
            color: "#fff",
          },
          bottom: "22%",
          left: "2%",
        },
        series: [
          {
            type: "map",
            map: "china",
            geoIndex: 1,
            aspectScale: 0.75, //长宽比
            silent: false, //鼠标移入区域变色 如果设置为true则无法高亮
            showLegendSymbol: false, // 存在legend时显示
            label: {
              // normal: {
              show: true, //省份名称
              // textStyle: {
              fontSize: 10,
              // fontWeight: "bold",
              color: "#fff",
              // },
              // },
            },
            ///////数据////////
            data: [
              { name: "四川", value: 13 },
              { name: "新疆", value: 13 },
              { name: "内蒙古", value: 18 },
              { name: "西藏", value: 8 },
              { name: "辽宁", value: 12 },
              { name: "陕西", value: 18 },
              { name: "安徽", value: 13 },
              { name: "贵州", value: 11 },
              { name: "河南", value: 10 },
              { name: "澳门", value: 9 },
              { name: "吉林", value: 18 },
              { name: "海南", value: 26 },
              { name: "甘肃", value: 12 },
              { name: "广西", value: 11 },
              { name: "河北", value: 15 },
              { name: "云南", value: 11 },
              { name: "北京", value: 28 },
              { name: "山东", value: 13 },
              { name: "湖南", value: 12 },
              { name: "江苏", value: 15 },
              { name: "山西", value: 14 },
              { name: "广东", value: 12 },
              { name: "黑龙江", value: 13 },
              { name: "湖北", value: 22 },
              { name: "福建", value: 14 },
              { name: "江西", value: 12 },
              { name: "台湾", value: 9 },
              { name: "宁夏", value: 12 },
              { name: "青海", value: 11 },
              { name: "浙江", value: 15 },
              { name: "上海", value: 25 },
              { name: "天津", value: 19 },
              { name: "香港", value: 9 },
              { name: "重庆", value: 16 },
              { name: "南海诸岛", value: 10 },
            ], ////////////////数据////////////////////
            roam: false,
            itemStyle: {
              borderColor: "#3B5077",
              borderWidth: 1,
            },
            emphasis: {
              itemStyle: {
                areaColor: "skyblue", // 鼠标选择区域颜色
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 1,
                shadowColor: "rgba(0, 255, 255, 0.8)",
                borderColor: "transparent",
                fontsize: 20,
              },
              label: {
                show: true,
                fontSize: "15",
                fontWeight: "bold",
                color: "red",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    });
    return {
      echarts,
      chart,
    };
  },
};
</script>
<style lang="css" scoped>
#map {
  /* background-color: rgb(1, 2, 1); */
  height: 650px;
  width: 550px;
  /* position: absolute; */
  /* background-color: aqua;  */
}
</style>
