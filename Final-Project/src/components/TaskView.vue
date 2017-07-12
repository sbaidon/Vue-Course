<template>
  <div class="columns">
    <div class="column is-half is-offset-one-quarter">
      <section class="hero">
        <div class="hero-body">
          <h1 class="title has-text-centered">{{ title }}</h1>
          <div class="field">
            <p class="control">
              <input class="input is-large" placeholder="Create a New task" type="text" v-on:keyup.enter='addTask' v-model='taskName'>
            </p>
          </div>

          <div class="columns is-multiline is-narrow">
              <div class="column">
                <p class="content">Categories:</p>
              </div>
              <div class="column" v-for='(category,index) in uniqueCategories' :key='index'>
                  <span class="tag is-medium"  :class="isCategoryInFilter(category) ? 'is-warning' : 'is-primary'" @click='toggleFilterCategory($event, category)'>
                      {{category}}
                  </span>
              </div>
          </div>

          <div class="field">
            <p class="control">
              <input class="input is-large" placeholder="Want a specific task?" type="text" v-on:keyup.enter='addTask' v-model='taskToLook'>
            </p>
          </div>

        </div>
      </section>
      <div class="columns">
        <div class=" block column is-half is-offset-one-quarter">
          <a class="button" @click='showAllTasks'>Show All</a>
          <a class="button" @click='showDoneTasks'>Done</a>
          <a class="button" @click='showActiveTasks'>Active</a>
        </div>
      </div>
      <section class="hero">
        <div class="hero-body columns is-multiline">
          <div class="box column is-10 is-offset-1" v-for='(task, index) in tasksToShow' :key='index'>
              <task :done="task.done" :description='task.description' :name="task.taskName" :index="index" :categories='task.categories' @doneChanged="handleDoneChange"  @taskDeleted="handleTaskDeleted"></task>
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
  import TaskDetails from './TaskDetails.vue';
  import bus from '../bus/index.js';

  export default {
    name: 'task-view',
    components: {
      Task,
      TaskDetails
    },
    data() {
      return {
        title: 'TO DO',
        taskName: '',
        tasks: [],
        showDone: true,
        showAll: true,
        taskToLook: '',
        categoriesFilter: [],
      }
    },
    created() {
      var componentThis = this;
      bus.$on('updateTask', function(index,updatedTask) {
         const task = componentThis.tasks[index];
         task.taskName = updatedTask.name;
         task.description = updatedTask.description;
         task.categories = updatedTask.categories.slice();
      })
    },
    computed: {
      tasksToShow() {
        return this.tasksByCategory
          .filter((task) => task.done === this.showDone || this.showAll)
          .filter(task => task.taskName.toLowerCase().includes(this.taskToLook.toLowerCase()))
      },
      tasksByCategory() {
        return this.tasks.filter(task => {
          if (this.categoriesFilter.length) {
            return task.categories.some((category) => this.categoriesFilter.includes(category));
          }
          return true;
        })
      },
      allCategories () {
        return this.tasks
          .map((task) => task.categories) // [[category1, category2], [category1]]
          .reduce((prev, current) => [...prev, ...current], []) // [] [category1, category2], [category1, category2], [category1]
      },
      uniqueCategories() {
        return [...new Set(this.allCategories)];
      },
    },
    watch: {
      uniqueCategories(categories) {
        this.categoriesFilter = this.categoriesFilter.filter(category => categories.includes(category))
      }
    },
    methods: {
      addTask() {
        this.tasks.push({
          taskName: this.taskName,
          done: false,
          description: '',
          categories: []
        })
        this.taskName = ''
      },
      isCategoryInFilter(category) {
        return this.categoriesFilter.includes(category);
      },
      toggleFilterCategory(e, newCategory) {
        const index = this.categoriesFilter.findIndex(category => category === newCategory);
        if (index > -1) {
          this.categoriesFilter.splice(index, 1);
          return;
        }
        this.categoriesFilter.push(newCategory);
      },
      showAllTasks() {
        this.showAll = true
      },
      showDoneTasks() {
        this.showDone = true
        this.showAll = false
      },
      showActiveTasks() {
        this.showDone = false
        this.showAll = false
      },
      handleDoneChange(index) {
        const taskChanged = this.tasks[index];
        taskChanged.done = !taskChanged.done
        Vue.set(this.tasks, index, taskChanged);
      },
      handleTaskDeleted(index) {
        this.tasks.splice(index, 1);
      }
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