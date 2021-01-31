const home = {
    name: 'Total',
    bodyClass: 'home',
    componentPath: 'home/home',
    path: '/'
};

const test = {
    name: 'Test',
    bodyClass: 'home',
    componentPath: 'home/TestMobile',
    path: '/test'
};

const daily = {
    name: 'Daily',
    bodyClass: 'home',
    componentPath: 'home/Daily',
    path: '/daily'
};

const about = {
    name: 'About',
    bodyClass: 'home',
    componentPath: 'home/About',
    path: '/about'
};

const routeError = {
    name: 'Route Error',
    componentPath: 'routeError/routeError',
    bodyClass: 'route-error'
};

const pages = {
    home,
    daily,
    about,
    test,
    routeError
};

const navItems = [
    home,
    daily,
    about,
    test
];

export {
    pages,
    navItems
}