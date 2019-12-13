<template>
  <div class="index">
    <!-- <h1>{{$store.getters.name}}</h1> -->
    <v-header></v-header>
    <div class="main">
        <v-left></v-left>
        <v-right></v-right>
    </div>
  </div>
</template>
<script>
import vHeader from "../views/header";
import vLeft from "../views/left";
import vRight from "../views/right";
export default {
  components: {
    vHeader,
    vLeft,
    vRight
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.index
    display flex
    flex-direction column
    width 100% 
    height 100vh
    overflow hidden
    .main
        flex 1
        display flex
        

</style>