<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4"
            ><img
              @click="changss"
              src="@/assets/logo.png"
              alt=""
              class="logo"
            />
          </el-col>
          <el-col :span="18"><h2>同学录管理系统</h2></el-col>
          <el-col
            :span="1"
            style="margin-top: 15px; margin-left: -30px"
            class="col-btn"
          >
            <el-popover
              :width="200"
              popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
            >
              <template #reference>
                <el-avatar
                  src="https://avatars.githubusercontent.com/u/72015883?v=4"
                />
              </template>
              <template #default>
                <el-avatar
                  :size="60"
                  src="https://avatars.githubusercontent.com/u/72015883?v=4"
                  style="margin-bottom: 8px"
                />
                <div
                  class="demo-rich-conent"
                  style="display: flex; gap: 16px; flex-direction: row"
                >
                  <div
                    style="
                      height: 60px;

                      margin-top: -60px;
                      float: right;
                      margin-left: 70px;
                    "
                  >
                    <p
                      class="demo-rich-content__name"
                      style="margin: 0; font-weight: 500; float: left"
                    >
                      用户名:admin
                    </p>
                    <br />
                    <p
                      class="demo-rich-content__name"
                      style="margin: 0; font-weight: 500; float: left"
                    >
                      账号:2342@qq.cn
                    </p>
                    <div
                      style="
                        width: 110px;
                        float: left;
                        height: 30px;
                        position: absolute;
                        left: 10px;
                        top: 80px;
                      "
                    >
                      <!-- <el-button type="primary" :icon="Edit" /> -->
                      <el-button type="primary" :icon="Search" @click="delToken"
                        >退出登录</el-button
                      >
                      <!-- <el-button type="primary"  :icon="Search">修改用户信息</el-button> -->
                    </div>
                  </div>
                </div>
                <!-- <p class="demo-rich-content__desc" style="margin: 0">
                  Element Plus, a Vue 3 based component library for developers,
                  designers and product managers
                </p> -->
              </template>
            </el-popover>
          </el-col>
        </el-row></el-header
      >
      <el-container>
        <el-aside width="auto">
          <el-menu
            :collapse="isCollapse"
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            text-color="#fff"
            router
            id="sidebarRight"
          >
            <!-- router开启路由模式，通过el-menu-item index来进行跳转 -->
            <!-- <el-menu-item
              :index="item.path"
              v-for="item in hasChilren"
              :key="item.path"
              v-show="item.meta.isShow"
            >
              <span>{{ item.meta.title }}</span>
            </el-menu-item> -->
            <template
              v-for="v in router.options.routes[0].children"
              :key="v.path"
            >
              <!-- 带下拉的导航 -->

              <el-sub-menu :index="v.path" v-if="v.children">
                <template #title>
                  <el-icon><component :is="v.meta.icon"></component></el-icon>
                  <span>{{ v.meta.title }}</span>
                </template>
                <el-menu-item-group
                  v-for="val in v.children"
                  @click="ClickMenu(val)"
                  :key="val.path"
                >
                  <el-menu-item class="chil" :index="val.path">{{
                    val.meta.title
                  }}</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>

              <!-- 不带下拉的导航 -->
              <el-menu-item @click="ClickMenu(v)" :index="v.path" v-else>
                <el-icon><component :is="v.meta.icon"></component></el-icon>
                <span>{{ v.meta.title }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="tag-sle">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item
                :to="{ path: item.path }"
                v-for="item in getrout"
                :key="item.path"
              >
                {{ item.meta.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div>
            <tagView />
          </div>
          <!-- 设置路由出口 -->
          <transition
            name="rv-fade"
            enter-active-class="animated animate__fadeIn"
            leave-active-class="animated animate__fadeOutLeftBig"
          >
            <router-view />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import tagView from "@/components/tag/tagView.vue";
import { useStore } from "vuex";
export default {
  components: {
    tagView,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const visible = ref(false);
    const store = useStore();
    const list = router.getRoutes().filter((v) => v.meta.isShow);
    // const list1 = router.getRoutes().filter((v) => v.children.length>=1);
    // const list1 = router.getRoutes().filter((v) => v.children.length>=1);

    // console.log(list);
    // console.log(router.getRoutes().path);
    // console.log("router:", router.currentRoute._rawValue.meta.title);

    // watch(
    //   [() => router.currentRoute._rawValue.meta.title],
    //   () => {
    //     if (router.currentRoute._rawValue.meta.title ==router.currentRoute._rawValue.meta.title) {
    //       routename
    //     }
    //   }
    // );
    onMounted(() => {
      console.log(router.options.routes[0].children);
    });

    const getrout = computed(() => {
      // 该函数的返回值就是计算属性的值
      return route.matched;
    });
    // if (location.href.indexOf("#reloaded") == -1) {
    // 	location.href = location.href + "#reloaded";
    // 	location.reload();
    // }

    const ClickMenu = (v) => {
      // console.log("v", v.meta);
      store.commit("tab/selectMenu", v);
      // store.commit("tab/selectMenu", v);
    };
    const delToken = () => {
      localStorage.removeItem("token");
      router.push("/login");
    };
    const data = reactive({
      isCollapse: true,
    });
    const changss = () => {
      console.log("assdasd");
      data.isCollapse = !data.isCollapse;
    };

    return {
      router,
      route,
      list,
      // list1,
      active: route.path,
      visible,
      getrout,
      Search,
      ClickMenu,
      store,
      delToken,
      changss,
      ...toRefs(data),
    };
  },
};
</script>

<style lang="scss" scoped>
.animated {
  --animate-duration: 1s;
}

.el-header {
  height: 80px;
  background-color: #666;
  .logo {
    height: 80px;
  }
  .sle-btn {
    // text-align: center;
    background-color: aqua;
    width: 80px;
    height: 80px;
    margin-left: 30px;
  }
  // .el-popper{
  //   width: 50px;
  // }
  // .chil{
  //   margin-left: 140px;
  // }

  .quit-login {
    text-align: center;
    height: 80px;
    line-height: 80px;
    color: #fff;
  }
  // .tag-sle {
  //   width: 300px;
  //   height: 80px;
  //   position: absolute;
  //   // line-height: 90px;
  //   margin-bottom: 20px;
  //   cursor: pointer;
  //   color: aqua;
  // }
  h2 {
    text-align: center;
    height: 40px;
    line-height: 80px;
    color: #fff;
    font-family: "楷体";
    font-size: 40px;
  }
  .col-btn {
    height: 80px;
    line-height: 80px;
  }
}
.el-aside {
  width:200px;
  .el-menu {
    // 计算：当前页面高度100vh - 顶部80px
    height: calc(100vh - 80px);
  }
}
.el-container {
  height: 100vh;
  overflow: hidden;
}
#sidebarRight {
  overflow: auto;
}
.el-menu-admin:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
#sidebarRight::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
img {
  cursor: pointer;
}
</style>