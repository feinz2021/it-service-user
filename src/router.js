import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage';
import ViewTask from './pages/task/ViewTask';
import AddTask from './pages/task/AddTask';
import TaskList from './pages/task/TaskList';
import ServiceOrderList from './pages/service-order/ServiceOrderList';

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
    {
        path: '/addtask',
        component: AddTask,
        name: "addtask",
    },
    {
        path: '/viewtask',
        component: ViewTask,
        name: "viewtask",
    },
    {
        path: '/serviceorderlist',
        component: ServiceOrderList,
        name: "serviceorderlist",
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;