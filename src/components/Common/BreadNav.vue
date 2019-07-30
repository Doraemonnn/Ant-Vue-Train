<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="item in navList" v-bind:key="item.url">
      <router-link :to="item.url">{{item.name}}</router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  props: {
    breadNav: {}
  },

  data() {
    return {
      navList: []
    }
  },

  mounted() {
    this.navList = this.breadNav;
  }
}
</script>
