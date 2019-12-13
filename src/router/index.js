import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = () => Promise.resolve(import('../pages/login'))
const index = () => Promise.resolve(import('../pages/index'))
//index下的
const welcome = () => Promise.resolve(import('../pages/welcome'))
const manage = () => Promise.resolve(import('../pages/manage'))
const banner = () => Promise.resolve(import('../pages/banner'))
const teacher = () => Promise.resolve(import('../pages/teacher'))
const water = () => Promise.resolve(import('../pages/water'))
const repair = () => Promise.resolve(import('../pages/repair'))
const home = () => Promise.resolve(import('../pages/home'))
const changepass = () => Promise.resolve(import('../pages/changepass'))


export default new Router({
  routes: [
    {
      path: "/login",
      component: login
    },
    {
      path: "/index",
      component: index,
      children: [
        {
          path: "welcome",
          component: welcome
        }, 
        {
          path: "manage",
          component: manage,
          name:"管理员管理"
        }, 
        , 
        {
          path: "banner",
          component: banner,
          name:"banner管理"
        }
        , 
        {
          path: "teacher",
          component: teacher,
          name:"教师管理"
        }
        , 
        {
          path: "water",
          component: water,
          name:"水站管理"
        }

        , 
        {
          path: "repair",
          component: repair,
          name:"修护管理"
        }
        , 
        {
          path: "home",
          component: home,
          name:"家政管理"
        }, 
        {
          path: "changepass",
          component: changepass,
          name:"密码管理"
        },
        {
          path: "",
          redirect: "welcome"
        }
      ]
    },
    {
      path: "*",
      redirect: "/login"
    },
  ]
})
