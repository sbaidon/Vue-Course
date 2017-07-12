<template>
  <article class="media">
      <div class="media-content">
        <div class="content columns" >
          <div class="column is-1 is-narrow">    
            <input type="checkbox" v-model='isDone' @click="toggleIsDone">
          </div>
          <h2 class='column is-three-quarters is-marginless' :class='done ? "is-done" : "is-not-done"'>{{name}}</h2>
          <div class="column is-1 is-narrow">
            <a class="button"  @click='deleteTask'>Delete Task</a>
          </div>
        </div>
      </div>
  </article>
</template>

<script>
export default {
  name: 'task',
  props: ['done', 'name', 'index'],
  data () {
    return {
    }
  },
  computed: {
    isDone () {
      return this.done
    }
  },
  methods: {
    toggleIsDone() {
      this.$emit('doneChanged', this.index)
    },
    deleteTask() {
      this.$emit('deleteTask', this.index)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
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
