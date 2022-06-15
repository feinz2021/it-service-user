import { createRouter, createWebHistory } from 'vue-router';
import PageNotFound from './pages/PageNotFound';
import HomePage from './pages/HomePage';
import ViewTask from './pages/task/ViewTask';
import AddTask from './pages/task/AddTask';
import TaskList from './pages/task/TaskList';
import OrderList from './pages/order/OrderList';
import NewOrder from './pages/order/NewOrder';
import ViewOrder from './pages/order/ViewOrder';

const routes = [
    {
        path: '/:catchAll(.*)*',
        name: "pagenotfound",
        component: PageNotFound,
    },
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
        path: '/orderlist',
        component: OrderList,
        name: "orderlist",
    },
    {
        path: '/neworder',
        component: NewOrder,
        name: "neworder",
    },
    {
        path: '/vieworder',
        component: ViewOrder,
        name: "vieworder",
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;