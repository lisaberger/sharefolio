import Cookies from 'node_modules/@types/js-cookie';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { RouteName } from '@ui/router/enums/route';

export const authGuard = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): void => {
    const isLoggedIn = !!Cookies.get('isLoggedIn');

    if (to.meta.requiresAuth && !isLoggedIn) {
        next({ name: RouteName.Login });
        return;
    }

    if (
        (to.name === RouteName.Login || to.name === RouteName.Register) &&
        isLoggedIn
    ) {
        next({ name: RouteName.Home });
        return;
    }

    next();
};
