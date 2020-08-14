<template>
  <div class="cate">
    <TitCard>
      <p slot="title">商品添加</p>
      <div slot="content">
        <el-form ref="form" :model="form" label-width="80px">
          <!-- 商品名称 -->
          <el-form-item label="商品名称" style="width:350px">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <!-- 商品分类 -->

          <el-form-item label="商品分类">
            <el-select v-model="categoryValue" style="width:270px">
              <el-option
                v-for="item in categories"
                :key="item.cateName"
                :value="item.cateName"
              >{{item.cateName}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input-number v-model="form.price" @change="handleChange" :min="1" label="描述文字"></el-input-number>
          </el-form-item>

          <el-form-item label="商品图片">
            <el-upload
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
            >
              <img :src="baseUrl+form.imgUrl" alt />
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <!-- 商品描述 -->
          <el-form-item label="商品描述" style="width:350px">
            <el-input type="textarea" v-model="form.goodsDesc"></el-input>
          </el-form-item>

          <el-button style="margin-left:80px" type="primary" @click="clickAdd">添加商品</el-button>
        </el-form>
      </div>
    </TitCard>
  </div>
</template>

<script>
import { allCate, addShop } from "@/api/apis";
import TitCard from "@/components/cards/titCar.vue";
export default {
  data() {
    return {
      categoryValue: "",
      form: { price: 1 },
      categories: [],
      baseUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/", //服务器图片地址;
    };
  },
  components: {
    TitCard,
  },
  created() {
    this.fetData();
  },
  methods: {
    fetData() {
      allCate().then((res) => {
        this.categories = res.data.categories;
        this.categoryValue = this.categories[0];
      });
    },

    // 添加商品
    clickAdd() {
      addShop(
        this.form.name,
        this.form.category,
        this.form.price,
        this.form.imgUrl,
        this.form.goodsDesc
      ).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success",
          });
        }
      });
    },
    handleAvatarSuccess(res) {
      // console.log(res.code);
      if (res.code == 0) {
        this.form.imgUrl = res.imgUrl;
      }
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange() {},
  },
};
</script>

<style lang="less" scoped>
.cate {
  width: 100%;
  .list {
    width: 100%;
  }
}
</style>