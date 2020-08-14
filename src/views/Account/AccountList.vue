<template>
  <div class="acclist">
    <TitCard>
      <p slot="title">账号列表</p>
      <div slot="content">
        <el-table
          ref="tableData"
          :data="tableData"
          @selection-change="handchange"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- 账号 -->
          <el-table-column prop="account" label="账号" width="180"></el-table-column>
          <!-- 用户组 -->
          <el-table-column prop="userGroup" label="用户组" width="180"></el-table-column>

          <!-- 创建时间 -->
          <el-table-column prop="ctime" label="创建时间" width="180"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 模态框 -->
        <div>
          <el-dialog title="信息编辑" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
              <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input v-model="form.account" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户组" :label-width="formLabelWidth">
                <el-select v-model="form.userGroup" placeholder="请选择活动区域">
                  <el-option label="超级管理员" value="超级管理员"></el-option>
                  <el-option label="普通管理员" value="普通管理员"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="editMsg">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <!-- 分页 -->
        <div style="margin-top:20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 3, 5, 7]"
            :pageSize="pageSize"
            layout="total,sizes, prev,  pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>

        <el-button style="margin-top:20px" type="danger" @click="Dells">批量删除</el-button>
        <el-button style="margin-top:20px" type="primary" @click="cancelselect">取消选择</el-button>
      </div>
    </TitCard>
  </div>
</template>

<script>
import moment from "moment";
import { getUserList, delUser, allDel, editAccount } from "@/api/apis";
import TitCard from "@/components/cards/titCar.vue";
export default {
  data() {
    return {
      form: {},
      dialogFormVisible: false,
      formLabelWidth: "120px",
      tableData: [],

      currentPage: 1, //当前页
      pageSize: 5, //每页条数
      total: 0, //总条数
    };
  },
  created() {
    this.fetData();
  },
  methods: {
    // 获取数据
    fetData() {
      getUserList(this.currentPage, this.pageSize).then((res) => {
        this.tableData = res.data.data;
        this.total = res.data.total;

        // console.log(res.data.data);
        // 处理时间格式
        res.data.data.forEach((v) => {
          v.ctime = moment(v.ctime).format("YYYY-MM-DD HH:mm:ss");
        });
      });
    },
    // 编辑回填
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.form = { ...row };
    },
    // 修改信息
    editMsg() {
      editAccount(this.form.id, this.form.account, this.form.userGroup).then(
        (res) => {
          if (res.data.code == 0) {
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success",
            });
          }
        }
      );

      this.dialogFormVisible = false;
      this.fetData();
    },

    // 删除
    handleDelete(id) {
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser(id).then((res) => {
            console.log(res.data.code);
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.fetData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 选中删除
    handchange(rows) {
      this.ids = rows.map((v) => v.id);
      // console.log(this.ids);
    },
    // 取消选中
    cancelselect() {
      this.$refs.tableData.clearSelection();
    },
    // 批量删除
    Dells() {
      if (!this.ids) {
        this.$message({
          showClose: true,
          message: "请先选择",
          type: "error",
        });
        return false;
      }

      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          allDel(JSON.stringify(this.ids)).then((res) => {
            if (res.data.code == 0) {
              this.fetData();
              this.$message({
                showClose: true,
                message: "恭喜你，删除成功",
                type: "success",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(newsize) {
      this.pageSize = newsize;
      this.fetData();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(newpage) {
      this.currentPage = newpage;
      this.fetData();
      // console.log(`当前页: ${val}`);
    },
  },
  components: {
    TitCard,
  },
};
</script>

<style lang="less" scoped>
.acclist {
  width: 100%;
  el-table {
    width: 100%;
  }
}
</style>