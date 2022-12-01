<template>
  <div class="tabs">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="route.name === tag.name ? 'dark' : 'plain'"
      size="large"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
// import { mapState, mapMutations } from "vuex";
import { useStore } from "vuex"; // 引入useStore 方法
import {
  defineComponent,
  // onMounted
  // computed,
  watch,
} from "vue";
import useMapState from "@/hooks/useMapState";
export default defineComponent({
  name: "comtag",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const myState = useMapState({
      tags: (state) => store._state.data.tab.tabsList,
    });
    const { tags } = myState;

    const close = (tag2) => {
      store.commit("tab/closeTag", tag2);
    };
    const changeMenu = (item) => {
      router.push({ name: item.name });
    };
    const handleClose = (tag, index) => {
      const length = tags._value.length - 1;
      close(tag);
      if (tag.name !== route.name) {
        return;
      }
      if (index === length) {
        router.push({
          name: tags._value
            .map((v) => v.name)
            .slice(-1)
            .toString(),
        });
        console.log("left");
      } else {
        // router.push({
        //   name: tags._value.map((v) => v.name).toString(),
        // });
        console.log("roght");
        console.log(tags._value.map((v) => v.name).toString());
      }
    };
    // watch([() => route.path], () => {
    
    // });
    return {
      store,
      router,
      route,
      changeMenu,
      handleClose,
      close,
      tags,
      myState,
    };
  },
});
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>