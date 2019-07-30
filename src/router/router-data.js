// 登录和主模块
import RouterView from "@/components/Common/RouterView";
import Main from "@/components/Main";
import Login from "@/components/Login/Login";

// 实时监视
import Monitor from "@/components/Monitor/Monitor";
import MonitorDetail from "@/components/Monitor/MonitorDetail/MonitorDetail";

// 健康管理
import HealthRecords from "@/components/Health/HealthRecords/HealthRecords";
import HistoryFault from "@/components/Health/HistoryData/HistoryFault";
import HistoryLife from "@/components/Health/HistoryData/HistoryLife";

// 版本管理
import Version from "@/components/Version/Version";

// 权限校验
import Authorized from "@/components/Authorized/Authorized";

export default [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/login",
    name: "login",
    title: "登录",
    component: Login
  },
  {
    path: "/",
    title: "首页",
    component: Main,
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "实时监视",
          icon: "home"
        },
        component: Monitor
      },
      {
        path: "/monitorDetail/trainType=:traintype&trainNo=:trainno",
        name: "monitorDetail",
        meta: {
          title: "实时监视详情",
          icon: "home",
          hide: true
        },
        component: MonitorDetail
      },
      {
        path: "",
        name: "",
        meta: {
          title: "健康管理",
          icon: "coffee"
        },
        component: RouterView,
        children: [
          {
            path: "/health-records",
            name: "health-records",
            meta: {
              title: "健康档案",
              icon: "exception"
            },
            component: HealthRecords
          },
          {
            path: "",
            name: "",
            meta: {
              title: "历史数据查询",
              icon: "exception"
            },
            component: RouterView,
            children: [
              {
                path: "/history-fault",
                name: "history-fault",
                meta: {
                  title: "历史故障",
                  icon: "notification"
                },
                component: HistoryFault
              },
              {
                path: "/history-life",
                name: "history-life",
                meta: {
                  title: "历史寿命",
                  icon: "bulb"
                },
                component: HistoryLife
              }
            ]
          }
        ]
      },
      {
        path: "/version",
        name: "version",
        meta: {
          title: "版本管理",
          icon: "trophy"
        },
        component: Version
      },
      {
        path: "/authorized",
        name: "authorized",
        meta: {
          title: "权限控制",
          icon: "user"
        },
        component: Authorized
      }
    ]
  }
];
