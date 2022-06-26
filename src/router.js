import { createRouter, createWebHistory } from 'vue-router';
import PageNotFound from './pages/PageNotFound';
import HomePage from './pages/HomePage';
import LoginPage from './components/LoginPage';
import ViewTask from './pages/task/ViewTask';
import AddTask from './pages/task/AddTask';
import TaskList from './pages/task/TaskList';
import OrderList from './pages/order/OrderList';
import NewOrder from './pages/order/NewOrder';
import ViewOrder from './pages/order/ViewOrder';
import UserProfile from './pages/UserProfile';
import UserList from './pages/admin/UserList';
import NewUser from './pages/admin/NewUser';

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
        path: '/loginpage',
        component: LoginPage,
        name: "loginpage"
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
    {
        path: '/userprofile',
        component: UserProfile,
        name: "userprofile",
    },
    {
        path: '/userlist',
        component: UserList,
        name: "userlist",
        beforeEnter: (to) => {
            if (localStorage.getItem("isAdmin") != "true" && to.name === "userlist") {
                return { name: 'homepage' }
            }
        }
    },
    {
        path: '/newuser',
        component: NewUser,
        name: "newuser",
        beforeEnter: (to) => {
            if (localStorage.getItem("isAdmin") != "true" && to.name === "newuser") {
                return { name: 'homepage' }
            }
        }
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach(async (to) => {
    if (
        // make sure the user is authenticated
        !localStorage.getItem("isLoggedIn") &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'loginpage'
    ) {
        // redirect the user to the login page
        return { name: 'loginpage' }
    }
    else if (
        localStorage.getItem("isLoggedIn") == "true" &&
        to.name === 'loginpage'
    ) {
        return { name: 'homepage' }
    }
})

export default router;