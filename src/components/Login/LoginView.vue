<template>
  <div class="backg">
  <div class="location">
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <h2>同学录管理系统(h5)</h2>
      <el-form-item label="账号：" prop="username">
        <el-input v-model.trim="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          v-model.trim="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          class="loginbtn"
          type="primary"
          @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
        <el-button class="loginbtn" @click="resetForm(ruleFormRef)"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
  </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from "vue";
// import { LoginData } from "../type/login";
// import type { FormInstance } from "element-plus";
import { login } from "../request/api";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const data = reactive({
      ruleForm: {
        username: "",
        password: "",
      },
    });
    const rules = {
      username: [
        {
          required: true,
          message: "请输入账号",
          trigger: "blur",
        },
        {
          min: 3,
          max: 10,
          message: "账号的长度在3到10之间",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入你的密码",
          trigger: "blur",
        },
        {
          min: 3,
          max: 10,
          message: "密码的长度在3到10之间",
          trigger: "blur",
        },
      ],
    };
    // 登录
    const ruleFormRef = ref();
    const router = useRouter();
    const submitForm = (formEl) => {
      if (!formEl) return;
      //   对表单的内容进行验证
      //   valid布尔类型，为true表示验证成功，反之失败
      formEl.validate((valid) => {
        if (valid) {
          //   console.log("submit!");
          // login(data.ruleForm).then((res) => {
          //   // console.log(res);
          //   // 对token进行保存
          //   localStorage.setItem("token", res.data.token);
            // 跳转页面：首页
            router.push("/");
        //   });
        // } else {
          // console.log("error submit!");
          // return false;
        }
      });
      // console.log(formEl);
    };
    // 重置
    const resetForm = () => {
      (data.ruleForm.username = ""), (data.ruleForm.password = "");
    };
    return {
      ...toRefs(data),
      rules,
      resetForm,
      ruleFormRef,
      submitForm,
      router,
    };
  },
});
</script>

<style lang="scss" scoped>
  h2 {
    color: aliceblue;
  }
.backg {
  background-image: url("@/assets/lo.jpg");
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: contain;
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
  text-align: center;

}
.location {
  display: flex;
  justify-content: center;
  
}
.login-box{
    margin-top: 200px;
  width: 450px;
  height: 300px;
  // background: rgba(235, 235, 235, 0.7);
  border-radius: 20px;

}
@media (max-width:1020px) {
.login-box{
  width: 500px;
    height: 400px;
    text-align: center;
}
}
@media (max-width:520px) {
.login-box{
  width: 300px;
    height: 400px;
    text-align: center;
}
}
</style>