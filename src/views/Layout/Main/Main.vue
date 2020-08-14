<template>
  <div class="main">
    <Header></Header>
    <!-- <Home></Home> -->
    <div class="cont">
      <router-view class="box"></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./Header";

export default {
  components: {
    Header,
  },
};
</script>

<style lang="less" scoped>
.main {
  display: flex;
  flex-direction: column;
  // width: 100%;
  height: 100%;
  flex: 1;
  .cont {
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: #ccc;
    flex: 1;
    overflow: scroll;
  }
}
</style>