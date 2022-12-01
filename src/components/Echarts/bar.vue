<template>
  <div id="bar"></div>
  
</template>

<script>
import { reactive, inject, onMounted ,onUnmounted} from "vue";

export default {
  setup() {
    let echarts = inject("echarts");
    // let axios = inject("axios");
    // let data = reactive([]);
    // let xdata = reactive([]);
    // let ydata = reactive([]);

    async function getState() {
      // data = await axios({ url: "/one/data" });
    }
    // function setData() {
      // xdata = data.data.chartData.chartData.map((v) => v.title);
      // ydata = data.data.chartData.chartData.map((v) => v.num);
      // let c = xdata.map((name,i)=>({name,value:ydata[i]}))
      // let b=c.slice(0,4)
      // let d=c.sort(function(a,b){
			// return a.value - b.value;
		// // });
    //   console.log(d);
    //   console.log(b);
    //   console.log(c);
    //   console.log(data);
    //   console.log(xdata);
    // }

    onMounted(() => {
      var myChart = echarts.init(document.getElementById("bar"));

      getState().then(() => {
        // setData();
        myChart.setOption({
          title: {
            // 是否显示标题组件
            show: true,
            text: "柱状图",
          },
          tooltip: {},
          legend: {
            data: ["销量"],
          },
          xAxis: {
              data:["收音机","袜子","牛奶","行李箱","手机"]
   
          },
          yAxis: {
            
          },
          series: [
            {
              name: "销量",
              type:'bar',
                       data: [9330.3333,3343,344,3434,3243],
            },
          ],
        });
      });
      onUnmounted(() => {
        if (myChart) {
          // console.log(myChart,"已经清空");
          myChart.clear();
          myChart.dispose();
          myChart = null;
        }
      });
    });
		
    

    return {
      // ...toRefs(state),
      echarts,
      // axios,
      getState,
      // data,
      // xdata,
      // ydata,
      // setData,
    };
  },
  // beforeUnmount() {
	// 		console.log('---beforeUnmount---')
  //     myChart.clear();
	// 	}
};
</script>

<style lang="scss" scoped>
#bar {
  height: 650px;
  width: 650px;
}
</style>