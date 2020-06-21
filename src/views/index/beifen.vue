<template>
  <section class="index-container">
    <div class="bg-container">
      <div class="botton-container">
        <router-link tag="div" to="/bgIndex" class="container" v-if="isShow">
          <div class="chevron"></div>
          <div class="chevron"></div>
          <div class="chevron"></div>
          <span class="text">点击进入全屏</span>
        </router-link>
        <router-link tag="div" to="/index" class="container" v-if="!isShow">
          <div class="chevron"></div>
          <div class="chevron"></div>
          <div class="chevron"></div>
          <span class="text">点击返回小屏</span>
        </router-link>
      </div>
      <section class="index-box">
        <!-- 左 -->
        <div class="left-container">
          <div class="zuo-ce-top">
            <div class="top-bg">
              <span class="left-span">在线数据</span>
              <span class="right-span">单位：人</span>
            </div>
            <p class="num-p">{{userData.count||0}}</p>
            <div class="bottom-box">
              <div class="left-bg">
                <p>{{userData.count||0}}</p>
                <p>在线用户</p>
              </div>
              <div class="center-bg">
                <p>{{userData.countsNo||0}}</p>
                <p>离线用户</p>
              </div>
              <div class="right-bg">
                <p>{{userData.countYes||0}}</p>
                <p>活跃用户</p>
              </div>
            </div>
          </div>
          <div class="zuo-ce-bottom">
            <div class="top-bg">
              <span class="left-span">异常动态</span>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="待处理" name="first">
                <ul class="ul-container">
                  <!-- <li class="line-li" v-for="item in 7">
                    <span class="left-text">用户张文豪数据异常</span>
                    <span class="center-text">20分钟前</span>
                    <span class="right-text">【待处理】</span>
                  </li> -->
                  <li class="no-data">
                    <img src="../../../static/imgs/index/no.png" alt />
                    暂无待处理数据
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="已处理" name="second">
                <ul class="ul-container">
                  <!-- <li class="line-li" v-for="item in 7">
                    <span class="left-text">用户张文豪数据正常</span>
                    <span class="center-text">18分钟前</span>
                    <span class="right-text">【已处理】</span>
                  </li> -->
                  <li class="no-data">
                    <img src="../../../static/imgs/index/no.png" alt />
                    暂无已处理数据
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <!-- 左 -->
        <!-- 中 -->
        <div class="center-container">
          <div class="center-box">
            <div class="top-bg">
              <span class="left-span">人员定位</span>
            </div>
            <!-- <div class="bottom-bg">
              <img src="../../../static/imgs/index/dw.png" alt />
              <span class="left-span">用户数据异常</span>
            </div> -->
            <div id="allmap"></div>
          </div>
        </div>
        <!-- 中 -->
        <!-- 右 -->
        <div class="right-container">
          <div class="you-ce-top">
            <div class="top-bg">
              <span class="left-span">用户数据展示</span>
              <span class="right-span" v-if="userInfo.title">名字：{{userInfo.title||title}}</span>
            </div>
            <p class="item-p">
              <span v-if="userInfo.UpdateTime">最后一次更新时间：{{userInfo.UpdateTime}}</span>
            </p>
            <ul>
              <li>
                <div class="left-div">
                  <img src="../../../static/imgs/index/xy.png" alt />
                  <div class="text-div">
                    <span>血氧平均值</span>
                    <span>Sao2</span>
                  </div>
                </div>
                <span class="num-span">{{userInfo.Oxygen||Oxygen}}</span>
              </li>
              <li>
                <div class="left-div">
                  <img src="../../../static/imgs/index/xl.png" alt />
                  <div class="text-div">
                    <span>心率平均值</span>
                    <span>次/分</span>
                  </div>
                </div>
                <span class="num-span">{{userInfo.Hr||Hr}}</span>
              </li>
              <li>
                <div class="left-div">
                  <img src="../../../static/imgs/index/tw.png" alt />
                  <div class="text-div">
                    <span>体温平均值</span>
                    <span>℃</span>
                  </div>
                </div>
                <span class="num-span">{{userInfo.Temp||Temp}}</span>
              </li>
              <li>
                <div class="left-div">
                  <img src="../../../static/imgs/index/bs.png" alt />
                  <div class="text-div">
                    <span>步数平均值</span>
                    <span>步</span>
                  </div>
                </div>
                <span class="num-span">{{userInfo.StepNumber||StepNumber}}</span>
              </li>
            </ul>
          </div>
          <div class="you-ce-bottom">
            <div class="top-bg">
              <span class="left-span">用户健康档案</span>
            </div>
            <div class="text-container">
              <p>用户病例</p>
              <div
                class="text-box"
              >患者一周前开始渐感乏力，尤以活动后明显，饮食减少，无恶心及呕吐，感胃胀不适，无咳嗽及发热，无头昏头痛，感腹胀不适，尿量较少，在外未作任何治疗，今到本院就诊，门诊以"肝硬化失代偿"收入住院。</div>
            </div>
            <div class="text-container">
              <p>用药历史</p>
              <div class="text-box">
                乌苯美司胶囊（百士欣)
                亚砷酸注射液
                依托泊甙软胶囊
              </div>
            </div>
          </div>
        </div>
        <!-- 右 -->
      </section>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "Vuex";
export default {
  data() {
    return {
      activeName: "first",
      arr: [],
      isShow: true,
      Oxygen: 0, //血氧
      Hr: 0, //心率
      Temp: 0, //体温
      StepNumber: 0, // 步数
      userInfo:{},
      title:'',
      UpdateTime:'',
    };
  },
  computed: {
    ...mapGetters("msite", ["dingwei", "userData"])
  },
  watch: {
    dingwei(val) {
      val.map((item, idx) => {
        if (item.Longitude && item.Latitude) {
          this.arr.push({
            title: item.iem_user_name,
            point: item.Longitude + "," + item.Latitude,
            address: item.address,
            tel: item.iem_user_phone,
            Oxygen: item.Oxygen,
            Hr: item.Hr,
            Temp: item.Temp,
            StepNumber: item.StepnNmber,
            UpdateTime: item.UpdateTime
          });
        }
      });
      if(val){
        this._map();
      }
    },
  },
  mounted() {
    this.loadPost();
    var urlName = window.location.href;
    if (urlName.indexOf("bgIndex") >= 0) {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
    if(localStorage.getItem('userInfo')){
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    }
    this.UpdateTime = localStorage.getItem('UpdateTime');
  },
  methods: {
    ...mapActions("msite", ["loadPost"]),
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    _map() {
      let vm = this;
      // var markerArr = [
      //                   { title: "名称：广州火车站", point: "113.264531,23.157003", address: "广东省广州市广州火车站", tel: "12306" },
      //                   { title: "名称：广州塔（赤岗塔）", point: "113.330934,23.113401", address: "广东省广州市广州塔（赤岗塔） ", tel: "18500000000" },
      //                   { title: "名称：广州动物园", point: "113.312213,23.147267", address: "广东省广州市广州动物园", tel: "18500000000" },
      //                   { title: "名称：天河公园", point: "113.372867,23.134274", address: "广东省广州市天河公园", tel: "18500000000" }

      //               ];
      var map = new BMap.Map("allmap"); // 创建Map实例
      var point = new BMap.Point(114.061174, 22.550313); //地图中心点，深圳市
      map.centerAndZoom(point, 13); // 初始化地图,设置中心点坐标和地图级别。
      // var point = new BMap.Point(116.300784,39.936404);
      // map.centerAndZoom(point, 6);
      map.enableScrollWheelZoom(true); //启用滚轮放大缩小
      //向地图中添加缩放控件
      var ctrlNav = new window.BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE
      });
      map.addControl(ctrlNav);

      //向地图中添加缩略图控件
      var ctrlOve = new window.BMap.OverviewMapControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        isOpen: 1
      });
      map.addControl(ctrlOve);

      //向地图中添加比例尺控件
      var ctrlSca = new window.BMap.ScaleControl({
        anchor: BMAP_ANCHOR_BOTTOM_LEFT
      });
      map.addControl(ctrlSca);

      var point = new Array(); //存放标注点经纬信息的数组
      var marker = new Array(); //存放标注点对象的数组
      var info = new Array(); //存放提示信息窗口对象的数组
      for (let i = 0; i < this.arr.length; i++) {
        var p0 = this.arr[i].point.split(",")[0]; //
        var p1 = this.arr[i].point.split(",")[1]; //按照原数组的point格式将地图点坐标的经纬度分别提出来
        point[i] = new window.BMap.Point(p0, p1); //循环生成新的地图点
        marker[i] = new window.BMap.Marker(point[i]); //按照地图点坐标生成标记
        map.addOverlay(marker[i]);
        marker[i].setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        var label = new window.BMap.Label(this.arr[i].title, {
          offset: new window.BMap.Size(20, -10)
        });
        marker[i].setLabel(label);
        info[i] = new window.BMap.InfoWindow("<p style=’font-size:12px;lineheight:1.8em;’>" + "</br>名字：" + this.arr[i].title + "</br>地址：" + this.arr[i].address + "</br> 电话：" + this.arr[i].tel + "</br></p>"); // 创建信息窗口对象
        marker[i].addEventListener("mouseover", function() {
          this.openInfoWindow(info[i]);
        });
        marker[i].addEventListener("click", function() {
          vm.Oxygen = vm.arr[i].Oxygen;
          vm.Hr = vm.arr[i].Hr;
          vm.Temp = vm.arr[i].Temp;
          vm.StepNumber = vm.arr[i].StepNumber;
          vm.UpdateTime = vm.arr[i].UpdateTime
          vm.title = vm.arr[i].title
          localStorage.setItem('userInfo', JSON.stringify(vm.arr[i]));
          vm.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        });
      }
      map.setMapStyle({ style: "midnight" });
    }
  }
};
</script>

<style lang="scss" scoped>
.index-container {
  width: 100%;
  min-width: 75rem;
  height: 67.5rem;
  .bg-container {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../../../static/imgs/index/BG.png) no-repeat;
    background-size: 100% 100%;
    .botton-container {
      display: flex;
      justify-content: center;
      .container {
        display: flex;
        justify-content: center;
        position: relative;
        width: 6.25rem;
        height: 5.625rem;
      }
      .chevron {
        position: absolute;
        width: 28px;
        height: 8px;
        opacity: 0;
        transform: scale3d(0.5, 0.5, 0.5);
        animation: move 3s ease-out infinite;
      }
      .chevron:first-child {
        animation: move 3s ease-out 1s infinite;
      }
      .chevron:nth-child(2) {
        animation: move 3s ease-out 2s infinite;
      }
      .chevron:before,
      .chevron:after {
        content: " ";
        position: absolute;
        top: 0;
        height: 100%;
        width: 51%;
        background: #fff;
      }
      .chevron:before {
        left: 0;
        transform: skew(0deg, 30deg);
      }
      .chevron:after {
        right: 0;
        width: 50%;
        transform: skew(0deg, -30deg);
      }
      @keyframes move {
        25% {
          opacity: 1;
        }
        33% {
          opacity: 1;
          transform: translateY(30px);
        }
        67% {
          opacity: 1;
          transform: translateY(40px);
        }
        100% {
          opacity: 0;
          transform: translateY(55px) scale3d(0.5, 0.5, 0.5);
        }
      }
      .text {
        position: absolute;
        top: 4.0625rem;
        left: 2.8125rem;
        display: block;
        // margin-top: 75px;
        margin-left: -1.875rem;
        font-family: "Helvetica Neue", "Helvetica", Arial, sans-serif;
        font-size: 0.75rem;
        color: #fff;
        text-transform: uppercase;
        white-space: nowrap;
        opacity: 0.25;
        animation: pulse 2s linear alternate infinite;
      }
      @keyframes pulse {
        to {
          opacity: 1;
        }
      }
    }
    .index-box {
      position: absolute;
      top: 6.25rem;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      width: 100%;
      .left-container,
      .right-container,
      .center-container {
        width: 30%;
        height: 100%;
        color: #fff;
        padding-left: 0.9375rem;
        .zuo-ce-top,
        .zuo-ce-bottom,
        .you-ce-top,
        .you-ce-bottom,
        .center-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          height: 19.8125rem;
          border: 0.0625rem solid #0668ba;
          border-radius: 0.125rem;
          .top-bg,
          .bottom-bg {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 95%;
            height: 4.25rem;
            background: url(../../../static/imgs/index/zuo.png) no-repeat;
            background-size: 100% 100%;
            margin-top: 14px;
            .left-span {
              font-size: 1.125rem;
              margin-left: 0.625rem;
            }
            .right-span {
              font-size: 1.125rem;
              margin-right: 1.25rem;
            }
          }
          .num-p {
            font-size: 3.375rem;
            color: #ff9c00;
            font-weight: bold;
            letter-spacing: 0.25rem;
            margin: 2.25rem 0rem 1.8125rem 0rem;
          }
          .bottom-box {
            display: flex;
            width: 100%;
            height: 100%;
            div {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
              flex: 1;
              margin: 0rem 0.9375rem;
              p:nth-child(1) {
                margin-top: 0.625rem;
                font-size: 1.5rem;
                color: #ff9c00;
              }
              p:nth-child(2) {
                margin-bottom: 1.25rem;
                font-size: 1.125rem;
              }
            }
            .left-bg {
              height: 6.875rem;
              background: url(../../../static/imgs/index/bao.png) no-repeat;
              background-size: 100% 100%;
            }
            .center-bg {
              height: 6.875rem;
              background: url(../../../static/imgs/index/bao.png) no-repeat;
              background-size: 100% 100%;
            }
            .right-bg {
              height: 6.875rem;
              background: url(../../../static/imgs/index/bao.png) no-repeat;
              background-size: 100% 100%;
            }
          }
        }
        .zuo-ce-bottom {
          height: 38.5625rem;
          margin-top: 1.25rem;
          .top-bg {
            height: 2.125rem;
          }
          .ul-container {
            width: 100%;
            height: 100%;
            .line-li{
              display: flex;
              align-items: flex-end;
              width: 100%;
              height: 3.25rem;
              border-bottom: 0.0625rem solid #134083;
              padding-bottom: 0.6875rem;
              .left-text {
                width: 50%;
              }
              .center-text {
                width: 30%;
              }
              .right-text {
                width: 20%;
              }
            }
            .no-data{
              width: 100%;
              min-height: 31.25rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-size: 1.25rem;
              letter-spacing: 0.125rem;
            }
          }
        }
      }
      .center-container {
        position: relative;
        width: 50%;
        height: 59.6875rem;
        color: #fff;
        padding: 0rem 0.9375rem;
        .center-box {
          width: 100%;
          height: 100%;
          border: 0.0625rem solid #0668ba;
          .top-bg {
            z-index: 999999;
            position: absolute;
            top: 0;
            left: 1.5625rem;
            right: 1.25rem;
            height: 2.125rem;
            opacity: 0.9;
          }
          .bottom-bg {
            display: flex;
            justify-content: center;
            z-index: 99999999;
            position: absolute;
            top: 2.6875rem;
            left: 1.5625rem;
            right: 1.25rem;
            width: 11.25rem;
            height: 2.8125rem;
            background: url(../../../static/imgs/index/yichang.png) no-repeat;
            background-size: 100% 100%;
            opacity: 0.9;
            img {
              width: 0.9375rem;
              height: 1.3125rem;
            }
            span {
              margin-left: none;
              font-size: 0.9375rem;
            }
          }
        }
      }
      .right-container {
        width: 20%;
        height: 100%;
        color: #fff;
        padding-right: 0.9375rem;
        padding-left: 0rem;
        .you-ce-top {
          width: 100%;
          height: 30rem;
          border: 0.0625rem solid #0668ba;
          .top-bg {
            height: 2.125rem;
          }
          .item-p {
            width: 100%;
            height: 1.1875rem;
            font-size: 0.875rem;
            text-align: left;
            padding-left: 1.25rem;
            margin-top: 0.6875rem;
          }
          ul {
            width: 100%;
            li {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 6.25rem;
              margin: 0rem 1.5625rem;
              border-bottom: 0.0625rem solid #0668ba;
              .left-div {
                display: flex;
                align-items: center;
                img {
                  width: 3.875rem;
                  height: 3.875rem;
                }
                .text-div {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  margin-left: 1rem;
                  font-size: 1.125rem;
                }
              }
              .num-span {
                font-size: 1.875rem;
                color: #ff9c00;
              }
            }
          }
          li:nth-child(4) {
            border-bottom: none;
          }
        }
        .you-ce-bottom {
          width: 100%;
          height: 28.125rem;
          border: 0.0625rem solid #0668ba;
          margin-top: 1.375rem;
          .top-bg {
            height: 2.125rem;
          }
          .text-container {
            width: 100%;
            p {
              width: 88%;
              padding: 0.6875rem 0.5625rem;
              margin: 0 auto;
              border-bottom: 0.0625rem solid #0668ba;
            }
            .text-box {
              width: 88%;
              line-height: 1.5625rem;
              margin: 0 auto;
              margin-top: 0.5625rem;
              padding-bottom: 1.875rem;
              border-bottom: 0.0625rem solid #0668ba;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.el-tabs {
  width: 100%;
}
.el-tabs__nav-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 10.25rem;
  height: 0.0625rem;
  background-color: #2175ae;
  z-index: 1;
}
.el-tabs__item {
  color: #ccc;
}
#tab-first {
  padding-left: 1.25rem;
}
#tab-second {
  padding-right: 1.25rem;
}
.el-tabs__item.is-active {
  color: #fff;
}
.el-tabs__active-bar {
  color: #2175ae;
  width: 5.125rem !important;
  position: absolute;
  bottom: 0;
  left: -1.25rem;
  height: 0.125rem;
  background-color: #409eff;
  z-index: 1;
}
#pane-first {
  padding: 0px 15px !important;
}
.map-box {
  width: 100%;
  height: 100%;
  .map {
    width: 100%;
    height: 100%;
    span {
      display: none;
    }
  }
}
.anchorBL {
  img {
    display: none;
  }
}
</style>
<style type="text/css">
body,
html,
#allmap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";
}
#l-map {
  height: 100%;
  width: 78%;
  float: left;
  border-right: 2px solid #bcbcbc;
}
#r-result {
  height: 100%;
  width: 20%;
  float: left;
}
.el-tab-pane{
  padding:0rem 0.9375rem;
}
.el-tabs__header{
  padding-left: 0.9375rem;
}
.BMap_cpyCtrl{
    display: none;
}
</style>
