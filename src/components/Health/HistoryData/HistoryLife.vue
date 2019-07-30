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
          <span slot="precent" slot-scope="precent">
            <a-progress :percent="precent" size="small" />
          </span>
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script>
// 接口请求
import {
  get_history_life_data
} from "../../../api/train";

// 方法
let moment = require("moment");

// 组件
import BreadNav from "../../Common/BreadNav";

// 表头
const columns = [{
    title: "车型",
    dataIndex: "trainType",
    key: "trainType"
  },
  {
    title: "车号",
    dataIndex: "trainNo",
    key: "trainNo"
  },
  {
    title: "车厢",
    dataIndex: "trainCoach",
    key: "trainCoach"
  },
  {
    title: "设备名称",
    dataIndex: "partName",
    key: "partName"
  },
  {
    title: "器件使用量",
    dataIndex: "usage",
    key: "usage"
  },
  {
    title: "更新时间",
    dataIndex: "serviceTime",
    key: "serviceTime"
  },
  {
    title: "寿命报警状态",
    dataIndex: "precent",
    key: "precent",
    scopedSlots: {
      customRender: "precent"
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
        name: "历史寿命",
        url: "/history-life"
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
        order: "desc",
        pageNo: paramPage,
        orderBy: "update_time",
        pageSize: 10,
        paramap: {
          lineNo: "",
          trainNo: [],
          partName: "",
          trainType: "",
          trainCoach: "",
          lifelevel: "2",
          fromTime: 1532317367000,
          toTime: 1563853367000
        }
      };

      // 请求接口
      get_history_life_data(param).then(res => {
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

            // 时间戳转换
            item.serviceTime = moment(item.serviceTime).format("YYYY-MM-DD HH:mm:ss");

            // 使用情况
            item.usage = item.serviceValue + " / " + item.qualityValue + " (次) ";
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
