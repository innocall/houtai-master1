<template>
  <div class="management">
    <el-form ref="article" :model="article" label-width="80px">
      <el-form-item label="用户信息">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button type="primary">搜索</el-button>
      </el-form-item>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="TrueName" label="姓名" width="180"></el-table-column>
        <el-table-column prop="Mobile" label="手机号码" width="180"></el-table-column>
        <el-table-column :formatter="defaultValue" prop="Oxygen" label="血氧（SaO2）" width="180"></el-table-column>
        <el-table-column :formatter="defaultValue" prop="Hr" label="心率（次/分）" width="180"></el-table-column>
        <el-table-column :formatter="defaultValue" prop="Temp" label="体温（摄氏度）" width="180"></el-table-column>
        <el-table-column :formatter="defaultValue" prop="StepNumber" label="步数（步）"></el-table-column>
        <el-table-column :formatter="defaultValue" prop="Address" label="定位"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="_jump(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>

    <!-- <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="85%"
      center>
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
      <HealthyDetails></HealthyDetails>
    </el-dialog> -->

  </div>
</template>

<script>
// import HealthyDetails from "../../components/healthyDetails/healthyDetails";
export default {
  name: "addArticle",
  components:{
    // HealthyDetails
  },
  data() {
    return {
      postUrl: 'http://watch.hualinginfo.com/index/admin/healthInfoList',
      // 默认显示第几页
      currentPage: 1,
      param: {
        day: ''
      },
      pageSize: 10,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [1, 2, 3, 4],
      // 默认每页显示的条数（可修改）
      PageSize: 1,
        // 总数据
      tableData: [
      
      ],
      centerDialogVisible: false
    };
  },
  created(){
    this.init();
  },
  methods: {
        defaultValue(row, column, cellValue){

          // console.log(cellValue);
      if (typeof cellValue == 'undefined' || cellValue == '' || cellValue == 'null' || !cellValue) {
        return "暂无数据";
      } else{
        return cellValue;
      }
    },
    //初始化
    init(){
      let that = this;
      let param = this.param;
      param['page'] = 1;
    result = this.post(this.postUrl, this.param, function(res) {
      that.tableData = res.data.data;
      that.totalCount = res.data.count;
    });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      let that = this;
      let param = this.param;
      param['page'] = val;
      result = this.post(this.postUrl, this.param, function(res) {
      that.tableData = res.data.data;
      that.totalCount = res.data.count;
      
    });
    },
    _jump(one,two){
      this.$store.state.healthyDetails.userXinxi = two
      this.$router.push("/healthyDetails")
      // this.$router.push({path: '/healthyDetails', query: {cellValue: this.defaultValue()}})
    },

    post(url, data, callback){
     return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
      .then(function(response) {
    return response.json();
  })
  .then(function(res) {
    typeof callback == 'function' && callback(res);
  }); // parses response to JSON
    }
  }
};
</script>

<style scoped lang="scss">
.btn{
  width: 3.75rem;
  height: 1.75rem;
  border: 0.0625rem solid #999999;
  color:#333;
}
.management {
  .el-input {
    width: 200px;
  }
  /deep/ .el-table {
    border: 1px solid #EBEEF5;
    margin-bottom: 22px;
    thead th.is-leaf {
      background: #eef1f6;
      font-weight: bold;
      color: #333333;
      text-align: center;
    }
    .el-table__row td {
      text-align: center;
    }
  }
}
</style>
