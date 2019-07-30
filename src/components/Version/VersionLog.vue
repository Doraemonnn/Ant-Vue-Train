<template>
  <div>
    <a-modal v-model="modalVisible" title="当前版本记录" onOk="handleOk" :footer="null">
      <a-timeline>
        <a-timeline-item v-for="item in versionLogData" v-bind:key="item.id">
          <div class="clearfix" style="width: 100%;">
            <span class="fl" style="float: left; line-height: 20px;">{{item.version_current}}</span>
            <span class="fr" style="float: right; line-height: 20px;">{{item.update_time}}</span>
          </div>
          <div style=" border-radius: 4px; padding: 2px 8px; margin: 5px 0;"></div>
        </a-timeline-item>
      </a-timeline>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "VersionLog",

  props: {
    getModalData: {}
  },

  data() {
    return {
      loading: false,
      modalVisible: false,
      versionLogData: []
    }
  },

  watch: {
    // 获取数据
    getModalData(val) {
      this.versionLogData = val;
    }
  },

  methods: {
    // 打开弹框
    open() {
      this.modalVisible = true;
    },

    // 关闭弹框
    handleOk(e) {
      this.loading = true;
      setTimeout(() => {
        this.modalVisible = false;
        this.loading = false;
      }, 3000);
    },

    // 关闭弹框
    handleCancel(e) {
      this.modalVisible = false;
    }
  }
}
</script>
