<template>
  <div>
    <TitCard>
      <p slot="title" class="title">
        <span>订单编辑</span>
      </p>

      <div slot="content">
        <el-form :model="form" style="width:400px">
          <!-- 订单id -->
          <el-form-item label="订单id">
            <el-input disabled v-model="form.id" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="sendMsg">保存</el-button>
      </div>
    </TitCard>
  </div>
</template>

<script>
import { editOrder } from "@/api/apis";
import TitCard from "@/components/cards/titCar.vue";
export default {
  components: { TitCard },
  data() {
    return {
      form: {},
    };
  },
  created() {
    this.form = JSON.parse(localStorage.getItem("row"));
    // console.log(this.form);
    // console.log(this.form);
  },
  methods: {
    //  修改订单信息
    sendMsg() {
      let {
        id,
        orderNo,
        orderTime,
        phone,
        consignee,
        deliverAddress,
        deliveryTime,
        remarks,
        orderAmount,
        orderState,
      } = this.form;
      editOrder(
        id,
        orderNo,
        orderTime,
        phone,
        consignee,
        deliverAddress,
        deliveryTime,
        remarks,
        orderAmount,
        orderState
      ).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
          this.$router.push("/order");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>