<template>
  <div>
    <TitCard>
      <p slot="title" class="title">
        <span>管理员信息</span>
      </p>

      <div slot="content">
        <span>管理员ID:{{msg.id}}</span>
        <el-divider></el-divider>
        <span>账号:{{msg.account}}</span>
        <el-divider></el-divider>
        <span>用户组:{{msg.userGroup}}</span>
        <el-divider></el-divider>
        <span>创建时间:{{msg.ctime}}</span>
        <el-divider></el-divider>
        <span>管理员头像</span>
        <el-upload
          style="margin-left:100px"
          class="avatar-uploader"
          action="http://127.0.0.1:5000/users/avatar_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :data="datdimg"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </TitCard>
  </div>
</template>

<script>
import { getAccount } from "@/api/apis";
import { getChinatime } from "@/utils/utils.js";
import TitCard from "@/components/cards/titCar.vue";
export default {
  data() {
    return {
      msg: {},
      imgUrl: "",
      datdimg: {},
      // baseUrl: "http://127.0.0.1:5000/upload/imgs/acc_img/", //服务器图片地址
    };
  },

  created() {
    this.datdimg = { id: localStorage.useId };
    getAccount(localStorage.useId).then((res) => {
      console.log(res);
      this.msg = res.data.accountInfo;

      this.imgUrl = res.data.accountInfo.imgUrl;
      res.data.accountInfo.ctime = getChinatime(res.data.accountInfo.ctime);
    });
  },
  components: { TitCard },
  methods: {
    handleAvatarSuccess(res) {
      getAccount(localStorage.useId).then((res) => {
        console.log(res);
        this.msg = res.data.accountInfo;

        this.imgUrl = res.data.accountInfo.imgUrl;
        res.data.accountInfo.ctime = getChinatime(res.data.accountInfo.ctime);
      });
      this.$bus.$emit("changeImg");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>