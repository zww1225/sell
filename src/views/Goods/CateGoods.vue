<template>
  <div class="cate">
    <TitCard>
      <p class="title" slot="title">
        <span>商品分类</span>
        <el-button type="primary" @click="AdddBtn">添加分类</el-button>
      </p>

      <div slot="content">
        <div class="list">
          <el-table ref="singleTable" :data="tableData" style="width: 100%">
            <el-table-column type="index" width="150"></el-table-column>

            <el-table-column prop="cateName" label="分类名称" width="180">
              <template slot-scope="scope">
                <span v-show="!scope.row.isedit">{{scope.row.cateName}}</span>
                <el-input v-show="scope.row.isedit" v-model="scope.row.cateName"></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="state" label="是否启用" type="index" width="150">
              <template slot-scope="scope">
                <el-switch
                  :disabled="!scope.row.isedit"
                  v-model="scope.row.state"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">{{scope.row.isedit?'完成':'编辑'}}</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 模态框 -->
          <div>
            <el-dialog title="添加分类" :visible.sync="dialogFormVisible" width="30%">
              <el-form :model="form">
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                  <el-input v-model="form.cateName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" :label-width="formLabelWidth">
                  <el-switch v-model="form.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="AddCateMsg">确 定</el-button>
              </span>
            </el-dialog>
          </div>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[ 3, 5, 7]"
            layout="total,sizes, prev, pager, next, jumper"
            :total="total"
            :pageSize="pageSize"
          ></el-pagination>
        </div>
      </div>
    </TitCard>
  </div>
</template>

<script>
import { addCate, getCate, delCate, editCate } from "@/api/apis";
import TitCard from "@/components/cards/titCar.vue";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: { cateName: "", state: "1" },
      state: 1,
      dialogVisible: false,
      currentPage: 1,
      pageSize: 3,
      tableData: [],
      total: 0,
    };
  },
  components: {
    TitCard,
  },
  created() {
    this.fetData();
  },
  methods: {
    // 获取数据
    fetData() {
      getCate(this.currentPage, this.pageSize).then((res) => {
        // 遍历数据
        let arr = res.data.data;
        for (let obj of arr) {
          obj.isedit = false;
          obj.state = obj.state == 1 ? true : false;
        }
        this.tableData = arr;

        this.total = res.data.total;
      });
    },
    // 显示模态框
    AdddBtn() {
      this.dialogFormVisible = true;
    },

    // 添加分类
    AddCateMsg() {
      addCate(this.form.cateName, this.form.state).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success",
          });
          this.dialogFormVisible = false;
          this.fetData();
        }
      });
    },

    // 删除分类
    handleDelete(id) {
      delCate(id).then((res) => {
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
    // 编辑分类
    handleEdit(row) {
      if (row.isedit) {
        row.isedit = false;
        editCate(row.id, row.cateName, row.state).then((res) => {
          console.log(res.data.code);
          if (res.data.code == 0) {
            this.$message({
              showClose: true,
              message: "编辑成功",
              type: "success",
            });

            // this.fetData();
          }
        });
      } else {
        row.isedit = true;
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetData();
    },
  },
};
</script>

<style lang="less" scoped>
.cate {
  width: 100%;
  .title {
    display: flex;
    justify-content: space-between;
  }
  .list {
    width: 100%;
  }
}
</style>