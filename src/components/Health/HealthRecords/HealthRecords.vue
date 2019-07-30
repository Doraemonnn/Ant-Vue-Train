<template>
  <div>
    <a-card>
      <!--面板屑导航-->
      <BreadNav :breadNav="breadNav"></BreadNav>
    </a-card>

    <a-card class="mt">
      <!-- 加载动画 -->
      <div class="loading" v-if="loading === true">
        <a-spin size="large" />
      </div>

      <!-- 健康状况 -->
      <a-row :gutter="24">
        <a-col class="gutter-row" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
          <HealthEchart :pieList="pieList"></HealthEchart>
        </a-col>
        <a-col class="gutter-row" :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
          <HealthList :healthList="healthList"></HealthList>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
// 接口请求
import {
  get_train_health
} from "../../../api/train";

// 组件
import BreadNav from "../../Common/BreadNav";
import HealthEchart from "./HealthEchart";
import HealthList from "./HealthList";

export default {
  name: "HealthRecords",

  components: {
    BreadNav,
    HealthEchart,
    HealthList
  },

  data() {
    return {
      // 面包屑导航
      breadNav: [{
        name: "健康档案",
        url: "/health-records"
      }],

      // 数据
      loading: true,
      pieList: [], // 饼状图
      healthList: [] // 健康状况列表
    }
  },

  created() {
    get_train_health({
      lineNum: "13"
    }).then(res => {
      this.loading = false;
      this.pieList = res.map.pieList;
      this.healthList = res.map.trainList;
    });
  }
}
</script>

<style scoped>
.loading {
  width: 100%;
  height: 500px;
  line-height: 500px;
}
</style>
