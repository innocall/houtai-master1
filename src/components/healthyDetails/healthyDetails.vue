<template>
  <section class="healthyDetails-container">
    <div class="top-container">
      <div class="left-box">
        <i class="iconfont iconziyuan10"></i>
      </div>
      <div class="right-box">
        <p class="name">{{userXinxi.TrueName}}</p>
        <p>{{userXinxi.Mobile}}</p>
        <p>设备信息SN码：{{userXinxi.IdCard}}{{userXinxi.Marry==1?'（在线）':'（不在线）'}}</p>
      </div>
    </div>
    <ul class="ul-box">
        <li @click="dianji(1)">
            <span :class="{colors:num==1}">血氧</span>
        </li>
        <li @click="dianji(2)">
            <span :class="{colors:num==2}">体温</span>
        </li>
        <li @click="dianji(3)">
            <span :class="{colors:num==3}">步数</span>
        </li>
        <li @click="dianji(4)">
            <span :class="{colors:num==4}">心率</span>
        </li>
        <li @click="dianji(5)">
            <span :class="{colors:num==5}">移动轨迹</span>
        </li>
    </ul>
    <table>
      <thead>
        <tr>
          <th>时间</th>
          <th v-if="num == 1">血氧（SaO2）</th>
          <th v-if="num == 2">体温(℃)</th>
          <th v-if="num == 3">步数(步)</th>
          <th v-if="num == 4">心率（次/分）</th>
          <th v-if="num == 5">位置</th>
          <th>数据来源</th>
          <th v-if="num == 1||num == 2||num == 4">状态</th>
          <th>设备型号</th>
          <th>设备厂商</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in dataList" :key="index">
          <td>{{formatTimees(item.Time)}}</td>
          <td v-if="num == 1">{{item.Oxygen}}</td>
          <td v-if="num == 2">{{item.Temp}}</td>
          <td v-if="num == 3">{{item.StepNumber}}</td>
          <td v-if="num == 4">{{item.Hr}}</td>
          <td v-if="num == 5">{{list}}</td>
          <td>设备上传</td>
          <td v-if="num == 1||num == 2||num == 4" class="zc">正常</td>
          <td>WIM</td>
          <td>凌盟</td>
        </tr>
      </tbody>
    </table>
    <Map v-if="show== 5"></Map>
    <section class="tubiao-box" v-if="show!= 5">
      <p class="tu-title">走势图</p>
      <TuBiao v-if="show!= 5" :can="type"></TuBiao>
    </section>
  </section>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

import { formatTime } from "@/utils/facility.js";
import TuBiao from "../tuBiao/tuBiao";
import Map from "../Map/Map";

import { mapGetters, mapActions, mapState } from "Vuex";
import List from "../list/list";
export default {
  components: {
    TuBiao,
    Map,
    List
  },
  data() {
    return {
      show: 0,
      activeName: "first",
      tableData: [
        {
          date: "2019-03-18 16:30:00",
          xueyang: 95,
          laiyuan: "设备上传",
          stauts: "正常",
          shebie: "WIM"
        },
        {
          date: "2019-03-18 16:30:00",
          xueyang: 95,
          laiyuan: "设备上传",
          stauts: "正常",
          shebie: "WIM"
        },
        {
          date: "2019-03-18 16:30:00",
          xueyang: 95,
          laiyuan: "设备上传",
          stauts: "正常",
          shebie: "WIM"
        },
        {
          date: "2019-03-18 16:30:00",
          xueyang: 95,
          laiyuan: "设备上传",
          stauts: "正常",
          shebie: "WIM"
        }
      ],

      type: "",
      num: 0,
      isbian: false,
      jing: null,
      wei: null
    };
  },
  watch: {},
  computed: {
    ...mapGetters("healthyDetails", [
      "typeName",
      "dataList",
      "locationDataList",
      "list",
      'userXinxi'
    ])
  },
  mounted() {
    this.num = 1;
    this.type = "xy";
    this.loadType(this.type);
    this.loadData();
    console.log(this.userXinxi,'111');
  },
  methods: {
    formatTimees(val) {
      return formatTime(val * 1000);
    },
    ...mapActions("healthyDetails", ["loadData", "loadType", "getAddressList"]),
   
    dianji(num) {
      if (num == 1) {
        this.num = 1;
        this.type = "xy";
        this.loadType(this.type);
        this.loadData();
        this.show = 0;
      } else if (num == 2) {
        this.num = 2;
        this.type = "tw";
        this.loadType(this.type);
        this.loadData();
        this.show = 0;
      } else if (num == 3) {
        this.num = 3;
        this.type = "bs";
        this.loadType(this.type);
        this.loadData();
        this.show = 0;
      } else if (num == 4) {
        this.num = 4;
        this.type = "xl";
        this.loadType(this.type);
        this.loadData();
        this.show = 0;
      } else if (num == 5) {
        this.num = 5;
        this.show = 5;
        this.type = "loc";
        this.loadType(this.type);
        this.loadData();
        this.isbian = true;
      }
    },
  }
};
</script>

<style lang="scss">
.el-main {
  background: #fff !important;
}
.healthyDetails-container {
  width: 100%;
  .top-container {
    display: flex;
    align-items: center;
    background: #f2f2f2;
    padding: 1.6875rem 3.125rem;
    .left-box {
      width: 7.875rem;
      height: 7.875rem;
      margin-right: 0.625rem;
      i {
        font-size: 7.875rem;
        color: #dadada;
      }
    }
    .right-box {
      p:nth-child(2) {
        margin-top: 1.0625rem;
      }
      p:nth-child(3) {
        margin-top: 0.9375rem;
      }
      p {
        font-size: 1rem;
      }
      .name {
        font-size: 1rem;
        color: #000;
        font-weight: bold;
      }
    }
  }
  .ul-box{
      width: 100%;
      padding: 1.5625rem 1.75rem;
      li{
          width: 6.25rem;
           cursor: pointer ;
            span{
                font-size: 0.875rem;
                padding: 0.625rem 1.25rem;
            }
            .colors{
                color:#0163FC;
                border-bottom: 0.125rem solid #0163FC;
            }
      }
  }
  .tu-title {
    margin: 1.4375rem 0rem 0.9375rem 0rem;
    color: #333333;
    font-size: 0.875rem;
    font-weight: bold;
  }
  table {
    width: 100%;
    thead {
      width: 100%;
      tr {
        width: 100%;
        height: 2.5rem;
        th {
          width: 16%;
        }
      }
    }
    tbody {
      width: 100%;
      tr {
        width: 100%;
        height: 2.5rem;
        td {
         width: 16%;
          text-align: center;
          border-bottom: 0.0625rem solid #dfe6ec;
        }
        .zc{
            color: #00CF18;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.cell {
  text-align: center;
}
.has-gutter {
  .cell {
    color: #333333;
  }
}
.el-table__body {
  .el-table_2_column_11 {
    color: #00cf18 !important;
  }
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  width: 100%;
  height: 16.375rem;
}
#myChart {
  width: 100%;
  height: 16.375rem;
  // padding-top: 0.625rem;
}
canvas {
  width: 100%;
  height: 16.375rem;
}
</style>

