<template>
  <div>
    <TitCard>
      <p slot="title">修改密码</p>
      <div slot="content">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input
              type="password"
              style="width:300px"
              v-model="ruleForm.oldPwd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input
              style="width:300px"
              type="password"
              v-model="ruleForm.newPwd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="age">
            <el-input style="width:300px" v-model.number="ruleForm.age"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </TitCard>
  </div>
</template>

<script>
import { checkpass, editpass } from "@/api/apis";
import TitCard from "@/components/cards/titCar.vue";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else {
        // 验证旧密码是否正确
        checkpass(this.ruleForm.oldPwd, localStorage.useId).then((res) => {
          if (res.data.code == 0) {
          } else {
            callback(new Error("请输入正确的旧密码"));
          }
        });
      }
    };
    // 新密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      }
    };
    // 确认密码
    var checkAge = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("不能为空"));
      } else if (value != this.ruleForm.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPwd: "",
        newPwd: "",
        age: "",
      },
      rules: {
        oldPwd: [{ validator: validatePass, trigger: "blur" }],
        newPwd: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  components: {
    TitCard,
  },
  methods: {
    // 修改密码
    submitForm() {
      editpass(this.ruleForm.newPwd, localStorage.useId).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "密码修改成功",
            type: "success",
          });
          this.$router.push("/");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
</style>