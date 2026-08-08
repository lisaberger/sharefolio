import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomePage from '@ui/features/common/ui/pages/home-page.vue';
import AboutPage from '@ui/features/common/ui/pages/about-page.vue';
import ImprintPage from '@ui/features/common/ui/pages/imprint-page.vue';
import NewProjectPage from '@ui/features/project/project-new/new-project-page.vue';
import ProjectPage from '@ui/features/project/project-detail/ui/pages/project-page.vue';
import LoginPage from '@ui/features/auth/ui/pages/login-page.vue';
import RegisterPage from '@ui/features/auth/ui/pages/register-page.vue';
import ProfilePage from '@ui/features/profile/ui/pages/profile-page.vue';
import ErrorPage from '@ui/features/common/ui/pages/error-page.vue';
import { RouteName } from '@ui/router/enums/route';
import { authGuard } from '@ui/features/auth/guards/auth-guard';

const routes: RouteRecordRaw[] = [
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
        meta: { requiresAuth: true },
    },
    {
        path: '/about',
        name: RouteName.About,
        component: AboutPage,
    },
    {
        path: '/imprint',
        name: RouteName.Imprint,
        component: ImprintPage,
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
