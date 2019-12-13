<template>
  <div>
    <el-button plain @click="toexit">退出登录</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" height="200px">
      <span>你确定要退出吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="exit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import API from "../util/API";
export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    open4(data) {
      this.$message.error(data);
    },
    toexit() {
      this.dialogVisible = true;
    },
    exit() {
      this.$axios({
        url: API.exit
      }).then(res => {
        if (res.data.isok) {
          this.dialogVisible = false;
          localStorage.removeItem("username");
          this.$router.replace("/login");
        } else {
          this.open4(res.data.info);
        }
      });
    }
  },
  mounted() {}
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>