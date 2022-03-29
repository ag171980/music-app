import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Signin from '../views/Signin.vue'
import Home from '../views/Home.vue'

import Playlist from "../views/Playlist.vue";
import Search from "../views/Search.vue";

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/playlist',
    name: 'Playlist',
    component: Playlist,
    children: [{ path: "/", component: Playlist }]
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
