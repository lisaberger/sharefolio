import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/features/common/ui/pages/home-page.vue';
import NewProjectPage from '@/features/project/project-new/new-project-page.vue';
import ProjectPage from '@/features/project/project-detail/ui/pages/project-page.vue';
import LoginPage from '@/features/auth/ui/pages/login-page.vue';
import RegisterPage from '@/features/auth/ui/pages/register-page.vue';
import ProfilePage from '@/features/profile/ui/pages/profile-page.vue';
import ErrorPage from '@/features/common/ui/pages/error-page.vue';
import { RouteName } from '@/router/enums/route';
import { authGuard } from '@/features/auth/guards/auth-guard';

const routes = [
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
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export { routes };

export default router;
