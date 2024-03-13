import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/Home.page.vue';
import NewProjectPage from '@/pages/project/NewProject.page.vue';
import ProjectPage from '@/pages/project/Project.page.vue';
import LoginPage from '@/pages/profile/Login.page.vue';
import RegisterPage from '@/pages/profile/Register.page.vue';
import ProfilePage from '@/pages/profile/Profile.page.vue';
import ErrorPage from '@/pages/Error.page.vue';
import Cookies from 'js-cookie';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage,
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginPage,
            beforeEnter(to, from, next) {
                isLoggedOut(next);
            },
        },
        {
            path: '/register',
            name: 'Register',
            component: RegisterPage,
            beforeEnter(to, from, next) {
                isLoggedOut(next);
            },
        },
        {
            path: '/profile/:user',
            name: 'Profile',
            component: ProfilePage,
        },
        {
            path: '/project/:name',
            name: 'Project',
            component: ProjectPage,
        },
        {
            path: '/new',
            name: 'NewProject',
            component: NewProjectPage,
            beforeEnter(to, from, next) {
                isLoggedIn(next);
            },
        },
        { path: '/:pathMatch(.*)*', name: 'Error', component: ErrorPage },
    ],
});

export default router;

const isLoggedIn = (next) => {
    if (Cookies.get('isLoggedIn')) {
        next();
    } else {
        next({
            path: '/login',
            replace: true,
        });
    }
};

const isLoggedOut = (next) => {
    if (Cookies.get('isLoggedIn')) {
        next({
            path: '/',
            replace: true,
        });
    } else {
        next();
    }
};
