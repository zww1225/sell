<template>
  <div class="layout">
    <Nav></Nav>
    <Main></Main>
  </div>
</template>

<script>
import Nav from "./Nav";
import Main from "./Main/Main";
export default {
  components: {
    Nav,
    Main,
  },
};
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  width: 100%;
  display: flex;
}
</style>