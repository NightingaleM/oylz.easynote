import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.

    // import( /* webpackChunkName: "about" */ './views/login.vue')   这么写的话，打包后的js会放在一起
    component: () => import('./views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./views/register.vue')
  },
  {
    path: '/',
    name: 'note_page',
    component: () => import('./views/note_page/index.vue'),
    children: [
      {
        path: '',
        name: 'search',
        component: () => import('./views/note_page/search.vue')
      },
      {
        path: 'details',
        name: 'details',
        component: () => import('./views/note_page/details.vue')
      },
      {
        path: 'writer',
        name: 'writer',
        component: () => import('./views/note_page/writer.vue')
      },
    ]
  },
  ]
})
