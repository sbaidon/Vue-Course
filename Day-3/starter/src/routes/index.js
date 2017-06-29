import TaskView from '../components/TaskView.vue'
import TaskDetail from '../components/TaskDetails.vue'
import VueRouter from 'vue-router'

const routes = [
    {
        path: '/',
        component: TaskView
    },
    {
        path: '/task',
        name:'task',
        component: TaskDetail,
        props: true
    }
]

export default new VueRouter({ routes: routes });