<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="维修" name="first">
        <el-button type="primary" @click="tocreate1(0)">添加</el-button>
        <hr />
        <!-- 水站表格 -->
        <el-table :data="tableData1" style="width: 100%" height="350">
          <el-table-column type="index" label="序号" width="180"></el-table-column>
          <el-table-column prop="name" label="维修名称" width="180"></el-table-column>
          <el-table-column prop="tel" label="维修电话" width="180"></el-table-column>
          <el-table-column prop="type" label="类型" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="tocreate1(scope.row.id)" plain>查看</el-button>
              <el-button type="danger" @click="todel(scope.row.id)" plain>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 水站表格结束 -->
      </el-tab-pane>
      <el-tab-pane label="维修评论" name="second">
        <!-- 水站评论 -->
        <template>
          <el-select v-model="value" placeholder="请选择" style="width: 80%" @change="changeshow">
            <el-option label="全部" value="0"></el-option>
            <el-option v-for="item in common" :key="item.value" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </template>
        <hr />
        <!-- 水站评论表格 -->
        <el-table :data="tableData2" style="width: 100%" height="350">
          <el-table-column type="index" label="序号" width="180"></el-table-column>
          <el-table-column prop="name" label="用户名称" width="180"></el-table-column>
          <el-table-column prop="content" label="评论内容" width="180"></el-table-column>
          <el-table-column prop="time" label="时间" width="180">
            <template slot-scope="scope">{{scope.row.time | timeFilter}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" @click="todel(scope.row.id)" plain>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 水站评论表格结束 -->
      </el-tab-pane>
    </el-tabs>
    <!-- 弹窗1 -->
    <el-dialog title="维修管理" :visible.sync="dialogFormVisible1">
      <el-form :model="repair">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="repair.name" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="评分" :label-width="formLabelWidth">
          <el-input
            v-model="repair.score"
            autocomplete="off"
            clearable
            min="0"
            max="5"
            type="number"
            @blur="scorere"
            placeholder="eg:0-5之间"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="repair.type" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="点赞数量" :label-width="formLabelWidth">
          <el-input
            v-model="repair.likeNum"
            autocomplete="off"
            clearable
            type="number"
            @blur="number(repair.likeNum)"
          ></el-input>
        </el-form-item>
        <el-form-item label="关注人数" :label-width="formLabelWidth">
          <el-input
            v-model="repair.readNum"
            autocomplete="off"
            clearable
            type="number"
            @blur="number(repair.readNum)"
          ></el-input>
        </el-form-item>
        <el-form-item label="商家地址" :label-width="formLabelWidth">
          <el-input v-model="repair.address" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="距离" :label-width="formLabelWidth">
          <el-input
            v-model="repair.len"
            autocomplete="off"
            clearable
            @blur="distancere"
            placeholder="eg:4.2km"
          ></el-input>
        </el-form-item>
        <el-form-item label="商家信息" :label-width="formLabelWidth">
          <el-input v-model="repair.info" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input
            v-model="repair.tel"
            autocomplete="off"
            clearable
            @blur="telre1"
            placeholder="eg:400-100-1111"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" v-if="npno==true" @click="create1" :disabled="disadd">添 加</el-button>
        <el-button type="primary" v-else @click="update" :disabled="disadd">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗结束 -->
    <!-- 删除弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>你确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="del">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹窗结束 -->
  </div>
</template>
<script>
import API from "../util/API";
import reg from "../util/reg";
export default {
  data() {
    return {
      activeName: "first",
      formLabelWidth: "120px",
      dialogVisible: false,
      tableData1: [],
      tableData2: [],
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      delid: "",
      repair: {
        address: "",
        info: "",
        len: "",
        likeNum: "",
        name: "",
        readNum: "",
        score: "",
        tel: "",
        type: ""
      },
      repairCommon: {
        userId: "",
        repairId: "",
        ava: "",
        name: "",
        content: "",
        time: ""
      },
      common: [],
      value: "0",
      nowtab: "",
      npno: true,
      disadd: true
    };
  },
  methods: {
    open4(data) {
      this.$message.error(data);
    },
    scorere() {
      this.disadd = true;
      if (!reg.score(this.repair.score)) {
        this.open4("分数为1-5之间");
      } else {
        this.disadd = false;
      }
    },
    distancere() {
      this.disadd = true;
      if (!reg.distance(this.repair.len)) {
        this.open4("距离格式不对");
      } else {
        this.disadd = false;
      }
    },
    telre1() {
      this.disadd = true;
      if (!reg.tel1(this.repair.tel)) {
        this.open4("电话格式不对");
      } else {
        this.disadd = false;
      }
    },
    number(obj) {
      this.disadd = true;
      if (!reg.pnum(obj)) {
        this.open4("此项应该为正数");
      } else {
        this.disadd = false;
      }
    },
    handleClick(tab, event, arr) {
      console.log(tab, event);
      arr = [];
      if (this.activeName == "first") {
        this.init(API.findRepair, this.initData, "repair");
        this.nowtab = 1;
      }
      if (this.activeName == "second") {
        //第二个界面加载下拉框和表格信息
        this.value = "0";
        this.init(API.findRepairComment, this.initData, "repairCommon");
        this.nowtab = 2;
        this.$axios({
          url: API.findRepair
        }).then(res => {
          if (res.data.isok) {
            this.common = res.data.data;
          } else {
            this.open4(res.data.info);
          }
        });
      }
    },
    init(url, fn, type) {
      this.$axios({
        url: url
      }).then(res => {
        if (res.data.isok) {
          fn(res.data.data, type);
        } else {
          this.open4(res.data.info);
        }
      });
    },
    initData(d, type) {
      switch (type) {
        case "repair":
          this.tableData1 = d;
          break;
        case "repairCommon":
          this.tableData2 = d;
          break;
      }
    },
    tocreate1(id) {
      this.npno = true;
      this.disadd = true;
      this.repair = {
        address: "",
        info: "",
        len: "",
        likeNum: "",
        name: "",
        readNum: "",
        score: "",
        tel: "",
        type: ""
      };
      this.dialogFormVisible1 = true;
      if (id != "0") {
        this.$axios({
          url: API.findRepair,
          params: {
            id: id
          }
        }).then(res => {
          this.repair = res.data.data[0];
        });
        this.npno = false;
      }
    },
    create1() {
      console.log(this.repair);
      this.$axios({
        url: API.addRepair,
        params: this.repair
      }).then(res => {
        if (res.data.isok) {
          this.dialogFormVisible1 = false;
          this.init(API.findRepair, this.initData, "repair");
          this.npno = true;
          this.disadd = true;
        } else {
          this.open4(res.data.info);
        }
      });
    },
    update() {
      console.log(this.repair);
      this.$axios({
        url: API.updateRepair,
        params: this.repair
      }).then(res => {
        if (res.data.isok) {
          this.dialogFormVisible1 = false;
          this.init(API.findRepair, this.initData, "repair");
          this.npno = true;
          this.disadd = true;
        } else {
          this.open4(res.data.info);
        }
      });
    },
    todel(id) {
      this.dialogVisible = true;
      this.delid = id;
      console.log(this.nowtab);
    },
    del() {
      if (this.nowtab == 1) {
        this.$axios({
          url: API.delRepair,
          params: {
            id: this.delid
          }
        }).then(res => {
          if (res.data.isok) {
            this.init(API.findRepair, this.initData, "repair");
            this.dialogVisible = false;
          } else {
            this.open4(res.data.info);
          }
        });
      }
      if (this.nowtab == 2) {
        this.$axios({
          url: API.delRepairComment,
          params: {
            id: this.delid
          }
        }).then(res => {
          if (res.data.isok) {
            this.changeshow();
            this.dialogVisible = false;
          } else {
            this.open4(res.data.info);
          }
        });
      }
    },
    changeshow() {
      if (this.value == "0") {
        this.init(API.findRepairComment, this.initData, "repairCommon");
      } else {
        this.$axios({
          url: API.findRepairComment,
          params: {
            repairId: this.value
          }
        }).then(res => {
          if (res.data.isok) {
            this.tableData2 = res.data.data;
          } else {
            this.open4(res.data.info);
          }
        });
      }
    }
  },
  mounted() {
    this.init(API.findRepair, this.initData, "repair");
    this.value = "0";
    this.nowtab = 1;
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("isAdmin") == "1") {
      next();
    } else {
      next("/index/welcome");
    }
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped></style>