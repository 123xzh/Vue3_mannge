<template>
<div class="backg">
  <div class="location">
      <h1>欢迎进入同学管理系统</h1>
  </div>
</div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>

.location {
  margin-top: 100px;
  display: flex;
  justify-content: center;
}
h1{
  font-family: '楷体';
  font-size: 70px;
  font-weight: 900;
}
// @media (max-width:708px) {
//     h1 {
//         font-size: 20px;
//          /* display: block; */
//     }
// }
</style>