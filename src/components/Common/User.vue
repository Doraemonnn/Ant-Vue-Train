<template>
  <div class="fr avatar" @click="handleLogOut">
    <a-avatar size="large" icon="user" />
    <span>{{userName}}</span>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex';

export default {
  name: "user",

  data() {
    return {
      userName: "未登录"
    }
  },

  computed: {
    ...mapGetters([
      'userInfoData'
    ])
  },

  created() {
    if (this.userInfoData) {
      this.userName = this.userInfoData.userName;
    }
  },

  methods: {
    // 退出登录
    handleLogOut() {
      this.$router.push({
        name: 'login'
      });
    }
  }
}
</script>

<style scoped>
#components-layout-demo-custom-trigger .avatar {
  margin-right: 50px;
  cursor: pointer;
}

#components-layout-demo-custom-trigger .avatar .ant-avatar {
  vertical-align: middle;
  margin-top: -5px;
}

#components-layout-demo-custom-trigger .avatar span {
  margin-left: 15px;
  font-size: 16px;
}
</style>
