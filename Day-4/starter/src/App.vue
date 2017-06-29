<template>
  <div id="app">
    <keep-alive>

      <router-view exclude='TaskDetails'>
      </router-view>

    </keep-alive>


  </div>
</template>

<script>
  import TaskView from './components/TaskView.vue'
  import TaskDetails from './components/TaskDetails.vue'
  export default {
    name: 'app',
    components: {
      TaskView,
      TaskDetails
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    computed: {

    },
    methods: {

    }
  }
</script>

<style lang='scss'>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>