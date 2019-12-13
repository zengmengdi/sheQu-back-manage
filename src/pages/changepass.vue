<template>
  <div>
    <el-input v-model="user.name" placeholder="账户名" disabled></el-input>
    <el-input placeholder="请输入旧密码" v-model="user.oldpass" show-password clearable></el-input>
    <el-input placeholder="请输入新密码" v-model="user.newpass" show-password clearable @blur="passre"></el-input>
    <el-input placeholder="请确认新密码" v-model="confirm" show-password clearable @blur="passre2"></el-input>
    <el-button @click="modpass" type="primary" :disabled="mod">修改密码</el-button>
  </div>
</template>
<script>
import API from "../util/API";
export default {
  data() {
    return {
      user: {
        name: "",
        oldpass: "",
        newpass: ""
      },
      confirm: "",
      mod: true
    };
  },
  methods: {
    open1(data) {
      this.$message({ message: data, type: "success" });
    },
    open4(data) {
      this.$message.error(data);
    },
    passre() {
      this.mod = true;
      if (this.user.newpass.length > 12 || this.user.newpass.length < 3) {
        this.open4("新密码长度为3-12位");
      } else {
        this.mod = false;
      }
    },
    modpass() {
      if (this.user.newpass != this.confirm) {
        this.open4("新密码两次输入不一致");
        return;
      } else {
        this.$axios({
          url: API.changePassManage,
          method: "post",
          data: this.user
        }).then(res => {
          if (res.data.isok) {
            this.open1(res.data.info);
            this.user = {
              name: "",
              oldpass: "",
              newpass: ""
            };
            this.$router.replace("/login");
          } else {
            this.open4(res.data.info);
          }
        });
      }
    }
  },
  mounted() {
    this.user.name = localStorage.getItem("username");
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
.el-input {
  width: 80%;
  margin: 10px auto;
}

.el-button {
  display: block;
}

.dialog-footer {
  .el-button {
    display: inline;
  }
}
</style>