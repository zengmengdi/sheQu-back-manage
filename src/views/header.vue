<template>
  <div class="header">
    <el-row>
      <el-col :span="3" :offset="18">
          <h1>{{username}}</h1>
      </el-col>
      <el-col :span="2">
          <v-exit></v-exit>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: localStorage.getItem("username")
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.header 
  height: 80px;
  background-color: #409EFF;
  line-height 80px
  h1
    font-size 30px;
    color white

</style>