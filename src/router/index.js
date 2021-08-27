import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    // find
    { path: '/',              name: 'index',        component: () => import('../views/find/index.vue') },
    { path: '/statistics',    name: 'statistics',   component: () => import('../views/find/statistics.vue') },
    { path: '/classDetail',   name: 'classDetail',  component: () => import('../views/find/classDetail.vue') },
    { path: '/recordDetail',  name: 'recordDetail', component: () => import('../views/find/recordDetail.vue') },

    // record
    { path: '/addRecord',     name: 'addRecord',    component: () => import('../views/record/addRecord.vue') },

    // set
    { path: '/account',       name: 'account',      component: () => import('../views/set/account.vue') },
    { path: '/addClass',      name: 'addClass',     component: () => import('../views/set/addClass.vue') },
    { path: '/login',         name: 'login',        component: () => import('../views/set/login.vue') },
    { path: '/settingClass',  name: 'settingClass', component: () => import('../views/set/settingClass.vue') },
  ]
})

export default router
