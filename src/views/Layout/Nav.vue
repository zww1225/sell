<template>
  <div class="nav">
    <el-menu
      unique-opened
      :default-active="curactive"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <h1>
        <svg
          t="1596622928179"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="13365"
          width="48"
          height="48"
        >
          <path
            d="M801.383821 957.220762c0 32.275625-21.59325 58.541699-51.640999 64.996824a67.407499 67.407499 0 0 1-15.138125 1.7823c-37.622524 0-66.790549-29.1566-66.790549-66.779124 0-6.683625 20.485025-884.626313 22.267325-912.686113a44.420399 44.420399 0 0 1 86.372998-14.692549 40.924349 40.924349 0 0 1 2.662025 14.692549c2.456375 27.157225 22.267325 906.002487 22.267325 912.686113z m0 0M1023.942818 957.220762c0 32.275625-21.59325 58.541699-51.640999 64.996824a67.407499 67.407499 0 0 1-15.138125 1.7823c-37.622524 0-66.790549-29.1566-66.790549-66.779124 0-6.683625 20.485025-884.626313 22.267324-912.686113a44.420399 44.420399 0 0 1 86.372999-14.692549 40.924349 40.924349 0 0 1 2.662025 14.692549c2.502075 27.180075 22.267325 906.002487 22.267325 912.686113z m0 0M445.220876 320.585496c0-147.531023-97.386699-317.763521-222.604697-320.551221C94.610481-2.742 0.011482 173.054473 0.011482 320.585496c0 128.199923 86.155924 192.853997 179.943748 209.420247-18.382825 173.762823-47.722224 399.726469-47.722225 403.622394a90.440299 90.440299 0 0 0 90.383174 90.371749 88.200999 88.200999 0 0 0 32.7212-6.23805 90.257499 90.257499 0 0 0 57.650549-84.133699c0-3.895925-28.9281-230.339422-47.105275-404.102244 98.460649-17.377425 179.372498-79.974999 179.372498-208.940397z m0 0"
            fill="#81d068"
            p-id="13366"
          />
        </svg>
      </h1>
      <!-- 没儿子 -->
      <div v-for="item in newList" :key="item.name">
        <!-- 后台首页 -->
        <el-menu-item default-active v-if="!item.children" :index="item.url">
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </div>

      <!-- 有儿子 -->

      <div v-for="item in newList" :key="item.name">
        <el-submenu v-if="item.children" :index="item.url">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="child in item.children"
              :key="child.name"
              :index="child.url"
            >{{child.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          url: "/home",
          icon: "el-icon-menu",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/order",
          icon: "el-icon-document",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        {
          url: "/goods",
          icon: "el-icon-goods",
          name: "商品管理",
          children: [
            { url: "/goods-list", name: "商品列表" },
            { url: "/add-goods", name: "商品添加" },
            { url: "/cate-goods", name: "商品分类" },
          ],
          roles: ["super", "normal"],
        },
        {
          url: "/shop",
          icon: "el-icon-s-home",
          name: "店铺管理",
          roles: ["super"],
        },
        {
          url: "/account",
          icon: "el-icon-s-custom",
          name: "账号管理",
          children: [
            { url: "/account-list", name: "账号列表" },
            { url: "/add-account", name: "添加账号" },
            { url: "/edit-pass", name: "修改密码" },
          ],
          roles: ["super"],
        },
        {
          url: "/total",
          icon: "el-icon-pie-chart",
          name: "销售统计",
          children: [
            { url: "/shop-total", name: "商品统计" },
            { url: "/order-total", name: "订单统计" },
          ],
          roles: ["super"],
        },
      ],
      curactive: "",
    };
  },
  created() {
    // console.log(this.$route);
    this.curactive = this.$route.path;
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
  computed: {
    // 根据登录进来的role，计算菜单
    newList() {
      return this.list.filter((item) => item.roles.includes(localStorage.role));
    },
  },
};
</script>

<style lang="less" scoped>
.nav {
  flex: 0 0 200px;
  .el-menu {
    height: 100%;
    border: 0px;
    h1 {
      width: 50px;
      height: 50px;
      margin: 0 auto;
      margin-top: 10px;
    }
  }

  // width: 200px;
  height: 100%;
  background-color: #545c64;
}
</style>