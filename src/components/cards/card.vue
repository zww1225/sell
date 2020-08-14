<template>
  <div class="card">
    <div class="box-card">
      <div class="iconfont icon-dingdan1" style="color:cornflowerblue"></div>
      <div class="msg">
        <p>总订单</p>
        <p>{{cardMsg.totalOrder}}</p>
      </div>
    </div>
    <div class="box-card">
      <div class="iconfont icon-jinbi" style="color:#FF80C0"></div>
      <div class="msg">
        <p>总销售额</p>
        <p>{{cardMsg.totalAmount}}</p>
      </div>
    </div>
    <div class="box-card">
      <div class="iconfont icon-dingdan" style="color:cornflowerblue"></div>
      <div class="msg">
        <p>今日订单数</p>
        <p>{{cardMsg.todayOrder}}</p>
      </div>
    </div>
    <div class="box-card">
      <div class="iconfont icon-xiaoshoue" style="color:#80FF80"></div>
      <div class="msg">
        <p>今日销售额</p>
        <p>{{cardMsg.totayAmount}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cardMsg"],
};
</script>

<style lang="less" scoped>
.card {
  display: flex;
  justify-content: space-between;
  .box-card {
    .iconfont {
      font-size: 60px;
      flex: 0 0 100px;
      // color: cornflowerblue;
    }
    .msg {
      flex: 1;
      p {
        margin-top: 15px;
      }
    }
    width: 250px;
    background-color: #fff;
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 5px;
  }
}
</style>