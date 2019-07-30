<template>
  <div class="no-data">
    <img src="../../assets/icon_train_offline.png" />
    <p>{{getText}}</p>
  </div>
</template>

<script>
export default {
  name: "noData",

  data() {
    return {};
  },

  props: ["getText"],

  mounted() {},

  methods: {}
};
</script>

<style scoped>
.no-data {
  margin: 24px 24px 12px;
  padding: 70px 0;
}

.no-data img {
  width: 50px;
  margin-bottom: 10px;
}

.no-data p {
  letter-spacing: 2px;
  line-height: 60px;
  font-size: 20px;
  color: #777;
}
</style>
