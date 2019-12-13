<template>
  <div>
    <el-button type="primary" @click="tocreate(0)">添加</el-button>
    <hr />
    <!-- 弹窗 -->
    <el-dialog title="管理员管理" :visible.sync="dialogFormVisible">
      <el-form :model="user" status-icon :rules="rules" ref="user">
        <el-form-item label="账户名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="user.name" autocomplete="off" :disabled="npno==false"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="pass">
          <el-input v-model="user.pass" autocomplete="off" :disabled="npno==false" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" v-if="npno==true" prop="confirm">
          <el-input v-model="user.confirm" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="user.des" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-date-picker v-model="user.time" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="create" v-if="npno==true">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗结束 -->
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" height="350">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="des" label="描述" width="180"></el-table-column>
      <el-table-column prop="time" label="时间">
        <template slot-scope="scope">{{scope.row.time | timeFilter}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="tocreate(scope.row.id)" plain>查看</el-button>
          <el-button type="danger" @click="todel(scope.row.id)" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格结束 -->
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
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.user.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      user: {
        name: "",
        pass: "",
        time: "",
        des: "",
        confirm: ""
      },
      npno: true,
      dialogVisible: false,
      delid: "",
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 12, message: "长度在3-12之间", trigger: "blur" }
        ],
        confirm: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    open1(data) {
      this.$message({ message: data, type: "success" });
    },
    open4(data) {
      this.$message.error(data);
    },
    init() {
      this.$axios({
        url: API.findManage,
        method: "post"
      }).then(res => {
        if (res.data.isok) {
          this.tableData = res.data.data;
        } else {
          this.open4(res.data.info);
        }
      });
    },
    tocreate(id) {
      this.user = {
        name: "",
        pass: "",
        time: "",
        des: "",
        confirm: ""
      };
      this.dialogFormVisible = true;
      if (id == 0) {
        this.npno = true;
      }
      if (id != 0) {
        this.npno = false;
        this.$axios({
          url: API.findManage,
          method: "post",
          data: {
            id: id
          }
        }).then(res => {
          if (res.data.isok) {
            this.user = res.data.data[0];
            this.user.time = new Date(parseInt(this.user.time));
          }
        });
      }
    },
    create() {
      this.user.time = new Date(this.user.time).getTime();
      delete this.user.confirm;
      this.$axios({
        url: API.addManage,
        method: "post",
        data: this.user
      }).then(res => {
        if (res.data.isok) {
          this.dialogFormVisible = false;
          this.init();
        } else {
          this.open4(res.data.info);
        }
      });
    },
    update() {
      this.user.time = new Date(this.user.time).getTime();
      // console.log(this.user);

      this.$axios({
        url: API.updateManage,
        method: "post",
        data: this.user
      }).then(res => {
        if (res.data.isok) {
          this.dialogFormVisible = false;
          this.init();
        } else {
          this.open4(res.data.info);
        }
      });
    },
    todel(id) {
      this.dialogVisible = true;
      this.delid = id;
    },
    del() {
      // console.log(this.delid);
      this.$axios({
        url: API.delManage,
        method: "post",
        data: {
          id: this.delid
        }
      }).then(res => {
        if (res.data.isok) {
          this.dialogVisible = false;
          this.init();
        } else {
          this.open4(res.data.info);
        }
      });
    }
  },
  mounted() {
    this.init();
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("isAdmin") == "0") {
      next();
    } else {
      next("/index/welcome");
    }
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.el-input__inner, .el-input {
  width: 80% !important;
}
</style>