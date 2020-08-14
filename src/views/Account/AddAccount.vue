<template>
  <div>
    <TitCard>
      <p slot="title">添加账号</p>
      <div slot="content">
        <el-form class="demo-form" ref="form" :model="form" label-width="80px">
          <!-- 账号 -->
          <el-form-item label="账号" style="width:350px">
            <el-input v-model="form.account"></el-input>
          </el-form-item>

          <!-- 密码 -->
          <el-form-item label="密码" style="width:350px">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <!-- 用户组 -->

          <el-form-item label="用户组">
            <el-select v-model="form.userGroup" style="width:270px">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button style="margin-left:80px" type="primary" @click="addUsers(form)">添加</el-button>
        <el-button plain @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </TitCard>
  </div>
</template>

<script>
import { addUser } from "@/api/apis";
import TitCard from "@/components/cards/titCar.vue";
export default {
  data() {
    return {
      form: {},
    };
  },
  components: {
    TitCard,
  },
  methods: {
    // 添加
    addUsers() {
      addUser(this.form.account, this.form.password, this.form.userGroup).then(
        (res) => {
          if (res.data.code == 0) {
            this.$message({
              message: "恭喜你，添加账号成功",
              type: "success",
            });
          }
        }
      );
    },
    // 重置
    // resetForm(form) {
    //   this.$refs[form].resetFields();
    // },
  },
};
</script>

<style lang="less" scoped>
</style>