<template>
 <div class="left">
     <router-link to="/index/manage" class="la" active-class="active" v-if="isAdmin==0">管理员管理</router-link>
     <router-link to="/index/banner" class="la" active-class="active" v-if="isAdmin==1">banner管理</router-link>
     <router-link to="/index/teacher" class="la" active-class="active" v-if="isAdmin==1">教师管理</router-link>
     <router-link to="/index/water" class="la" active-class="active" v-if="isAdmin==1">水站管理</router-link>
     <router-link to="/index/repair" class="la" active-class="active" v-if="isAdmin==1">维修管理</router-link>
     <router-link to="/index/home" class="la" active-class="active" v-if="isAdmin==1">家政管理</router-link>
     <router-link to="/index/changepass" class="la" active-class="active" v-if="isAdmin==1">修改密码</router-link>
 </div>
</template>
<script>
export default {
data(){
return{
    isAdmin:localStorage.getItem('isAdmin')
}
},
methods: {
},
mounted() {
},
 }
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.left
    width 200px
    background-color #d9ecff
    // height 1000px
    text-align center
    .la
        display block
        height 40px
        line-height 40px
        font-size 16px
        border-radius 5px
        background-color #a4cbf7
        color #666
        border 1px solid #ccc
    .active
        background-color white
        color #409EFF
</style>