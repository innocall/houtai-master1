<template>
  <div class="addArticle">
    <el-form ref="article" :model="article" label-width="80px">
      <el-form-item label="用户信息">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button type="primary">搜索</el-button>
      </el-form-item>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="Avatar" label="头像" width="180">
           <img :src="image"  width="60" height="60" style="border-radius: 50%;"/>
        </el-table-column>
        <el-table-column prop="TrueName" label="昵称" width="180"></el-table-column>
        <el-table-column prop="Mobile" label="手机号码" width="180"></el-table-column>
        <el-table-column :formatter="defaultValue" prop="state" label="账号状态" width="180"></el-table-column>
        <el-table-column prop="CreateTime" label="注册时间" width="180"></el-table-column>
        <el-table-column prop="LastLoginTime" label="最后登录时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>

<script>
import Markdown from "../../components/markdown/markdown-editor";
import initData from "../../markData.js";

export default {
  name: "addArticle",
  data() {
    return {
      postUrl: "http://watch.hualinginfo.com/index/admin/userInfoList",
      // 默认显示第几页
      image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559404451566&di=264f751e186e7bce9c162a93cd7f6711&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0106e858135099a84a0e282b5b62b5.jpg',
      currentPage: 1,
      param: {},
      tableData: [],
      pageSize: 20,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [1, 2, 3, 4],
      // 默认每页显示的条数（可修改）
      PageSize: 1
      // 总数据
    };
  },
  created: function() {
    this.init();
  },
  methods: {
    //获取用户数据
    // getListData() {
    //   axios.post('/health/index/admin/userInfoList', {
    //       }).then((response) => {
    //         let res = response.data;
    //         if (res.status == '0') {
    //           console.log('成功')
    //           this.tableData = response.data;
    //         } else {
    //           console.log('失败' + res.msg)
    //         }
    //       })
    // },
    //初始化
    //初始化
       defaultValue(row, column, cellValue){
      if (typeof cellValue === 'undefined' || cellValue === '') {
        return "启用";
      } else{
        return cellValue;
      }
    },
    init() {
      let that = this;
      let param = this.param;
      param["page"] = 1;
      result = this.post(this.postUrl, this.param, function(res) {
        that.tableData = res.data.data;
        that.totalCount = res.data.count;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
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
    _jump() {
      this.$router.push("/healthyDetails");
    },
    handleEdit() {
      console.log(11);
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
  },
  mounted() {}
};
</script>

<style scoped  lang="scss">
.subBtn {
  width: 100px;
  margin: 0 auto;
}
.addArticle {
  .el-input {
    width: 200px;
  }
}
.addArticle /deep/ .el-table {
  border: 1px solid #ebeef5;
  text-align: center;
  margin-bottom: 22px;
  .el-table__row td {
    text-align: center;
  }
}
.addArticle /deep/ .el-table thead th.is-leaf {
  background: #eef1f6;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  text-align: center;
}
.addArticle /deep/ .el-pagination {
  text-align: right;
}
</style>
