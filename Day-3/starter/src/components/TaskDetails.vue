<template>
    <div class="columns">
        <div class="column is-half is-offset-one-quarter">
            <section class="hero">
                <div class="hero-body">
    
                    <h1 class="title has-text-centered">Task Details</h1>
    
                    <div>
                        <div class="field">
                            <p class="control">
                                <input class="input is-large" type="text" :placeholder="name" v-model='updatedTask.name'>
                            </p>
                        </div>
    
                        <div class="field">
                            <label class="label">Description</label>
                            <p class="control">
                                <textarea class="textarea" :placeholder="description" v-model='updatedTask.description'></textarea>
                            </p>
                        </div>
    
                        <div class="field">
                            <p class="control">
                                <input class="input is-large" type="text" placeholder="add categories folks" @keydown.enter='addCategory()' v-model='newCategory'>
                            </p>
                        </div>
    
                        <div class="columns is-multiline is-narrow">
                            <div class="column is-pulled-left is-2" v-for='(category,index) in updatedTask.categories' :key='index'>
                                <span class="tag is-warning is-medium">
                                    {{category}}
                                    <button class="delete is-small" @click='removeCategory(index)'></button>
                                </span>
                            </div>
                        </div>
    
                        <a class="button is-primary" @click="updateTask()">Update Task</a>
    
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import bus from '../bus/index.js'

export default {
    name: 'task-details',
    props: ['name', 'description', 'categories', 'index'],
    data() {
        return {
            newCategory: '',
            updatedTask: {
                name: '',
                description: '',
                categories: this.categories.slice()
            }
        }

    },
    created() {

    },
    deactivated(){

    },
    activated() {
        //this.updatedTask.categories = this.categories.slice();
    },
    methods: {
        addCategory() {
            this.updatedTask.categories.push(this.newCategory);
            this.newCategory='';
        },
        removeCategory(categoryIndex) {
            this.updatedTask.categories.splice(categoryIndex, 1)
        },
        updateTask() {
            bus.$emit('updateTask', this.index, this.updatedTask);
            this.$router.push('/');
            this.clearData();
        },
        clearData() {
            this.newCategory = '';
            this.updatedTask.name = '';
            this.updatedTask.description = '';
            this.updatedTask.categories = [];
        }
    }
}
</script>
<style lang='scss'>

</style>