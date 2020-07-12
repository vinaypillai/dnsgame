import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Launch from '../views/launchpage.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/game',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Launch',
    component: Launch
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
