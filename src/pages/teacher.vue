<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="家教Banner" name="first">
        <el-button type="primary" @click="tocreate1">添加</el-button>
        <hr />
        <!-- 表格 -->
        <el-table :data="tableData1" style="width: 100%" height="350">
          <el-table-column type="index" label="序号" width="180"></el-table-column>
          <el-table-column prop="img" label="图片" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.img" width="150" />
            </template>
          </el-table-column>
          <el-table-column prop="des" label="描述" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" @click="todel(scope.row.id)" plain>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 表格结束 -->
      </el-tab-pane>
      <el-tab-pane label="家教类型" name="second">
        <!-- 家教类型111 -->
        <el-button type="primary" @click="tocreate2">添加</el-button>
        <hr />
        <!-- 表格 -->
        <el-table :data="tableData2" style="width: 100%" height="350">
          <el-table-column type="index" label="序号" width="180"></el-table-column>
          <el-table-column prop="img" label="图片" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.img" width="150" />
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" @click="todel(scope.row.id)" plain>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 表格结束 -->
      </el-tab-pane>
      <el-tab-pane label="家教排行" name="third">
        <!-- 家教排行111 -->
        <el-button type="primary" @click="tocreate3">添加</el-button>
        <hr />
        <!-- 表格 -->
        <el-table :data="tableData3" style="width: 100%" height="350">
          <el-table-column type="index" label="序号" width="180"></el-table-column>
          <el-table-column prop="img" label="图片" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.img" width="150" />
            </template>
          </el-table-column>
          <el-table-column prop="num" label="报名人数" width="180"></el-table-column>
          <el-table-column prop="teacherImg" label="机构名字" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.teacherImg" width="150" />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" @click="todel(scope.row.id)" plain>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 表格结束 -->
      </el-tab-pane>
    </el-tabs>
    <!-- 弹窗1 -->
    <el-dialog title="Banner管理" :visible.sync="dialogFormVisible1">
      <el-form :model="banner">
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-input v-model="banner.img" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="banner.des" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="create1">添 加</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗结束 -->
    <!-- 弹窗2 -->
    <el-dialog title="家教类型管理" :visible.sync="dialogFormVisible2">
      <el-form :model="ttype">
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-input v-model="ttype.img" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="ttype.type" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="create2">添 加</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗结束 -->
    <!-- 弹窗3 -->
    <el-dialog title="家教排行管理" :visible.sync="dialogFormVisible3">
      <el-form :model="ttop">
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-input v-model="ttop.img" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="老师图片" :label-width="formLabelWidth">
          <el-input v-model="ttop.teacherImg" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="报课人数" :label-width="formLabelWidth">
          <el-input
            v-model="ttop.num"
            autocomplete="off"
            clearable
            type="number"
            @input="number(ttop.num)"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="create3" :disabled="disadd">添 加</el-button>
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
import reg from "../util/reg"
export default {
  data() {
    return {
      activeName: "first",
      formLabelWidth: "120px",
      dialogVisible: false,
      tableData1: [],
      tableData2: [],
      tableData3: [],
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      delid: "",
      banner: {
        des: "",
        img: ""
      },
      ttype: {
        img: "",
        type: ""
      },
      ttop: {
        img: "",
        num: "",
        teacherImg: ""
      },
      nowtab: "",
      disadd: true
    };
  },
  methods: {
    open4(data) {
      this.$message.error(data);
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
        this.init(API.teacherBanner, this.initData, "banner");
        this.nowtab = 1;
      }
      if (this.activeName == "second") {
        this.init(API.teacherType, this.initData, "type");
        this.nowtab = 2;
      }
      if (this.activeName == "third") {
        this.init(API.teacherTop, this.initData, "top");
        this.nowtab = 3;
      }
    },
    init(url, fn, type) {
      //接口是什么，数据放在哪里
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
        case "banner":
          this.tableData1 = d;
          break;
        case "type":
          this.tableData2 = d;
          break;
        case "top":
          this.tableData3 = d;
          break;
      }
    },
    tocreate1() {
      this.banner = {
        des: "",
        img: ""
      };
      this.dialogFormVisible1 = true;
    },
    tocreate2() {
      this.ttype = {
        type: "",
        img: ""
      };
      this.dialogFormVisible2 = true;
    },
    tocreate3() {
      this.disadd=true;
      this.ttop = {
        img: "",
        num: "",
        teacherImg: ""
      };
      this.dialogFormVisible3 = true;
    },
    create1() {
      this.$axios({
        url: API.addTeacherBanner,
        params: this.banner
      }).then(res => {
        if (res.data.isok) {
          this.dialogFormVisible1 = false;
          this.init(API.teacherBanner, this.initData, "banner");
        } else {
          this.open4(res.data.info);
        }
      });
    },
    create2() {
      this.$axios({
        url: API.addTeacherType,
        params: this.ttype
      }).then(res => {
        if (res.data.isok) {
          this.dialogFormVisible2 = false;
          this.init(API.teacherType, this.initData, "type");
        } else {
          this.open4(res.data.info);
        }
      });
    },
    create3() {
      this.$axios({
        url: API.addTeacherTop,
        params: this.ttop
      }).then(res => {
        if (res.data.isok) {
          this.dialogFormVisible3 = false;
          this.init(API.teacherTop, this.initData, "top");
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
      let url = "";
      let url2 = "";
      let type = "";
      if (this.nowtab == 1) {
        url = API.delTeacherBanner;
        url2 = API.teacherBanner;
        type = "banner";
      }
      if (this.nowtab == 2) {
        url = API.delTeacherType;
        url2 = API.teacherType;
        type = "type";
      }
      if (this.nowtab == 3) {
        url = API.delTeacherTop;
        url2 = API.teacherTop;
        type = "top";
      }
      this.$axios({
        url: url,
        method: "get",
        params: {
          id: this.delid
        }
      }).then(res => {
        if (res.data.isok) {
          this.dialogVisible = false;
          this.init(url2, this.initData, type);
        } else {
          this.open4(res.data.info);
        }
      });
    }
  },
  mounted() {
    this.init(API.teacherBanner, this.initData, "banner");

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