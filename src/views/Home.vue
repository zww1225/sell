<template>
  <div class="home">
    <div class="cards">
      <Card :cardMsg="cardMsg"></Card>
      <!-- <Card></Card>
      <Card></Card>
      <Card></Card>-->
    </div>
    <div id="myCharts" ref="myCharts"></div>
  </div>
</template>

<script>
import { getHomeMsg } from "@/api/apis";
// 引入组件卡片
import Card from "@/components/cards/card.vue";
export default {
  components: {
    Card,
  },
  data() {
    return {
      cardMsg: {},
      xData: {},
    };
  },
  created() {
    this.fetData();
  },
  methods: {
    fetData() {
      getHomeMsg().then((res) => {
        this.cardMsg = res.data;
        // console.log(res);
      });
    },
  },
  mounted() {
    const myCharts = this.$echarts.init(this.$refs.myCharts);

    getHomeMsg().then((res) => {
      let options = {
        title: {
          text: "数据统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["订单", "销售总额", "注册人数", "管理员人数"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res.data.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "订单",
            type: "line",
            stack: "总量",
            data: res.data.orderData,
          },
          {
            name: "销售总额",
            type: "line",
            stack: "总量",
            data: res.data.amountData,
          },
        ],
      };
      this.cardMsg = res.data;
      // console.log(res);
      myCharts.setOption(options);
    });
  },
};
</script>

<style lang="less" scoped>
.home {
  background-color: #ccc;
  flex: 1;
  // padding: 20px;
  // box-sizing: border-box;
  // .cards {
  //   display: flex;
  //   justify-content: space-around;
  // }
  #myCharts {
    margin-top: 20px;
    width: 100%;
    height: 600px;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>