<template>
  <!-- 新增修改按钮 -->
  <el-dialog
    v-model="isShow"
    :title="operateType === 'add' ? '新增用户' : '更新用户'"
    title="编辑信息"
    draggable
  >
    <editview
      :formLabel="opertateFormLabel"
      :form="operateForm"
      :inline="true"
      ref="form"
    ></editview>
    <div slot="footer" id="buttone" class="dialog-footer">
      <el-button @click="isShow=false">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </el-dialog>
  <!-- <editview :editda="editdata" isshow="false"/> -->
  <!-- <el-button type="primary" @click="onAddItem">新增</el-button> -->
  <!-- 用户搜索/新建 -->
  <div class="manage-header">
    <el-button type="primary" @click="addUser">新增</el-button>
    <editview
      :formLabel="formLabel"
      :inline="true"
      ref="form"
      :form="searchFrom"
    >
      <!-- :form="searchFrom" -->
    </editview>

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
  </div>

  <!-- 用户列表表格 -->
  <div>
    <el-table
      :data="listdata.slice((page - 1) * limit, page * limit)"
      style="width: 100%"
       v-loading="loading"
    >
      <el-table-column type="index" width="50" :index="hIndex" />
      <!-- <el-table-column prop="date" label="Date" width="150" /> -->
      <el-table-column prop="name" label="名称" width="120" />
      <el-table-column prop="birth" label="出生日期" width="120" />
      <el-table-column prop="age" label="年龄" width="120" />
      <el-table-column prop="addr" label="地址" width="300" />
      <el-table-column prop="sex" label="性别" width="120" />
      <!-- :formatter="userTypeList" -->
      <el-table-column label="选项" width="320">
        <template #default="scope">
          <el-button
            type="primary"
            size="default"
            @click.prevent="editRow(scope.$index, scope.row)"
          >
            修改
          </el-button>
          <el-button
            type="danger"
            size="default"
            @click.prevent="deleteRow(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-pagination
    :currentPage="page"
    :page-size="limit"
    :page-sizes="[5, 10]"
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="TableDatatoal"
    @size-change="handleSizeChange"
    @current-change="CurrentChange"
  />
</template>

<script>
import {
  reactive,
  ref,
  // computed,
  onMounted,
  toRefs,
  // getCurrentInstance,
  defineComponent,
  computed,
  watch,
  defineAsyncComponent,
} from "vue";
// import {getList,getUser} from "@/api/data.js"
// import dayjs from "dayjs";
import axios from "axios";
// import editview from './Edit/EditUser.vue'
// import { getUserData } from "@/api/data";
export default defineComponent({
  components: {
    editview: defineAsyncComponent(() => import("./Edit/EditUser.vue")),
  },
  setup() {
    const list = reactive({
      listdata: [],
      editdata: [],
      loading:true,
      operateType: "add",
      isShow: false,
      opertateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      limit: 5,
      page: 1,
      // formLabel: [
      //   {
      //     model: "keyword",
      //     label: "",
      //     type: "input",
      //   },
      // ],
      searchFrom: {
        keyword: "",
      },
      // rowdata,
      active: {
        //选中的对象
        // id: 0,
        name: "",
        addr: [],
        age: "",
        sex: "",
        birth: "",
      },
    });
    const addUser = () => {
      list.isShow = true;
      list.operateType = "add";
      list.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: [],
        sex: [],
      };
    };

    const editRow = (index, row) => {
      console.log(index, row);
      list.editdata = row;
      list.operateType = "edit";
      list.operateForm = {
        name: row.name,
        addr: row.addr,
        age: row.age,
        sex: row.sex,
        birth: row.birth,
        sexselect: list.active.sexselect,
      };
      console.log(list.active);
      list.isShow = true;
    };

    const now = new Date();
    const deleteRow = (index, row) => {
      console.log(index, row);
    };
    const formLabelWidth = "140px";
    onMounted(() => {
      getUserData();
    });
    const userTypeList = (row) => {
      return row.sex == 1 ? "男" : "女";
    };
    const getUserData = async () => {
      let res = await axios.get("/user/getUser");
      list.listdata = res.data.list.map((item) => {
        item.sex = item.sex === 0 ? "女" : "男";
        return item;
      });
      list.loading=false
    };
    // 分页
    const TableDatatoal = computed(() => {
      // 该函数的返回值就是计算属性的值
      return list.listdata.length;
    });
    let handleSizeChange = (val) => {
      list.limit = val;
    };
    let CurrentChange = (val) => {
      list.page = val;
      getUserData();
    };
    // 分页编号
    let hIndex = (index) => {
      // index索引从零开始，index +1即为当前数据序号
      list.page <= 0 ? (list.page = 1) : list.page;
      // 如果当前不是第一页数据
      if (list.page != 1) {
        // index + 1 + (( 当前页 - 1) * 每页展示条数)
        // 比如是第二页数据 1 + ((2 - 1)*5) = 6,第二页数据也就是从序号6开始
        return index + 1 + (list.page - 1) * list.limit;
      }
      // 否则直接返回索引+1作为序号
      return index + 1;
    };
    const search = ref("");
    let filterTableData = (val) => {
      // console.log(typeof search.value);
      let arr = [];
      if (search.value) {
        arr = list.listdata.filter((data) => {
          return data.name.indexOf(search.value.toString()) !== -1;
        });
      } else {
        arr = list.listdata;
      }
      console.log(arr);
      list.listdata.length = arr.length;
      list.listdata = arr;
      // getUserData();
    };
    watch([() => search.value], () => {
      if (search.value == "") {
        getUserData();
      }
    });
    const updateUser = (val) => {
      list.updata = val.map((item) => {
        item.sex = item.sex === 0 ? "女" : "男";
        return item;
      });
      console.log(list.updata);
    };

    const dateFormat = (row, column) => {
      var date = row[column.property];
      if (date === undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD");
    };
    const confirm =()=>{
      console.log(list.operateForm);
      if (list.operateType === "edit") {
        axios.post("/user/edit",list.operateForm).then((res) => {
          console.log(res);
          list.isShow = false;
          getUserData();
        });
      } else {
        axios.post("/user/add",list.operateForm).then((res) => {
          console.log(res);
          list.isShow = false;
          getUserData();
        })
      }
    }
    return {
      updateUser,
      search,
      dateFormat,
      //   filterTableData,
      editRow,
      confirm,
      deleteRow,
      handleSizeChange,
      now,
      CurrentChange,
      TableDatatoal,
      formLabelWidth,
      // form,
      getUserData,
      ...toRefs(list),
      userTypeList,
      hIndex,
      filterTableData,
      addUser,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.dialog-footer {
  margin-left: 500px;
  // float: right;
  // height: 100px;
  // margin-bottom: 100px;
}
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#buttone{
  width: 150px;
  height: 60px;
  // background-color: red;
  position: relative;
  left: -60%;
}
</style>