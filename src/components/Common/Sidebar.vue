<template>
  <a-menu theme="dark" mode="inline" :defaultSelectedKeys="selectedKeys" :defaultOpenKeys="openKeys" @click="clickMenu">
    <template v-for="item in menuArr">
      <!-- 一级菜单 -->
      <template v-if="(!item.meta.hide)&&(!item.children)">
        <a-menu-item v-bind:key="item.id">
          <router-link :to="item.path" :title="item.meta.title" v-bind:key="item.id">
            <a-icon :type="item.meta.icon" />
            <span>{{item.meta.title}}</span>
          </router-link>
        </a-menu-item>
      </template>

      <!-- 二级父菜单 -->
      <template v-if="(!item.meta.hide)&&(item.children)">
        <a-sub-menu v-bind:key="item.id">
          <span slot="title">
            <a-icon :type="item.meta.icon" />
            <span>{{item.meta.title}}</span>
          </span>

          <!-- 二级子菜单 -->
          <template v-for="childItem in item.children">
            <template v-if="!childItem.children">
              <a-menu-item v-bind:key="childItem.id">
                <router-link :to="childItem.path" :title="childItem.meta.title" v-bind:key="childItem.id">
                  <a-icon :type="childItem.meta.icon" />
                  <span>{{childItem.meta.title}}</span>
                </router-link>
              </a-menu-item>
            </template>

            <!-- 二级父菜单 -->
            <template v-if="childItem.children">
              <a-sub-menu v-bind:key="childItem.id">
                <span slot="title">
                  <a-icon :type="childItem.meta.icon" />
                  <span>{{childItem.meta.title}}</span>
                </span>

                <!-- 三级子菜单 -->
                <template v-for="thirdItem in childItem.children">
                  <a-menu-item v-bind:key="thirdItem.id">
                    <router-link :to="thirdItem.path" :title="thirdItem.meta.title" v-bind:key="thirdItem.id">
                      <a-icon :type="thirdItem.meta.icon" />
                      <span>{{thirdItem.meta.title}}</span>
                    </router-link>
                  </a-menu-item>
                </template>
              </a-sub-menu>
            </template>

          </template>
        </a-sub-menu>
      </template>
    </template>
  </a-menu>
</template>

<script>
import routerData from "../../router/router-data";

export default {
  name: "Sidebar",

  data() {
    return {
      menuArr: [],
      selectedKeys: ['1'],
      openKeys: ['1']
    }
  },

  beforeMount() {
    // 选中的菜单
    if (sessionStorage.getItem("key")) {
      this.selectedKeys = [sessionStorage.getItem("key")];
    }

    // 展开的菜单
    if (sessionStorage.getItem("keyPath")) {
      if (sessionStorage.getItem("keyPath").includes(",")) {
        this.openKeys = sessionStorage.getItem("keyPath").split(",");
      } else {
        this.openKeys = [sessionStorage.getItem("keyPath")];
      }
    }
  },

  created() {
    // 获取菜单数据
    routerData.forEach((item) => {
      if (item.children) {
        this.menuArr = item.children;
      }
    })
  },

  methods: {
    clickMenu(e) {
      // 将当前点击的菜单保存到 sessionStorage 中
      sessionStorage.setItem("key", e.key);
      sessionStorage.setItem("keyPath", e.keyPath);
    }
  }
}
</script>

<style scoped>
li {
  text-align: left;
}
</style>
