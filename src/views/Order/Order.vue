<template>
  <div>
    <el-card class="box-card">
      <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
        <!-- 订单号 -->
        <el-form-item label="订单号" prop="orderNo">
          <el-input style="width:140px" v-model="orderNo" placeholder="订单号"></el-input>
        </el-form-item>
        <!-- 收货人 -->
        <el-form-item label="收货人" prop="consignee">
          <el-input v-model="consignee" placeholder="收货人"></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="phone" placeholder="手机号"></el-input>
        </el-form-item>
        <!-- 订单状态 -->
        <el-form-item label="订单状态" prop="orderState">
          <el-select v-model="orderState" placeholder="订单状态">
            <el-option :label="item" :value="item" v-for="item in option" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 选择时间 -->
        <el-form-item label="选择时间" prop="date">
          <el-date-picker
            v-model="date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>

          <el-button style="margin-left:10px" type="primary" @click="clickLook">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <div class="tableBox">
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          :data="tableData"
          border
          style="width: 100%"
          :style="{width:styleObject}"
        >
          <!-- 订单号 -->
          <el-table-column fixed prop="orderNo" label="订单号" width="150"></el-table-column>
          <!-- 下单时间 -->
          <el-table-column prop="orderTime" label="下单时间" width="120"></el-table-column>
          <!-- 手机号 -->
          <el-table-column prop="phone" label="手机号" width="150"></el-table-column>
          <!-- 收货人 -->
          <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
          <!-- 配送地址 -->
          <el-table-column prop="deliverAddress" label="配送地址" width="120"></el-table-column>
          <!-- 送达时间 -->
          <el-table-column prop="deliveryTime" label="送达时间" width="120"></el-table-column>
          <!-- 用户备注 -->
          <el-table-column prop="remarks" label="用户备注" width="300"></el-table-column>
          <!-- 订单金额 -->
          <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
          <!-- 订单状态 -->
          <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="clickEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 模态框 -->

      <el-dialog title="查看订单详情" :visible.sync="dialogFormVisible">
        <el-form disabled :model="form" style="width:400px">
          <!-- 订单数据对象 -->
          <!-- <el-form-item label="订单数据对象">
            <el-input v-model="form.data" autocomplete="off"></el-input>
          </el-form-item>-->
          <!-- 订单id -->
          <el-form-item label="订单id">
            <el-input v-model="form.id" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 订单号 -->
          <el-form-item label="订单号">
            <el-input v-model="form.orderNo" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 下单时间 -->
          <el-form-item label="下单时间">
            <el-input v-model="form.orderTime" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 联系电话 -->
          <el-form-item label="联系电话">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 收货人 -->
          <el-form-item label="收货人">
            <el-input v-model="form.consignee" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 送货地址 -->
          <el-form-item label="送货地址">
            <el-input v-model="form.deliverAddress" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 送达时间 -->
          <el-form-item label="送达时间">
            <el-input v-model="form.deliveryTime" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 备注 -->
          <el-form-item label="备注">
            <el-input v-model="form.remarks" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 订单金额 -->
          <el-form-item label="订单金额">
            <el-input v-model="form.orderAmount" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 订单状态 -->
          <el-form-item label="订单状态">
            <el-input v-model="form.orderState" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 7, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getChinatime } from "@/utils/utils.js";
import { getOrder } from "@/api/apis";
export default {
  computed: {
    styleObject() {
      return document.body.clientWidth - 350 + "px";
    },
  },
  data() {
    return {
      option: ["已完成", "派送中", "已受理", "全部"],
      currentPage: 1,
      pageSize: 3,

      formInline: {},
      tableData: [],
      total: 0,
      form: {},
      dialogFormVisible: false,
      loading: true,
      date: null,
      orderNo: "", //订单号
      consignee: "",
      phone: "",
      orderState: "",
    };
  },
  created() {
    this.fetData();
  },
  methods: {
    // 查询订单
    clickLook() {
      let { orderNo, consignee, phone, orderState } = this;
      let paramsex = {};
      if (orderNo != "") paramsex.orderNo = orderNo;
      if (consignee != "") paramsex.consignee = consignee;
      if (phone != "") paramsex.phone = phone;
      if (orderState != "" && orderState != "全部")
        paramsex.orderState = orderState;
      if (this.date)
        paramsex.date = JSON.stringify([
          getChinatime(this.date[0]),
          getChinatime(this.date[1]),
        ]);
      console.log(paramsex);
      this.paramsex = paramsex;
      console.log(this.paramsex);
      this.fetData(this.paramsex);
    },

    // 获取订单列表
    fetData(paramsex) {
      this.loading = true;

      getOrder({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...paramsex,
      }).then((res) => {
        // console.log(res);
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.loading = false;

        for (let obj of res.data.data) {
          obj.deliveryTime = getChinatime(obj.deliveryTime);
          obj.orderTime = getChinatime(obj.orderTime);
        }
      });
    },

    // 查看
    handleClick(row) {
      this.dialogFormVisible = true;
      this.form = { ...row };
      // console.log(row);
    },
    // 编辑
    clickEdit(row) {
      localStorage.setItem("row", JSON.stringify(row));
      // console.log(JSON.stringify(row));
      this.$router.push("/order-edit");
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetData();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetData();
      // console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less" scoped>
.box-card {
  width: 100%;
  height: 100%;
}
</style>