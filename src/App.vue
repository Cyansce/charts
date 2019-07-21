<template>
  <div id="app">
    <div class="side-nav">
      <ul class="nav">
        <li class="nav-item"><router-link to="/">Home</router-link></li>
        <li class="nav-item">
          <router-link to="/d3">d3-demo</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/stacks">d3-stacks</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/drag">dragable</router-link>
        </li>
      </ul>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
}
.side-nav {
  width: 200px;
  height: 100%;
  text-align: center;
  border-right: 1px solid #999000;
}
.side-nav>ul {
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 40px;
}
.side-nav>ul a {
  text-decoration: none;
  color: inherit
}
.side-nav>ul a:hover {
  text-decoration: underline
}
.container {
  width: 100%;
  height: 100%;
  text-align: left;
  padding-left: 20px;
}
.content {
  display: flex
}
</style>
