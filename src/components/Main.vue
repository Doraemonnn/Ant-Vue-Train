<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <!-- 菜单 -->
    <a-layout-sider :trigger="null" width="250" collapsible v-model="collapsed">
      <div class="logo" />
      <Sidebar></Sidebar>
    </a-layout-sider>

    <a-layout>
      <!-- 头部 -->
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="()=> collapsed = !collapsed" />
        <User></User>
      </a-layout-header>

      <!-- 主体内容 -->
      <a-layout-content :style="{ margin: '24px', padding: '0px', minHeight: '280px' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Sidebar from "./Common/Sidebar";
import User from "./Common/User";

export default {
  name: "Main",
  components: {
    Sidebar,
    User
  },
  data() {
    return {
      collapsed: false
    };
  },
  mounted() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

.anticon-menu-fold {
  float: left;
}

.anticon-menu-unfold {
  float: left;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, .2);
  margin: 16px;
}
</style>
