<template>
  <div class="columns">
    <div class="column is-half is-offset-one-quarter">
      <section class="hero">
        <div class="hero-body">
          <h1 class="title has-text-centered">{{ title }}</h1>
          <div class="field">
            <p class="control">
              <input class="input is-large" placeholder="Create a New task" type="text" v-on:keyup.enter='addTask' v-model='taskName'>
              <input class="input is-large" placeholder="Search a task" type="text" v-model="searchedTask" >
            </p>
          </div>
        </div>
      </section>
      <div class="columns">
        <div class=" block column is-half is-offset-one-quarter">
          
          <a class="button"  @click='showAllTasks'>Show All</a>
          <a class="button"  @click='showDoneTasks'>Done</a>
          <a class="button"  @click='showActiveTasks'>Active</a>
          
        </div>
      </div>
      <section class="hero">
        <div class="hero-body columns is-multiline">
          
          <div class="box column is-10 is-offset-1"  v-for='(task, index) in tasksToShow' :key='index'>
             <task :done="task.done" :name="task.taskName" :categories='task.categories'  :description='task.description' @doneChanged="handleDoneChange" :index="index" @taskDeleted="handleTaskDeleted"></task>
          </div>
          
        </div>
        
      </section>
    </div>
  </div>
</template>


<script>
import Task from './Task.vue'
import Vue from 'vue'
import axios from 'axios';
import bus from '../bus/index.js'

export default {
  name: 'task-view',
  components: { Task },
  data () {
    return {
        title:'TO DO',
        taskName:'',
        tasks: [],
        showDone:true,
        showAll:true,
        searchedTask: ''
    }
  },
  watch: {
    showDone(newDone, oldDone) {
      console.log(newDone);
      console.log(oldDone);
    }
  },
  mounted () {

  },
  created () {
    axios.get('http://demo3594906.mockable.io/getTasks')
    .then((response) => {
      this.tasks = response.data.tasks;
    })
    .catch(error => console.log(error))


    bus.$on('updateTask',(index,updatedTask)=>{
      var task = this.tasks[index];
      task.taskName=updatedTask.name;
      task.description = updatedTask.description
      task.categories = updatedTask.categories.slice()
    })
  },
  computed: {
    tasksToShow() {
      const isEmpty = this.searchedTask === '';
      /*
      if (this.searchedTask === '') {
        return this.tasks.filter((task) => task.done === this.showDone || this.showAll)
      }

      return this.tasks.filter((task) => task.taskName.includes(this.searchedTask));
      */
      return this.tasks
        .filter((task) => task.done === this.showDone || this.showAll)
        .filter((task) => task.taskName.includes(this.searchedTask) || isEmpty);
    }
  },
  methods:{
    addTask() {
      this.tasks.push({
        taskName:this.taskName,
        done: false,
        description:'',
        categories:[]
      })
      this.taskName = ''
    },
    showAllTasks() {
      this.showAll=true
    },
    showDoneTasks() {
      this.showDone=true
      this.showAll=false
    },
    showActiveTasks() {
      this.showDone = false
      this.showAll = false
    },
    handleDoneChange(e, index) {
        const taskChanged = this.tasks[index];
        taskChanged.done = !taskChanged.done
        Vue.set(this.tasks, index, taskChanged);
    },
    handleTaskDeleted(index) {
      this.tasks.splice(index, 1);
    },
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
