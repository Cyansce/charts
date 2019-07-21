import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import D3Demo from '../pages/d3'
import D3Stacks from '../pages/d3Stacks'
import Drag from '../pages/dragable'
import Home from '../pages/home'

const routes = [
  {
    name: 'home', 
    path: '/',
    component: Home
  },
  {
    name: 'd3', 
    path: '/d3',
    component: D3Demo
  },
  {
    name: 'stacks', 
    path: '/stacks',
    component: D3Stacks
  },
  {
    name: 'drag',
    path: '/drag',
    component: Drag
  }
]

export default new Router({ 
  mode: 'history',
  routes 
})