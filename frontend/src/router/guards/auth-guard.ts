import Cookies from 'js-cookie';

const isAuthenticated = (next) => {
    // if (Cookies.get('isLoggedIn')) {
    //     next({
    //         path: '/',
    //         replace: true,
    //     });
    // } else {
    //     next({
    //         path: '/login',
    //         replace: true,
    //     });
    // }

    next();
};

export const authGuard = (to, from, next) => {
    // isAuthenticated(next);
    next();
};
