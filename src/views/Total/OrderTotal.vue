<template>
  <div>
    <span>时间范围</span>
    <el-date-picker
      v-model="date"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>
    <el-button style="margin-left:10px" type="primary" @click="search">查询</el-button>

    <div id="salecount"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { getChinatime } from "@/utils/utils.js";
import { getOrderMsg } from "@/api/apis";
export default {
  data() {
    return {
      date: [],
    };
  },
  methods: {
    search() {
      let timer = JSON.stringify([
        getChinatime(this.date[0]),
        getChinatime(this.date[1]),
      ]);
      console.log(timer);
      this.fetData(timer);
    },

    fetData(str) {
      getOrderMsg(str).then((res) => {
        console.log(res);
        let arr = res.data.data;
        for (let obj of arr) {
          obj.orderTime = getChinatime(obj.orderTime);
        }

        let option = {
          xAxis: {
            type: "category",
            data: arr.map((obj) => obj.orderTime),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              type: "bar",
              data: arr.map((obj) => obj.orderAmount),
            },
          ],
        };

        this.sechart.setOption(option);
      });
    },
  },
  mounted() {
    this.sechart = echarts.init(document.getElementById("salecount"));
  },
};
</script>

<style lang="less" scoped>
#salecount {
  width: 100%;
  height: 600px;
  background-color: #fff;
  margin-top: 30px;
  padding: 20px;
  box-sizing: border-box;
}
</style>