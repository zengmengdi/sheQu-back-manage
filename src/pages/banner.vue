<template>
  <div>
    <el-button type="primary" @click="tocreate()">添加</el-button>
    <hr />
    <!-- 弹窗 -->
    <el-dialog title="Banner管理" :visible.sync="dialogFormVisible">
      <el-form :model="water">
        <el-form-item label="水站图片" :label-width="formLabelWidth">
          <el-input v-model="water.img" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="water.des" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="create">添 加</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗结束 -->
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" height="350">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="图片" width="180">
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
    return {
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      water: {
        des: "",
        img: ""
      },
      dialogVisible: false,
      delid: ""
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
        url: API.banner
      }).then(res => {
        if (res.data.isok) {
          this.tableData = res.data.data;
        } else {
          this.open4(res.data.info);
        }
      });
    },
    tocreate() {
      this.water = {
        des: "",
        img: ""
      };
      this.dialogFormVisible = true;
    },
    create() {
      console.log(this.water);
      this.$axios({
        url: API.addBanner,
        method: "get",
        params: this.water
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
        url: API.delBanner,
        method: "get",
        params: {
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
    if (localStorage.getItem("isAdmin") == "1") {
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