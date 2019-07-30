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
          <span slot="fault_status" slot-scope="fault_status">
            <a-tag color="cyan" v-if="fault_status==1">车载消除</a-tag>
            <a-tag color="orange" v-else>未消除</a-tag>
          </span>
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script>
// 接口请求
import {
  get_history_fault_data
} from "../../../api/train";

// 方法
let moment = require("moment");

// 组件
import BreadNav from "../../Common/BreadNav";

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
    title: "车厢",
    dataIndex: "train_coach",
    key: "train_coach"
  },
  {
    title: "故障码",
    dataIndex: "fault_code",
    key: "fault_code"
  },
  {
    title: "故障名称",
    dataIndex: "fault_name",
    key: "fault_name"
  },
  {
    title: "发生时间",
    dataIndex: "fault_time",
    key: "fault_time"
  },
  {
    title: "状态",
    dataIndex: "fault_status",
    key: "fault_status",
    scopedSlots: {
      customRender: "fault_status"
    }
  }
];

export default {
  name: "HistoryLife",

  components: {
    BreadNav
  },

  data() {
    return {
      // 面包屑导航
      breadNav: [{
        name: "历史故障",
        url: "/history-fault"
      }],

      // 表格数据
      loading: false,
      columns,
      tableData: [],
      pagination: {}
    }
  },

  mounted() {
    // 获取数据
    this.getData(1);
  },

  methods: {

    // 获取数据
    getData(paramPage) {

      // 加载动画
      this.loading = true;

      // 参数
      const param = {
        orderBy: "fault_time",
        order: "desc",
        pagination: 1,
        pageNo: paramPage,
        pageSize: 10,
        paramap: {
          train_type: "",
          fault_time: "2019-07-23 00:00:00,2019-07-23 23:59:59",
          line_name: "",
          train_no: "",
          fault_level: "",
          fault_name: "FUZZY_%%",
          train_coach: "",
          fault_code: "FUZZY_%%",
          fault_status: "",
          fault_type_group: ""
        }
      };

      // 请求接口
      get_history_fault_data(param).then(res => {
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
      this.pagination = pager;

      // 获取当前页面的数据
      this.getData(pager.current);
    }
  }
}
</script>
