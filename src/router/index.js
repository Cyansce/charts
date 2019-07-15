import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import D3Demo from '../pages/d3'

const routes = [
  {
    name: 'd3', 
    path: '/d3',
    component: D3Demo
  }
]

export default new Router({ 
  mode: 'history',
  routes 
})