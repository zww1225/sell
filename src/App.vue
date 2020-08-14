<template>
  <div class="apps">
    <!-- <layout></layout> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import layout from "./views/Layout/Layout";
export default {
  components: {
    // layout,
  },
};
</script>

<style lang="less" scoped>
html,
body,
.apps {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
}
</style>