<template>
  <div>
    <a-card>
      <!--面板屑导航-->
      <BreadNav :breadNav="breadNav"></BreadNav>

      <!-- 搜索框 -->
      <a-row type="flex" class="mt">
        <a-col :xs="16" :sm="12" :md="24" :lg="12" :xl="12" class="text-left">
          <a-input-search placeholder="搜索车号" @search="onSearch" @change="changeSearch" enterButton />
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="statistic media-text">
          <span>车辆总数：{{totalCount}}</span>
          <span>在线列车数：{{onlineCount}}</span>
        </a-col>
      </a-row>
    </a-card>

    <!--没有匹配结果时显示图片-->
    <a-card class="mt" v-if="searchLength==0">
      <NoData :getText="text"></NoData>
    </a-card>

    <!-- 卡片 -->
    <div class="gutter-example mt">
      <a-row :gutter="24">
        <a-col class="gutter-row" :xs="24" :sm="24" :md="12" :lg="8" :xl="6" v-for="item in trainList" v-if="item.show==true" v-bind:key="item.id">
          <MonitorCard :getItemData="item"></MonitorCard>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
// 接口请求
import {
  get_train_list
} from "../../api/train";

// 方法
import * as _ from "lodash";
import {
  getWsParam
} from "../../utils/mock";
import {
  handleWebsocketData
} from "../../utils/data-disposal";
import {
  filterTrain
} from "../../utils/filter";

// 组件
import BreadNav from "../Common/BreadNav";
import MonitorCard from "./MonitorCard";
import NoData from "../Common/NoData";

export default {
  name: "Monitor",

  components: {
    BreadNav,
    MonitorCard,
    NoData
  },

  data() {
    return {
      // 面包屑导航
      breadNav: [{
        name: "实时监视",
        url: "/home"
      }],

      // websocket 参数
      websock: null,
      agentData: {},

      // 列车数组
      trainList: {},
      selectTrain: "",

      // 在线离线数
      onlineCount: 0,
      totalCount: 0,

      // 搜索结果
      searchLength: 1,
      text: "没有匹配结果"
    }
  },

  created() {
    get_train_list({
      basicLineId: 13
    }).then(res => {
      // 数据处理
      res.list.forEach(item => {
        item.mile = 0;
        item.speed = 0;
        item.voltage = 0;
        item.energy = 0;
        item.level = 0;
        item.online = false;
        item.show = true;
      });

      // 统计
      this.trainList = res.list;
      this.totalCount = this.trainList.length;

      // 获取 websocket 数据
      this.getWsData();
    })
  },

  destroyed() {
    // 页面销毁时关闭长连接
    this.websocketclose();
  },

  methods: {
    // 搜索列车
    onSearch(value) {
      this.selectTrain = value;
      this.trainList = filterTrain(
        this.selectTrain,
        this.trainList
      );
      this.searchLength = _.filter(this.trainList, ["show", true]);
    },

    // 实时搜索
    changeSearch(value) {
      this.selectTrain = value.srcElement.value;
      this.trainList = filterTrain(
        this.selectTrain,
        this.trainList
      );
      this.searchLength = _.filter(this.trainList, ["show", true]);
    },

    // 获取 websocket 数据
    getWsData() {
      // ws地址
      const wsuri = "ws://139.9.53.159:60609/websocket/web";

      // 组装车号
      const trainnoList = [];
      this.trainList.forEach(item => {
        trainnoList.push(item.trainLocono);
      });

      // ws参数
      this.agentData = getWsParam(trainnoList);

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
      const data = handleWebsocketData(JSON.parse(e.data), this.trainList);
      this.trainList = data;

      // 在线列车数
      const onlineTrainCount = _.filter(data, ["online", true]).length;
      this.onlineCount = onlineTrainCount;

      // 符合搜索条件的列车数
      this.searchLength = _.filter(this.trainList, ["show", true]);
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
    }
  }
}
</script>

<style scoped>
.statistic span {
  margin-right: 30px;
  font-size: 18px;
}
</style>
