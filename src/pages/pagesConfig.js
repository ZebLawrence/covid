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
    routeError
};

const navItems = [
    home,
    daily,
    about
];

export {
    pages,
    navItems
}