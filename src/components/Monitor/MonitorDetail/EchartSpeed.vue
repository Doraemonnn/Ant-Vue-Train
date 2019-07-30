<template>
  <a-card title="实时速度">
    <div class="echart" ref="myEchart">
    </div>
  </a-card>
</template>

<script>
import echarts from "echarts";
import * as _ from "lodash";
let moment = require("moment");

export default {
  props: {
    // 所有数据
    getSpeed: {}
  },

  data() {
    return {
      chart: null,
      // 用于展示的数据
      legendData: {},
      xlabelData: [0, 0, 0, 0, 0],
      ylabelData: [0, 0, 0, 0, 0]
    };
  },

  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },

  watch: {
    getSpeed(val) {
      if (val) {
        // 将时间和速度存放到数组中
        this.xlabelData.push(moment(val["timestamp"]).format("YYYY-MM-DD HH-mm"));
        this.ylabelData.push(val["sys1_s9"]);

        // 选取前6条数据
        if (this.xlabelData.length > 6) {
          this.xlabelData.splice(0, 1);
        }
        if (this.ylabelData.length > 6) {
          this.ylabelData.splice(0, 1);
        }
      }

      // 刷新echart
      this.initChart();
    }
  },

  methods: {
    // echart 自适应
    resizeEchart() {
      this.chart.resize();
    },

    // 获取数据
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart);

      // 配置和数据
      this.chart.setOption({
        color: "#eee",
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "3%",
          top: "5%",
          bottom: "5%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xlabelData,
          show: false
        },
        yAxis: [{
          type: "value",
          splitLine: {
            // 网格线
            show: true, // false隐藏
            lineStyle: {
              type: "dashed",
              color: "#E9E9E9"
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 16, // y轴字体大小
              color: "#000" // y轴字体颜色
            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        }],
        series: [{
          name: "当前速度",
          type: "line",
          showSymbol: false,
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                // width: 0.3,           // 折线宽度
                color: "#597ef7" // 折线颜色
              }
            }
          },
          data: this.ylabelData
        }]
      });
    }
  }
};
</script>

<style>
@media (max-width: 1600px) {
  .echart {
    width: 100%;
    height: 300px;
  }
}

@media (min-width: 1601px) {
  .echart {
    width: 100%;
    height: 400px;
  }
}
</style>
