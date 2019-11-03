import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/home/Home.vue';
import Dashboard from './components/dashboard/Dashboard.vue';
import Planner from './components/planner/Planner.vue';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    icon: 'mdi-home',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    icon: 'mdi-widgets',
  },
  {
    path: '/planner',
    name: 'Planner',
    component: Planner,
    icon: 'mdi-calendar',
  },
]

export default new VueRouter({
  routes,
  mode: 'history'
});