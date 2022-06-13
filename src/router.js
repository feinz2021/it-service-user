import { createRouter, createWebHistory } from 'vue-router';
import PageNotFound from './pages/PageNotFound';
import HomePage from './pages/HomePage';
import ViewTask from './pages/task/ViewTask';
import AddTask from './pages/task/AddTask';
import TaskList from './pages/task/TaskList';
import ServiceOrderList from './pages/service-order/ServiceOrderList';
import NewServiceOrder from './pages/service-order/NewServiceOrder';
import ViewServiceOrder from './pages/service-order/ViewServiceOrder';

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
        path: '/serviceorderlist',
        component: ServiceOrderList,
        name: "serviceorderlist",
    },
    {
        path: '/newserviceorder',
        component: NewServiceOrder,
        name: "newserviceorder",
    },
    {
        path: '/viewserviceorder',
        component: ViewServiceOrder,
        name: "viewserviceorder",
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;