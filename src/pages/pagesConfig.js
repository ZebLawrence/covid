const home = {
    name: 'Total',
    bodyClass: 'home',
    componentPath: 'home/home',
    path: '/'
};

const daily = {
    name: 'Daily',
    bodyClass: 'home',
    componentPath: 'home/Daily',
    path: '/daily'
};

const routeError = {
    name: 'Route Error',
    componentPath: 'routeError/routeError',
    bodyClass: 'route-error'
};

const pages = {
    home,
    daily,
    routeError
};

const navItems = [
    home,
    daily
];

export {
    pages,
    navItems
}