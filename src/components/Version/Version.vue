<template>
  <div>
    <a-card>
      <!--面板屑导航-->
      <BreadNav :breadNav="breadNav"></BreadNav>
    </a-card>

    <a-card class="mt">
      <!-- 表格 -->
      <div id="components-table-demo-size">
        <a-table :columns="columns" :pagination="pagination" :loading="loading" :dataSource="tableData" size="middle" @change="handleTableChange">
          <span slot="versionStatus" slot-scope="versionStatus">
            <a-badge status="success" text="正常" v-if="versionStatus=='正常'" />
            <a-badge status="warning" text="异常" v-if="versionStatus=='异常'" />
          </span>
          <span slot="operate" slot-scope="operate, record">
            <a href="javascript:;" v-on:click="seeVersion(record)">查看版本记录</a>
          </span>
        </a-table>
      </div>
    </a-card>

    <!-- 版本记录 -->
    <VersionLog :getModalData="modalData" ref="openModal"></VersionLog>
  </div>
</template>

<script>
// 接口请求
import {
  get_version_list,
  get_version_single
} from "../../api/train";

// 方法
let moment = require("moment");

// 组件
import BreadNav from "../Common/BreadNav";
import VersionLog from "./VersionLog";

// 表头
const columns = [{
    title: "车型",
    dataIndex: "train_type",
    key: "train_type"
  },
  {
    title: "车号",
    dataIndex: "train_no",
    key: "train_no"
  },
  {
    title: "版本内容",
    dataIndex: "version_content",
    key: "version_content"
  },
  {
    title: "实际版本号",
    dataIndex: "version_current",
    key: "version_current"
  },
  {
    title: "创建时间",
    dataIndex: "createtime",
    sorter: true,
    scopedSlots: {
      customRender: "createtime"
    },
    key: "createtime"
  },
  {
    title: "更新时间",
    dataIndex: "update_time",
    key: "update_time"
  },
  {
    title: "状态",
    dataIndex: "versionStatus",
    key: "versionStatus",
    scopedSlots: {
      customRender: 'versionStatus'
    }
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    scopedSlots: {
      customRender: "operate"
    }
  }
];

export default {
  name: "Version",

  components: {
    BreadNav,
    VersionLog
  },

  data() {
    return {
      // 面包屑导航
      breadNav: [{
        name: "版本管理",
        url: "/version"
      }],

      // 表格数据
      loading: false,
      order: "asc",
      columns,
      tableData: [],
      pagination: {},

      // 传给弹框的数据
      modalData: []
    }
  },

  mounted() {
    // 获取数据
    this.getData(1, this.order);
  },

  methods: {

    // 获取数据
    getData(paramPage, paramOrder) {

      // 加载动画
      this.loading = true;

      // 参数
      const param = {
        orderBy: "module_name,version_content",
        order: paramOrder,
        pagination: 1,
        pageNo: paramPage,
        pageSize: 10,
        paramap: {
          train_no: ""
        }
      };

      // 请求接口
      get_version_list(param).then(res => {
        if (res.bodyData) {
          // 获取页数信息
          const pagination = {
            ...this.pagination
          };
          pagination.total = res.totalCount;
          this.pagination = pagination;

          // 停止加载动画
          this.loading = false;

          // 数据处理
          res.bodyData.forEach((item, index) => {

            item.key = index;

            // 状态
            item.versionStatus = item.status === true ? "正常" : "异常";

            // 时间戳转换
            item.createtime = moment(item.createtime).format(
              "YYYY-MM-DD HH-mm"
            );
          });

          // 获取表格数据
          this.tableData = res.bodyData;
        }
      }).catch(error => {
        // 停止加载动画
        this.loading = false;
      });
    },

    // 改变分页
    handleTableChange(pagination, filters, sorter) {
      // 更改参数
      const pager = {
        ...this.pagination
      };
      pager.current = pagination.current;
      this.order = sorter.order === "ascend" ? "asc" : "desc";
      this.pagination = pager;

      // 获取当前页面的数据
      this.getData(pager.current, this.order);
    },

    // 查看版本记录
    seeVersion(e) {
      // 组装参数
      const newParam = {
        line_name: e.line_name,
        module_name: e.module_name,
        train_coach: e.train_coach,
        train_no: e.train_no,
        train_type: e.train_type,
        version_content: e.version_content
      };

      // 查询单条版本记录
      get_version_single(newParam).then(res => {
        this.$refs.openModal.open();
        this.modalData = res.list;
      });
    }
  }
}
</script>
