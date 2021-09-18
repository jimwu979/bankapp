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
    { path: '/signUp',        name: 'signUp',       component: () => import('../views/set/signUp.vue') },
    { path: '/settingClass',  name: 'settingClass', component: () => import('../views/set/settingClass.vue') },

    // redirect
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ]
})

router.beforeEach((to, from) => {
  if(from.path != '/login' && to.path != '/login'){
    var xhr = new XMLHttpRequest();
    let isAlreadyLogin = false;
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            isAlreadyLogin = JSON.parse(xhr.response).alreadyLogin;
        }
    };
    xhr.open('post', '/api/alreadyLogin', false);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify({
        email: localStorage.getItem('email'),
        loginCodeName: localStorage.getItem('loginCodeName'),
    }));
    if(!isAlreadyLogin) router.push('/login');
  }
});

export default router
