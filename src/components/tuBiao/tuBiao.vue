<template>
    <section>
        <div class="hello">
            <div id="myChart" ></div>
        </div>
    </section>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

import {mapGetters, mapActions,mapState} from 'Vuex'
import { formatTime } from '@/utils/facility.js'
export default {
    props:['can'],
    data(){
        return{
            data:0,
            mShowData: [],
            isFirst: true,
            arr:null,
        }
    },
    watch:{
            dataList(val){
                this.arr = val.map((item,idx)=>{
                        return {x:this.formatTimees(item.Time), y: this.can == 'xy'?item.Oxygen : this.can == 'tw' ? item.Temp : this.can == 'bs'? item.StepNumber:item.Hr}
                })
                this.drawLine(this.arr)
            }

    },
    mounted(){
        this.loadType(this.can);
        this.drawLine()
    },
    computed:{
        ...mapGetters("healthyDetails", [
            "typeName",
            "dataList",
        ]),
    },
    methods:{
        formatTimees(val) {
            return formatTime(val* 1000)
        },
        ...mapActions("healthyDetails", [
        "loadType",
        ]),
        drawLine(dataes) {

        var xList = []
        var yList = []

        for (const key in dataes) {
            let item = dataes[key];
            xList.push(item.x);
            yList.push(item.y);
        }

        xList.reverse()
        yList.reverse()

        console.log(xList)
        console.log(yList)

        let myChart = echarts.init(document.getElementById('myChart'))

         myChart.setOption({
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                // text: '大数据量面积图',
            },
            legend: {
        data:['血氧','体温','步数','心率'],
        selected:true
    },
            // toolbox: {
            //     feature: {
            //         dataZoom: {
            //             yAxisIndex: 'none'
            //         },
            //         restore: {},
            //         saveAsImage: {}
            //     }
            // },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xList,
                axisLine:{
            lineStyle:{
                color:this.can == 'xy'?'#ff6659' : this.can == 'tw' ? '#06b699' : this.can == 'bs'? '#ff8810': '#7e7099',
            }
        }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                axisLine:{
            lineStyle:{
                color:this.can == 'xy'?'#ff6659' : this.can == 'tw' ? '#06b699' : this.can == 'bs'? '#ff8810': '#7e7099',
            }
        }
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 10
            }, {
                start: 0,
                end: 10,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            series: [
                {
                    name:this.can == 'xy'?'血氧' : this.can == 'tw' ? '体温' : this.can == 'bs'? '步数': '心率',
                    type:'line',
                    smooth:true,
                    symbol: 'none',
                    sampling: 'average',
                    // itemStyle: {
                    //     color: 'rgb(255, 70, 131)'
                    // },
                    // areaStyle: {
                    //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //         offset: 0,
                    //         color: 'rgb(255, 158, 68)'
                    //     }, {
                    //         offset: 1,
                    //         color: 'rgb(255, 70, 131)'
                    //     }])
                    // },
                    itemStyle: {
                        color:this.can == 'xy'?'#ff6659' : this.can == 'tw' ? '#06b699' : this.can == 'bs'? '#ff8810': '#7e7099',
                    },
                    areaStyle: {
                        color:this.can == 'xy'?'#ff6659' : this.can == 'tw' ? '#06b699' : this.can == 'bs'? '#ff8810': '#7e7099'
                    },
                    data:yList,
                    lineStyle:{
                        color:this.can == 'xy'?'#ff6659' : this.can == 'tw' ? '#06b699' : this.can == 'bs'? '#ff8810': '#7e7099'
                    },
                }
            ],
         })
    }
    }
}
</script>


<style lang="scss">
.has-gutter{
    .cell{
        color:#333333;
    }
}
.el-table__body{
    .el-table_2_column_11  {
        color:#00CF18!important;
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
.hello{
    width: 100%;
    height: 16.375rem;
}
#myChart{
    width: 100%;
    height: 16.375rem;
}
canvas{
        width: 100%!important;
        height: 16.375rem;
    }
</style>

