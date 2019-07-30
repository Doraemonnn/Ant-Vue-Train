<template>
  <div>
    <a-card>
      <!--面板屑导航-->
      <BreadNav :breadNav="breadNav"></BreadNav>
    </a-card>

    <!--速度-->
    <div class="gutter-example search mt">
      <a-row :gutter="24">
        <!--速度-->
        <a-col class="gutter-row" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <EchartSpeed :getSpeed="trainData" ref="onRefSpeed"></EchartSpeed>
        </a-col>

        <!--网压-->
        <a-col class="gutter-row" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <EchartVoltage :getVoltage="trainData" ref="onRefVoltage"></EchartVoltage>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
// 方法
import {
  getWsParam
} from "../../../utils/mock";

// 组件
import BreadNav from "../../Common/BreadNav";
import EchartSpeed from "./EchartSpeed";
import EchartVoltage from "./EchartVoltage";

export default {
  name: "MonitorDetail",

  components: {
    BreadNav,
    EchartSpeed,
    EchartVoltage
  },

  data() {
    return {
      // 面包屑导航
      breadNav: [],

      // 车型、车号
      trainType: "",
      trainNo: "",

      // websocket 参数
      websock: null,
      agentData: {},
      trainData: {}
    }
  },

  created() {
    // 面包屑导航
    this.breadNav = [{
      name: "实时监视",
      url: "/home"
    }, {
      name: "列车详情",
      url: ""
    }, {
      name: this.$route.params.trainno,
      url: ""
    }];

    // 车型、车号
    this.trainType = this.$route.params.traintype;
    this.trainNo = this.$route.params.trainno;

    // 获取 websocket 数据
    this.getWsData();

    // 监听窗口尺寸变化
    window.addEventListener("resize", this.resizeDiv);
  },

  destroyed() {
    // 页面销毁时关闭长连接
    this.websocketclose();

    // 移除事件监听
    window.removeEventListener("resize", this.resizeDiv);
  },

  methods: {
    getWsData() {
      // ws地址
      const wsuri = "ws://139.9.53.159:60609/websocket/web";

      // ws参数
      this.agentData = getWsParam([this.trainNo]);

      // ws对象
      this.websock = new WebSocket(wsuri);
      // 建立连接
      this.websock.onopen = this.websocketonopen;
      // 异常处理
      this.websock.onerror = this.websocketonerror;
      // 接收数据
      this.websock.onmessage = this.websocketonmessage;
      // 关闭连接
      this.websock.onclose = this.websocketclose;
    },

    // 建立连接
    websocketonopen() {
      this.websocketsend();
      console.log("WebSocket连接成功");
    },

    // 异常处理
    websocketonerror(e) {
      //错误
      console.log("WebSocket连接发生错误");
    },

    // 接收数据
    websocketonmessage(e) {
      // 数据处理
      this.trainData = JSON.parse(e.data)["value"]["data"][this.trainType + "_" + this.trainNo.slice(2, 4)];
    },

    // 发送参数
    websocketsend() {
      // 数据发送
      this.websock.send(JSON.stringify(this.agentData));
    },

    // 关闭连接
    websocketclose(e) {
      // 关闭
      this.websock.close();
      console.log("WebSocket连接已关闭");
    },

    // echart 自适应
    resizeDiv() {
      this.$refs.onRefSpeed.resizeEchart();
      this.$refs.onRefVoltage.resizeEchart();
    }
  }
}
</script>
