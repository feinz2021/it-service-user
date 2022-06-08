import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage';
// import ViewTask from './page/task/ViewTask';
// import AddTask from './page/task/AddTask';
import TaskList from './pages/task/TaskList';

const routes = [
    { path: '/', redirect: '/homepage' },
    {
        path: '/homepage',
        component: HomePage,
        name: "homepage"
    },
    {
        path: '/tasklist',
        component: TaskList,
        name: "tasklist",
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;