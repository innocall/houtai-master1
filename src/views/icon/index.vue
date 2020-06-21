<template>
  <div class="deviceList">
    <h3>设备列表</h3>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px">
      <el-form-item label="设备类型ID">
        <el-input v-model="formInline.user" style="width: 120px"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="formInline.user" style="width: 120px"></el-input>
      </el-form-item>
      <el-form-item label="用户姓名">
        <el-input v-model="formInline.user" style="width: 120px"></el-input>
      </el-form-item>
      <el-form-item label="发送方式">
        <el-select v-model="formInline.region" placeholder="请选择" style="width: 120px">
          <el-option label="全部" value="shanghai"></el-option>
          <el-option label="免费" value="beijing"></el-option>
          <el-option label="付费" value="fufei"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备状态">
        <el-select v-model="formInline.region" placeholder="请选择" style="width: 120px">
          <el-option label="全部" value="shanghai"></el-option>
          <el-option label="已佩戴" value="beijing"></el-option>
          <el-option label="未佩戴" value="weipeidai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="在线状态">
        <el-select v-model="formInline.region" placeholder="全部" style="width: 120px">
          <el-option label="全部" value="shanghai"></el-option>
          <el-option label="在线" value="beijing"></el-option>
          <el-option label="未上线" value="lixian"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-bottom:22px">
      <el-button icon="iconfont iconmimazhongzhi">重置</el-button>
      <el-button icon="iconfont icontianjia">批量设置</el-button>
      <el-button icon="iconfont icondaochu1">导出</el-button>
      <el-button @click="centerDialogVisible  = true">设备开通</el-button>
    </div>
    <el-dialog title="设备开通" :visible.sync="centerDialogVisible" center>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="120px">
        <el-form-item label="使用机构">
          <el-select v-model="formInline.region" style="width: 160px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="formInline.user" style="width: 160px"></el-input>
        </el-form-item>
        <el-form-item label="负责人联系电话">
          <el-input v-model="formInline.user" style="width: 160px"></el-input>
        </el-form-item>
        <el-form-item label="设备大类" :required="true">
          <el-select v-model="formInline.region" placeholder="健康设备" style="width: 160px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型" :required="true">
          <el-select v-model="formInline.region" placeholder="智能手表" style="width: 160px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备型号" :required="true">
          <el-select v-model="formInline.region" style="width: 160px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备标识ID" :required="true">
          <el-input v-model="formInline.user" style="width: 160px"></el-input>
        </el-form-item>
        <el-form-item label="SIM卡号" :required="true">
          <el-input v-model="formInline.user" style="width: 160px"></el-input>
        </el-form-item>
        <el-form-item label="设备序列号">
          <el-input v-model="formInline.user" style="width: 160px"></el-input>
        </el-form-item>
        <el-form-item label="发送方式" style="width:280px" :required="true">
          <el-radio v-model="radio" label="1">购买</el-radio>
          <el-radio v-model="radio" label="2">免费</el-radio>
        </el-form-item>
        <el-form-item label="服务费用（元）">
          <el-input v-model="formInline.user" style="width: 160px"></el-input>
        </el-form-item>
        <el-form-item label="支付方式" :required="true">
          <el-select v-model="formInline.region" placeholder="现金" style="width: 160px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">保存</el-button>
        <el-button @click="centerDialogVisible = false">返回</el-button>
      </span>
    </el-dialog>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="index" width="30"></el-table-column>
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column :formatter="defaultValue" prop="DeviceIdentity" label="设置标志ID"></el-table-column>
      <el-table-column :formatter="defaultValue" prop="DeviceType" label="设备类型"></el-table-column>
      <el-table-column :formatter="defaultValue" prop="Category" label="设备属性" show-overflow-tooltip></el-table-column>
      <el-table-column :formatter="defaultValue" prop="Sim" label="SIM卡号" show-overflow-tooltip></el-table-column>
      <el-table-column :formatter="defaultValue" prop="userinfo.TrueName" label="用户姓名" show-overflow-tooltip></el-table-column>
      <el-table-column :formatter="grantValue" prop="Grant" label="发放方式" show-overflow-tooltip></el-table-column>
      <el-table-column :formatter="defaultValue" prop="Sim" label="联系方式" show-overflow-tooltip></el-table-column>
      <el-table-column :formatter="defaultValue" prop="CreateTime" label="开通时间" show-overflow-tooltip></el-table-column>
      <el-table-column :formatter="onlineValue" property="Online" label="在线状态" show-overflow-tooltip></el-table-column>
      <el-table-column :formatter="wearValue" prop="Wear" label="设备状态" show-overflow-tooltip></el-table-column>
      <el-table-column :formatter="defaultValue" fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text">设置设备</el-button>
          <el-button type="text" style="color:#EF0303">停用</el-button>
          <el-button type="text" style="color:#333">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      postUrl: "http://watch.hualinginfo.com/index/admin/deviceList",
      // 默认显示第几页
      currentPage: 1,
      param: {},
      pageSize: 20,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [1, 2, 3, 4],
      // 默认每页显示的条数（可修改）
      PageSize: 1,
      // 总数据
      tableData: [
      ],
      formInline: {
        user: "",
        region: ""
      },
      radio: "1",
      centerDialogVisible: false
    };
  },
  created: function() {
    this.init();
  },
  methods: {
    init() {
      let that = this;
      let param = this.param;
      param["page"] = 1;
      result = this.post(this.postUrl, this.param, function(res) {
        that.tableData = res.data.data;
        that.totalCount = res.data.count;
      });
    },
      handleCurrentChange(val) {
      let that = this;
      let param = this.param;
      param["page"] = val;
      result = this.post(this.postUrl, this.param, function(res) {
        that.tableData = res.data.data;
        that.totalCount = res.data.count;
      });
    },
    defaultValue(row, column, cellValue){
      if (typeof cellValue === 'undefined' || cellValue === '') {
        return "暂时数据";
      } else{
        return cellValue;
      }
    },
    
    grantValue(row, column, cellValue){
  if(cellValue == 1){
        return "付费";
      }else{
return "免费";
      }
    },
     wearValue(row, column, cellValue){
  if(cellValue == 1){
        return "佩戴中";
      }else{
return "未佩戴";
      }
    },
    onlineValue(row, column, cellValue) {
      if (!cellValue) {
        return "不在线";
      } else if (cellValue == 1) {
        return "在线";
      } else {
        return "不在线";
      }
    },
    post(url, data, callback) {
      return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
          "content-type": "application/json"
        },
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer" // *client, no-referrer
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(res) {
          typeof callback == "function" && callback(res);
        }); // parses response to JSON
    }
  }
};
</script>

<style lang="scss">
.deviceList {
  h3 {
    background: #eef1f6;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    margin-bottom: 22px;
  }
  .el-table {
    margin-bottom: 22px;
  }
  /deep/ .el-table th.is-leaf {
    background: #eef1f6;
    font-weight: bold;
    color: #333333;
    text-align: center;
  }
  /deep/ .el-table__row td {
    text-align: center;
  }
  /deep/ .el-table__row td:nth-child(1) {
    background: #eef1f6;
  }
  /deep/ .iconmimazhongzhi:before {
    color: #e6050a;
    margin-right: 4px;
  }
  /deep/ .icontianjia:before {
    color: #17891d;
    margin-right: 4px;
  }
  /deep/.icondaochu1:before {
    color: #0163fc;
    margin-right: 4px;
  }
}
.el-pagination {
  text-align: right;
}
</style>
