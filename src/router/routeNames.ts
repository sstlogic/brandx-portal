export type RouteNames = {
  [key: string]: string | RouteNames;
};

export const makeRouteNames = <T extends RouteNames>(names: T): T => {
  return names;
};

export const routeNames = makeRouteNames({
  home: 'home',
  dashboard: 'dashboard',
  auth: {
    login: 'login',
    register: 'register',
    forgot: 'forgot',
  },
  my: {
    bookings: 'my.bookings',
  },
  profile: {
    details: 'profile.details',
    billing: 'profile.billing',
    password: 'profile.password',
    subscribe: 'subscribe',
  },
  subscriber: 'subscriber',
  help: 'help',
  contact: 'contact',
  spaces: {
    all: 'spaces.all',
    book: 'spaces.book',
  },
  bookingsCalendar: 'bookings.calendar',
  bookings: {
    create: 'bookings.create',
    details: 'bookings.details',
    confirm: 'bookings.confirm',
  },
  checkout: 'checkout',
});
