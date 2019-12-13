<template>
  <div class="login">
    <div class="loginform">
      <h2>login</h2>
      <el-select v-model="user.type" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="user.name" placeholder="请输入账户名" clearable></el-input>
      <el-input placeholder="请输入密码" v-model="user.pass" show-password clearable></el-input>
      <el-button @click="login" type="primary">登录</el-button>
    </div>
  </div>
</template>
<script>
import API from "../util/API";
export default {
  data() {
    return {
      user: {
        type: "",
        name: "",
        pass: ""
      },

      options: [
        {
          value: "0",
          label: "超级管理员"
        },
        {
          value: "1",
          label: "普通管理员"
        }
      ]
    };
  },
  methods: {
    open1(data) {
      this.$message({ message:data, type: "success" });
    },
    open4(data) {
      this.$message.error(data);
    },
    login() {
      this.$axios({
        url: API.login,
        method: "post",
        data: this.$qs.stringify(this.user)
      }).then(res => {
        if (res.data.isok) {
          // this.$store.dispatch('saveName',this.user.name)
          localStorage.setItem('username',this.user.name)
          localStorage.setItem('isAdmin',this.user.type)
          this.open1(res.data.info);
          
          this.$router.push("/index");
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
.login {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/img/background.jpg');

  .loginform {
    width: 400px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;

    h2 {
      font-size: 30px;
      height: 50px;
      line-height: 50px;
      color: white;
    }

    .el-input, .el-select {
      width: 80%;
      margin: 10px;
    }

    button {
      margin-top: 10px;
    }
  }
}
</style>