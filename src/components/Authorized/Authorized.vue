<template>
  <a-card>
    <div class="animate-wrap">
      <div class="background">

        <!-- 气泡 -->
        <div class="bubble bubble--10">
          <div class="bubble-spot" />
        </div>
        <div class="bubble bubble--20">
          <div class="bubble-spot" />
        </div>
        <div class="bubble bubble--30">
          <div class="bubble-spot" />
        </div>
        <div class="bubble bubble--45">
          <div class="bubble-spot" />
        </div>
        <div class="bubble bubble--60">
          <div class="bubble-spot" />
        </div>
        <div class="bubble bubble--70">
          <div class="bubble-spot" />
        </div>

        <!-- 章鱼 -->
        <div class="octopus">
          <div class="tentacle tentacle-1" />
          <div class="tentacle tentacle-2" />
          <div class="tentacle tentacle-3" />
          <div class="head">
            <div class="head-spot head-spot-1" />
            <div class="head-spot head-spot-2" />
            <div class="eyes eyes-1">
              <div class="iris">
                <div class="pupil">
                  <div class="eyes-spot" />
                </div>
              </div>
            </div>
            <div class="eyes eyes-2">
              <div class="iris">
                <div class="pupil">
                  <div class="eyes-spot" />
                </div>
              </div>
            </div>
            <div class="mouth" />
          </div>
          <div class="octo-bubble">
            <div class="bubble-spot" />
          </div>
        </div>
      </div>
    </div>

    <!-- 按钮 -->
    <div class="auth-button-wrap">
      <a-button type="primary" class="auth-button" @click="handleClick">清除 token，返回登录页面</a-button>
    </div>
  </a-card>
</template>

<script>
import {
  mapActions
} from "vuex";

export default {
  name: "Authorized",

  data() {
    return {};
  },

  methods: {
    ...mapActions(["handleClearToken"]),

    // 清除 token
    handleClick() {
      // 清除 token
      this.handleClearToken();
      this.$message.info("token 已清除");

      // 跳转到登录页面
      this.$router.push({
        name: 'login'
      });
    }
  }
}
</script>

<style scoped>
@import './Authorized.css';
</style>
