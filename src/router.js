import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import firebase from 'firebase/app'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { auth: true },//защита роутов
      component: Home
    },
    {
      path: "/dialog/:id",
      name: 'dialog',
      meta: { auth: true },//защита роутов
      component: () => import('./views/Dialog.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/new_post',
      name: 'new_post',
      component: () => import('./views/NewPost.vue'),
      meta: { auth: true },//защита роутов
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('./views/Posts.vue'),
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('./views/Post.vue'),
    },
    {
      path: '/editpost/:id',
      name: 'editpost',
      meta: { auth: true },//защита роутов
      component: () => import('./views/EditPost.vue'),
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)
  if (requireAuth && !currentUser) {
    next ('/login')
  } else { next() }
})
export default router