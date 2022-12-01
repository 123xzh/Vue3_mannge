<template>
  <div class="container">
        <!-- arr.slice((当前页数-1)*每条页数,当前页数*当前条数)" 
              
    -->
        <!-- <template #header> -->
        <!-- <div
        > -->

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label-width="50px" label="详情">
        <el-input
          v-model="search"
          size="default"
          placeholder="请输入关键信息"
          @keypress.enter="filterTableData"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="filterTableData">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- </div> -->
    <!-- </template> -->
    <el-table
      :data="userlist.slice((page - 1) * limit, page * limit)"
      border
      style="width: auto"
      v-loading="loading"
    >
      <el-table-column label="产品ID" prop="id" />
      <el-table-column  label="产品名称" prop="title" />
      <el-table-column  label="描述信息" prop="introduce" />
      <!-- <el-table-column style="width: 100px" align="right">
        Loading
      </el-table-column> -->
    </el-table>
    <el-pagination
      :currentPage="page"
      :page-size="limit"
      :page-sizes="[5, 10]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="TableDatatoal"
      @size-change="handleSizeChange"
      @current-change="CurrentChange"
      class="q1"
    />
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, toRefs, watch } from "vue";
import { getGoodsList } from "../request/api";
import { Search } from "@element-plus/icons-vue";
//第一种获取target值的方式，通过vue中的响应式对象可使用toRaw()方法获取原始对象
// import { toRaw } from "@vue/reactivity";

export default {
  setup() {
    const search = ref("");
    const point = reactive({
      userlist: [],
      limit: 5,
      page: 1,
      loading: true,
    });

    onMounted(() => {
      getGoodsList();

      getGoods();
      // 检测断网
      window.addEventListener("offline", () => {
        console.log("已断网");
        this.network = false;
      });
      window.addEventListener("online", () => {
        console.log("网络已连接");
        this.network = true;
      });
    });

    const getGoods = async () => {
      await getGoodsList().then((res) => {
        point.userlist = res.data;
        point.loading = false;
      });
    };

    let handleSizeChange = (val) => {
      point.limit = val;
    };

    let CurrentChange = (val) => {
      point.page = val;
      // console.log(point.userlist.length);
      getGoodsList();
    };

    const TableDatatoal = computed(() => {
      // 该函数的返回值就是计算属性的值
      return point.userlist.length;
    });

    let filterTableData = (val) => {
      let arr = [];
      if (search.value) {
        arr = point.userlist.filter((data) => {
          return data.introduce.indexOf(search.value.toString()) !== -1;
        });
      } else {
        arr = point.userlist;
      }
      point.userlist.length = arr.length;
      point.userlist = arr;
      getGoodsList();
    };
    watch([() => search.value], () => {
      if (search.value == "") {
        getGoods();
      }
    });

    return {
      search,
      filterTableData,
      //   tableData,
      TableDatatoal,
      handleSizeChange,
      CurrentChange,
      getGoods,
      ...toRefs(point),
      Search,
    };
  },
};
</script>

<style lang="scss" scoped>
 @media screen and (max-width: 767px) {
            .container {
                width: 100%;
            }
        }
        /* 2. 小屏幕下  大于等于768  布局容器改为 750px */
        
        @media screen and (min-width: 768px) {
            .container {
                width: 750px;
            }
        }
        /* 3. 中等屏幕下 大于等于 992px   布局容器修改为 970px */
        
        @media screen and (min-width: 992px) {
            .container {
                width: 970px;
            }
        }
        /* 4. 大屏幕下 大于等于1200 布局容器修改为 1170 */
        
        @media screen and (min-width: 1200px) {
            .container {
                width: 1170px;
            }
        }
</style>