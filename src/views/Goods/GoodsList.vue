<template>
  <div class="goodslist">
    <TitCard>
      <p slot="title">商品列表</p>
      <div slot="content">
        <el-table :data="tableData" style="width:99%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="所属分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="商品价格">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="商品图片">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ props.row.ctime }}</span>
                </el-form-item>
                <el-form-item label="商品评价">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>

                <el-form-item label="商品销量">
                  <span>{{ props.row.sellCount }}</span>
                </el-form-item>

                <el-form-item label="商品描述">
                  <span>{{ props.row.goodsDesc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name"></el-table-column>
          <el-table-column label="所属分类" prop="category"></el-table-column>
          <el-table-column label="商品价格" prop="price"></el-table-column>
          <el-table-column label="商品图片">
            <template slot-scope="scope">
              <img :src="baseUrl+scope.row.imgUrl" style="width:50px" />
            </template>
          </el-table-column>
          <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 模态框 -->
        <div>
          <el-dialog title="编辑商品" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
              <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品分类" :label-width="formLabelWidth">
                <el-select v-model="form.category" style="width:270px">
                  <el-option
                    v-for="item in categories"
                    :key="item.cateName"
                    :value="item.cateName"
                  >{{item.cateName}}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品价格" :label-width="formLabelWidth">
                <el-input-number v-model="form.price" @change="handleChange" :min="1" label="描述文字"></el-input-number>
              </el-form-item>
              <el-form-item label="商品图片" :label-width="formLabelWidth">
                <el-upload
                  class="avatar-uploader"
                  action="http://127.0.0.1:5000/goods/goods_img_upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="baseUrl+form.imgUrl" :src="baseUrl+form.imgUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="商品描述" :label-width="formLabelWidth">
                <el-input v-model="form.goodsDesc" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="editMsg">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3, 7, 10, 15]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </TitCard>
  </div>
</template>

<script>
import moment from "moment";
import { getshopList, delshop, editshop, allCate } from "@/api/apis";
import TitCard from "@/components/cards/titCar.vue";
export default {
  data() {
    return {
      form: {},
      categories: [],

      dialogFormVisible: false,
      formLabelWidth: "80px",
      tableData: [],
      currentPage: 1,
      pageSize: 3,
      total: 0,

      baseUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/", //服务器图片地址
    };
  },
  created() {
    this.fetData();
  },
  methods: {
    // 获取数据
    fetData() {
      getshopList(this.currentPage, this.pageSize).then((res) => {
        this.tableData = res.data.data;
        res.data.data.forEach((v) => {
          v.ctime = moment(v.ctime).format("YYYY-MM-DD HH:mm:ss");
        });

        this.total = res.data.total;
      });
    },
    // 删除商品
    handleDelete(id) {
      delshop(id).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success",
          });
          this.fetData();
        }
      });
    },

    // 显示模态框和信息回填
    handleEdit(row) {
      allCate().then((res) => {
        this.categories = res.data.categories;
      });
      this.dialogFormVisible = true;
      this.form = { ...row };
    },
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.form.imgUrl = res.imgUrl;
      }
    },
    beforeAvatarUpload() {},

    handleSizeChange(val) {
      this.pageSize = val;
      this.fetData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetData();
    },
    handleChange() {},

    // 保存修改内容
    editMsg() {
      editshop(
        this.form.name,
        this.form.category,
        this.form.price,
        this.form.imgUrl,
        this.form.goodsDesc,
        this.form.id
      ).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
          this.dialogFormVisible = false;
          this.fetData();
        }
      });
    },
  },

  components: {
    TitCard,
  },
};
</script>

<style lang="less" scoped>
.goodslist {
  width: 100%;
  //   .demo-table-expand {
  //     font-size: 0;
  //   }
  //   .demo-table-expand label {
  //     width: 90px;
  //     color: #99a9bf;
  //   }
  //   .demo-table-expand .el-form-item {
  //     margin-right: 0;
  //     margin-bottom: 0;
  //     width: 50%;
  //   }
}
.avatar-uploader .el-upload {
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