<template>
  <div class="temp">
    <div class="temp-title">实时温度</div>
    <div id="temp" class="temp-echart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import {getTemp} from "@/api/home/home";

export default {
  name: "Temp",
  data() {
    return {
      myChart: undefined,
      xTip: [],
      xData: []
    }
  },
  props: {
    tempData: {
      type: Array,
      default: []
    },
  },
  watch: {
    tempData(nVal,oVal) {
      // 第一次清空数据
      if(oVal) {
        this.xTip = [];
        this.xData = [];
      }
      nVal.map(item => {
        this.xTip.push(item.createtime);
        this.xData.push(item.temp);
      })
      this.getLoadEcharts();
    }
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("temp"));
    //this.getTemp();
    //this.getLoadEcharts();
  },
  methods: {
    // 获取温度数据
    getTemp() {
      getTemp(7)
      .then(res => {
        let data = res.data;
        data.map(item => {
          this.xTip.push(item.createtime);
          this.xData.push(item.temp);
        })
        this.getLoadEcharts();
      })
    },
    getLoadEcharts() {
      let option = {
        animation: false,
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
              data: this.xTip
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name:'温度',
            data: this.xData,
            type: 'line',
            smooth: true,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
          }
        ]
      }
      this.myChart.setOption(option);
    }
  }
}
</script>

<style scoped>
 .temp {
   padding: 20px;
   height: 400px;
   background-color: white;
 }
 .temp-title {
   font-size: 32px;
   font-weight: bolder;
 }
 .temp-echart {
   height: 300px;
 }

</style>
