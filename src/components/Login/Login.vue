<template>
  <div class="login">
    <div class="login-box">
      <img src="../../assets/logo.png" class="App-logo" alt="logo" />

      <a-form :form="form" @submit="handleSubmit">
        <!-- 用户名 -->
        <a-form-item>
          <a-input placeholder="用户名 admin" v-decorator="['userName', {rules: [{ required: true, message: '请输入用户名' }]}]">
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>

        <!-- 密码 -->
        <a-form-item>
          <a-input placeholder="密码 crrc" type="password" v-decorator="['password', {rules: [{ required: true, message: '请输入密码' }]}]">
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>

        <!-- 登录按钮 -->
        <a-form-item :wrapper-col="{ span: 24, offset: 0 }">
          <a-button type="primary" html-type="submit">
            登 录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import {
  mapActions
} from "vuex";

export default {
  name: "Login",

  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
    };
  },

  methods: {
    ...mapActions(["handleLogin", "handleGetUserInfo"]),

    // 提交
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // 请求登录接口
          this.handleLogin({
            username: values.userName,
            password: "jtOR5xZKqGY4IDZ7/qJjgbpn3PsOIZr11Ai+gD0kViy7e3eHhUZ10n/wqS+hBcIBeVoqgD6p42ttlxYJNGt1PxltQkN7/0lmOPYC7Td7kCiz/ghtms4XN++cALvXtCfNH5/ll5iOZMoodMuonFu5CJun0xzPsZxTLTVTpwUgIhw=",
            rememberMe: "false"
          }).then(res => {
            // 获取用户信息
            this.handleGetUserInfo().then(res => {
              this.$router.push({
                name: 'home'
              });
            });
          });
        }
      });
    },
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("../../assets/login-bg.jpg") center center no-repeat;
  background-size: cover;
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 340px;
  padding: 20px 30px;
  border-radius: 8px;
  border: solid 1px rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.2);
}

.login-box .App-logo {
  width: 130px;
  margin-bottom: 30px;
}

.login-box .ant-btn {
  width: 100%;
}
</style>
