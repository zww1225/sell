<template>
  <div>
    <TitCard>
      <p slot="title" class="title">
        <span>店铺管理</span>
        <el-button :type="isedit?'primary':'success'" @click="editBtn">{{isedit?'保存':'编辑'}}</el-button>
      </p>

      <div slot="content">
        <el-form
          ref="form"
          :disabled="!isedit"
          :model="form"
          style="width:400px"
          label-width="80px"
        >
          <!-- 店铺名称 -->
          <el-form-item label="店铺名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <!-- 店铺公告 -->
          <el-form-item label="店铺公告">
            <el-input :rows="8" type="textarea" v-model="form.bulletin"></el-input>
          </el-form-item>

          <!-- 店铺头像 -->
          <el-form-item label="店铺头像">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/shop/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img :src="form.avatar==''?'':baseUrl+form.avatar" class="avatar" />
            </el-upload>
          </el-form-item>

          <!-- 店铺图片 -->

          <el-form-item label="店铺图片">
            <el-upload
              action="http://127.0.0.1:5000/shop/upload"
              list-type="picture-card"
              :file-list="form.pics"
              :on-preview="handlePictureCardPreview"
              :on-success="handleimgsSuccess"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
              <!-- <img width="100px" :src="baseUrl+item" v-for="(item,index) in pics" :key="index" /> -->
            </el-upload>

            <el-dialog :visible.sync="dialogVisible"></el-dialog>
          </el-form-item>
          <!-- 配送费 -->
          <el-form-item label="配送费">
            <el-input v-model="form.minPrice"></el-input>
          </el-form-item>
          <!-- 配送时间 -->
          <el-form-item label="配送时间">
            <el-input v-model="form.deliveryTime"></el-input>
          </el-form-item>
          <!-- 配送描述 -->
          <el-form-item label="配送描述">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
          <!-- 店铺评分 -->
          <el-form-item label="店铺评分">
            <el-input v-model="form.score"></el-input>
          </el-form-item>
          <!-- 销量 -->
          <el-form-item label="销量">
            <el-input v-model="form.sellCount"></el-input>
          </el-form-item>
          <!-- 活动性质 -->
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.supports">
              <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
              <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
              <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
              <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
              <el-checkbox label="多人精彩套餐" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <!-- 营业时间 -->
          <el-form-item label="营业时间">
            <el-time-picker
              is-range
              v-model="form.date"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </el-form-item>
        </el-form>
      </div>
    </TitCard>
  </div>
</template>

<script>
import moment from "moment";
import { getShopMsg, editShopMsg } from "@/api/apis";
import TitCard from "@/components/cards/titCar.vue";
export default {
  data() {
    return {
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      form: {
        avatar: "",
        pics: [],
      },

      // imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      baseUrl: "http://127.0.0.1:5000/upload/shop/",

      isedit: false,
    };
  },
  created() {
    this.fetData();
  },
  methods: {
    // 获取店铺信息
    fetData() {
      getShopMsg().then((res) => {
        this.form = res.data.data;
        this.form.pics = res.data.data.pics;
        this.form.supports = res.data.data.supports;

        let arr = [];
        this.form.pics = res.data.data.pics.map((v) => ({
          name: v,
          url: this.baseUrl + v,
        }));
        // console.log(this.form.pics);
      });
    },
    // 保存
    editBtn() {
      if (this.isedit) {
        this.isedit = false;

        let shopNew = JSON.parse(JSON.stringify(this.form));
        shopNew.date.forEach((v) => {
          v = moment(v).format("YYYY-MM-DD HH:mm:ss");
        });
        shopNew.date = JSON.stringify(shopNew.date);
        shopNew.supports = JSON.stringify(shopNew.supports);

        shopNew.pics = JSON.stringify(
          shopNew.pics.map((v) => v.url.substr(this.baseUrl.length))
        );

        // console.log(shopNew);
        editShopMsg(shopNew).then((res) => {
          if (res.data.code == 0) {
            this.fetData();
            this.$message({
              showClose: true,
              message: "保存成功",
              type: "success",
            });
          }
        });
      } else {
        this.isedit = true;
      }
    },
    // 上传店铺图片
    handleimgsSuccess(res) {
      this.form.pics.push({ name: res.imgUrl, url: this.baseUrl + res.imgUrl });
      // console.log(this.form.pics);
    },
    // 上传店铺头像
    handleAvatarSuccess(res) {
      this.form.avatar = res.imgUrl;
      // console.log(res);
    },
    // 删除店铺图片
    handleRemove(res) {
      this.form.pics.splice(this.form.pics.indexOf(res.name), 1);
      console.log(this.form.pics);
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

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  components: { TitCard },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
}

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