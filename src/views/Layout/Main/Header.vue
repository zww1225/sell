<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in breadList" :key="item">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="right">
      <span>欢迎你</span>
      <span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{username}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personal">个人中心</el-dropdown-item>
            <el-dropdown-item command="/">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
      <span>
        <!-- <el-avatar src="../../../assets/imgs/fen.jpg"></el-avatar> -->
        <img class="avatar" :src="imgUrl" />
      </span>
    </div>
  </div>
</template>

<script>
import { checktoken, getAccount } from "@/api/apis";
export default {
  data() {
    return {
      username: "",
      imgUrl: "",
      breadList: [],
    };
  },
  methods: {
    fetData() {
      getAccount(localStorage.useId).then((res) => {
        // console.log(res);
        this.imgUrl = res.data.accountInfo.imgUrl;
      });
    },
    handleCommand(cmd) {
      if (cmd === "personal") {
        this.$router.push("/personal");
      } else {
        localStorage.clear();

        this.$router.push("/");
        this.$message({
          showClose: true,
          message: "欢迎你下次再来",
          type: "success",
        });
      }
    },
  },
  created() {
    this.fetData();
    this.$bus.$on("changeImg", () => {
      this.fetData();
    });

    // console.log(localStorage.img);
    // 验证token
    checktoken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        this.username = localStorage.acc;
      }
    });
    // 面包屑刷新初始化显示
    this.breadList = this.$route.meta.breadList;
  },
  watch: {
    $route(to) {
      // console.log(to);
      this.breadList = to.meta.breadList;
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  background-color: #fff;

  .right {
    display: flex;
    align-items: center;
    span {
      margin-right: 10px;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
}
</style>