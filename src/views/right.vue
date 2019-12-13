<template>
  <div class="right">
    <h1>{{$route.name}}</h1>
    <hr />
    <router-view class="rightCon"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.right {
  flex: 1;
  overflow-x: hidden;
  height: 100%;
  background-color: #ecf5ff;
  overflow-y: auto;
  padding: 20px;
}
</style>