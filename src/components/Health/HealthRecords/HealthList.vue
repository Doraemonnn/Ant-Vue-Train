<template>
  <div class="train-state">
    <a-row :gutter="24">
      <a-col class="gutter-row" :xs="8" :sm="6" :md="6" :lg="4" :xl="4" v-for="item in healthList" v-bind:key="item.id">
        <div class="wrap" @click="chooseTrain(item)">
          <div class="circle" :class="{typeA: (clickItem == item.trainNo)&&(item.healthStatus==0),
          typeB: (clickItem == item.trainNo)&&(item.healthStatus==1), 
          typeC: (clickItem == item.trainNo)&&(item.healthStatus==2),
          typeD: (clickItem == item.trainNo)&&(item.healthStatus==3)}">
            <img src="../../../assets/icon_trainHealth_green.png" v-if="item.healthStatus==0">
            <img src="../../../assets/icon_metro_grade2.png" v-if="item.healthStatus==1">
            <img src="../../../assets/icon_trainHealth_orange.png" v-if="item.healthStatus==2">
            <img src="../../../assets/icon_trainHealth_red.png" v-if="item.healthStatus==3">
          </div>
        </div>
        <p>{{item.trainNo}}</p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "HealthList",

  props: {
    healthList: {}
  },

  data() {
    return {
      // 鼠标点击的车号
      clickItem: ""
    };
  },

  methods: {
    // 点击车号
    chooseTrain(item) {
      this.clickItem = item.trainNo;
    },
  }
}
</script>

<style scoped>
p {
  line-height: 30px;
}

.wrap {
  text-align: center;
}

.wrap .circle {
  display: inline-block;
  padding: 3px;
  border: solid 2px #fff;
  border-radius: 100%;
  cursor: pointer;
}

.wrap .circle.typeA {
  border: solid 2px #52c41a;
}

.wrap .circle.typeB {
  border: solid 2px #fabc16;
}

.wrap .circle.typeC {
  border: solid 2px #ff8000;
}

.wrap .circle.typeD {
  border: solid 2px #f5222d;
}

.wrap .circle img {
  width: 29px;
  height: 29px;
}
</style>
