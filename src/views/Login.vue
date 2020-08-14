<template>
  <div class="login">
    <h1 class="title">味到家外卖管理系统</h1>
    <div class="formBox">
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <h1>系统登录</h1>
        <!-- 账号 -->
        <el-form-item label="账号" prop="account">
          <el-input
            prefix-icon="iconfont icon-zhanghao"
            type="text"
            v-model="ruleForm.account"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->

        <el-form-item label="密码" prop="password">
          <el-input
            prefix-icon="iconfont icon-mima"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            suffix-icon="iconfont icon-yanjing"
          ></el-input>
          <p class="err" style="color:red">{{errMsg}}</p>
        </el-form-item>
        <el-button class="loginBtn" @click="submitForm('ruleForm')">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/apis";
export default {
  data() {
    return {
      ruleForm: {},
      errMsg: "",
    };
  },
  methods: {
    submitForm() {
      login(this.ruleForm.account, this.ruleForm.password).then((res) => {
        // console.log(res.data.id);

        if (res.data.code == 0) {
          // 存入token
          localStorage.token = res.data.token;
          // 存入用户名
          localStorage.acc = this.ruleForm.account;
          // 存入角色
          localStorage.role = res.data.role;
          localStorage.useId = res.data.id;
          this.$message({
            message: "恭喜你，登录成功",
            type: "success",
          });
          this.$router.push("/home");
        } else {
          this.errMsg = res.data.msg;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;

  background: url("../assets/imgs/login.jpg") no-repeat;
  background-size: 100% 100%;
  .title {
    text-align: center;
  }
  .formBox {
    width: 400px;
    height: 400px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    margin: auto;
    text-align: center;
    .err {
      font-size: 12px;
    }
    .loginBtn {
      width: 320px;
      height: 40px;
      background-color: skyblue;
      margin-left: 74px;
      border: 0;
      outline: none;
      color: white;
    }
  }
}
</style>