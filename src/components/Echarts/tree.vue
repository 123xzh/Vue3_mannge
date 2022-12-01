<template>
  <div id="tree"></div>
</template>

<script>
import { reactive, toRefs, inject, onMounted } from "vue";

export default {
  setup() {
    let echarts = inject("echarts");
    const treedata = [{ //一定一定要注意这里有[]
        name: '本科发展方向',
        children: [
          {
            name: '考研',
          },
          {
            name: '就业',
            children: [
              {
                name: '相关就业详见菜单栏‘培养方向’'
              }
            ]
          },
          {
            name: '考公'
          },
          {
            name: '留学',
            children: [
              {
                name: '相关文件（申请流程、交换要求）'
              }
            ]
          },
          {
            name: '创业'
          }
        ]
      }];

    onMounted(() => {
      var myChart = echarts.init(document.getElementById("tree"));
      var option = {
        title: {
            text: '树状图'
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'tree',

                data: treedata,

                top: '1%',
                left: '7%',
                bottom: '1%',
                right: '20%',

                symbolSize: 7,

                label: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 13
                },

                leaves: {
                    label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                },

                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
            }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });

    return {
      ...toRefs(treedata),
      echarts,
    };
  },
};
</script>

<style lang="scss" scoped>
#tree {
  height: 650px;
  width: 550px;
}
</style>