import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/home-page.vue';
import NewProjectPage from '@/pages/project/new-project-page.vue';
import ProjectPage from '@/pages/project/project-page.vue';
import LoginPage from '@/pages/profile/login-page.vue';
import RegisterPage from '@/pages/profile/register-page.vue';
import ProfilePage from '@/pages/profile/profile-page.vue';
import ErrorPage from '@/pages/error-page.vue';
import { RouteName } from '@/router/enum/route';
import { authGuard } from '@/router/guards/auth-guard';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: RouteName.Home,
            component: HomePage,
        },
        {
            path: '/login',
            name: RouteName.Login,
            component: LoginPage,
            beforeEnter: authGuard,
        },
        {
            path: '/register',
            name: RouteName.Register,
            component: RegisterPage,
            beforeEnter: authGuard,
        },
        {
            path: '/profile/:user',
            name: RouteName.Profile,
            component: ProfilePage,
        },
        {
            path: '/project/:name',
            name: RouteName.Project,
            component: ProjectPage,
        },
        {
            path: '/new',
            name: RouteName.NewProject,
            component: NewProjectPage,
            beforeEnter: authGuard,
        },
        {
            path: '/:pathMatch(.*)*',
            name: RouteName.Error,
            component: ErrorPage,
        },
    ],
});

export default router;
