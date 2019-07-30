<template>
  <div class="gutter-example">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="24">
        <div class="gutter-box first-row text-left">
          <img src="../../assets/icon_train_offline.png" v-if="getItemData.level==-1">
          <img src="../../assets/icon_metro_blue.png" v-if="getItemData.level==0">
          <img src="../../assets/icon_metro_grade2.png" v-if="getItemData.level==1">
          <img src="../../assets/icon_metro_orange.png" v-if="getItemData.level==2">
          <img src="../../assets/icon_metro_grade0.png" v-if="getItemData.level==3">
          <router-link :to="{ name: 'monitorDetail', params: { traintype: getItemData.ttypeName, trainno: getItemData.trainLocono }}" :title="getItemData.trainLocono">
            <span class="content train">{{getItemData.trainLocono}} 车</span>
          </router-link>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="12">
        <div class="gutter-box">
          <p class="title">里程</p>
          <p class="content">{{getItemData.mile}} km</p>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="12">
        <div class="gutter-box">
          <p class="title">速度</p>
          <p class="content">{{getItemData.speed}} km/h</p>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="12">
        <div class="gutter-box">
          <p class="title">网压</p>
          <p class="content">{{getItemData.voltage}} V</p>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="12">
        <div class="gutter-box">
          <p class="title">能耗</p>
          <p class="content">{{getItemData.energy}} kWh</p>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    getItemData: {}
  },

  created() {},

  data() {
    return {

    };
  },

  methods: {

  },

  watch: {

  }
};
</script>

<style scoped>
.gutter-example {
  background: #fff;
  margin: 0 0 24px;
  padding: 20px 0 0;
}

.gutter-row img {
  width: 30px;
  vertical-align: middle;
  margin-top: -8px;
  margin-left: 32px;
  margin-right: 5px;
}

.first-row {
  margin-top: 7px;
  margin-bottom: 20px;
  height: 40px;
  text-indent: 10px;
}

.gutter-row .add-focus {
  line-height: 36px;
  font-size: 18px;
  cursor: pointer;
}

.gutter-row .add-focus:hover {
  color: #108ee9;
}

.gutter-row .title {
  font-size: 20px;
}

.gutter-row .content {
  font-size: 20px;
  color: #666;
}

.train:hover {
  color: #108ee9;
}
</style>
