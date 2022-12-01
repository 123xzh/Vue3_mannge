<template>
  <div class="rolee">
    <el-form :inline="true" :model="selectData" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="selectData.nickName" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select
          v-model="selectData.role"
          class="m-2"
          placeholder="请选择"
          size="large"
        >
          <el-option label="全部" :value="0" />
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
          <!-- 显示的内容为roleName  决定显示的内容为roleId -->
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="list" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="nickName" label="姓名" width="180" />
      <el-table-column prop="role" label="角色">
        <template #default="scope">
          <el-button
            v-for="item in scope.row.role"
            :key="item.role"
            link
            size="small"
          >
            {{ item.roleName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="操作">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="changeUser(scope.row)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog v-model="isShow" title="编辑信息">
    <el-form :model="active">
      <el-form-item label="姓名" label-width="50px">
        <el-input v-model="active.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" label-width="50px">
        <!-- multiple多选 -->
        <el-select multiple v-model="active.role" placeholder="请选择角色">
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateUser">更改</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >取消</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { getUserList, getRoleList } from "../request/api";
import {reactive,onMounted,toRefs,watch} from "vue";
export default {
  setup() {
    const data = reactive({
      loading:true,
      selectData:{
      nickName: "",
      role: 0
      },
      list:[],
      roleList:{
      authority:[],
      roleId: 0,
      roleName: ""
      },
      isShow:false,
      active:{//选中的对象
        id: 0,
        nickName: "",
        role: [],
        userName: ""
    }
    });
   
    onMounted(() => {
      getUser();
      getRole();
    });
    const getUser = () => {
      getUserList().then((res) => {
        console.log(res);
        data.list = res.data;
        data.loading=false
      });
    };
    const getRole = () => {
      getRoleList().then((res) => {
        console.log(res);
        data.roleList = res.data;
      });
    };

     const onSubmit = () => {
      let arr= []; //定义数组，用来接受查询过后要展示的数据
      if (data.selectData.nickName || data.selectData.role) {
        //判断两个是否其中一个有值
        if (data.selectData.nickName) {
          arr = data.list.filter((value) => {
            //将过滤出来数组赋值给arr
            return value.nickName.indexOf(data.selectData.nickName) !== -1;
          });
        }
        if (data.selectData.role) {
          arr = (data.selectData.nickName ? arr : data.list).filter((value) => {
            //将过滤出来数组赋值给arr
            return value.role.find(
              (item) => item.role === data.selectData.role
            );
          });
        }
      } else {
        arr = data.list;
      }
      data.list = arr;
      console.log(data.roleList);
    };
    // 监听输入框的两个属性
    watch([() => data.selectData.nickName, () => data.selectData.role], () => {
      if (data.selectData.nickName == "" || data.selectData.role == 0) {
        getUser();
      }
    });
    const changeUser = (row) =>{
        console.log(row);
        data.active={
            id:row.id,
            nickName:row.nickName,
            userName:row.userName,
            role:row.role.map((value)=>value.role || value.roleId )
        }
        data.isShow=true
        
    }
    const updateUser = () =>{
        // console.log(data.active);
        let obj=data.list.find((value)=>value.id==data.active.id)
        obj.nickName=data.active.nickName
        // data.active.role-->[1,2] 如果选中管理员和用户为 [1,2]
        // roleList-->roleId-->1,2
        obj.role=data.roleList.filter(value=>data.active.role.indexOf(value.roleId)!==-1)
        // console.log(obj);
        data.list.forEach((item,i)=>{
            if(item.id==obj.id){
                data.list[i]=obj
            }
        })
        data.isShow=false
    }

    return { getUser, getRole, 
    ...toRefs(data),
    onSubmit,
     changeUser,
     updateUser
    };
  },
};
</script>

<style lang="scss" scoped>
// .user{
//     width: 200px;
//     height: 200px;
//     background-color: black;
//     color: aliceblue;
// }
@media (max-width:708px) {
    .rolee {
        width: 300px;
        height: 400px;
         /* display: block; */
    }
}
</style>