import { Route, RouteConfig } from './types';
import { routeNames } from './routeNames';
import { auth } from './middleware/auth';
import { RouteConfigSingleView } from 'vue-router/types/router';
import { Layouts } from '@/composables/useLayout/getLayouts';
import { member } from './middleware/member';
import Vue from 'vue';
import { NavigationGuardNext } from 'vue-router';

const generateRoute = (
  path: string,
  name: string,
  component: RouteConfigSingleView['component'],
  props = {},
  layout: keyof Layouts = 'MemberLayout',
  middleware = [auth]
): RouteConfig => {
  return {
    path,
    name,
    component,
    meta: {
      layout,
      middleware,
    },
    props,
  };
};

export const routes: Array<RouteConfig> = [
  /**
   * Guest Routes
   */
  {
    path: '/',
    name: routeNames.home,
    component: () => import('@/views/HomePage/HomePage.vue'),
    meta: {
      layout: 'MemberLayout',
    },
  },
  {
    path: '/login',
    name: routeNames.auth.login,
    component: () => import('@/views/LoginPage/LoginPage.vue'),
    meta: {
      layout: 'SubscriptionLayout',
    },
  },
  {
    path: '/register',
    name: routeNames.auth.register,
    component: () => import('@/views/RegisterPage/RegisterPage.vue'),
    meta: {
      layout: 'SubscriptionLayout',
    },
  },
  {
    path: '/subscriber',
    name: routeNames.subscriber,
    component: () => import('@/views/SubscriberPage/SubscriberPage.vue'),
    meta: {
      layout: 'SubscriptionLayout',
      middleware: [auth],
    },
  },
  {
    path: '/subscribe',
    name: routeNames.auth.register,
    component: () => import('@/views/RegisterPage/RegisterPage.vue'),
    meta: {
      layout: 'MemberLayout',
    },
  },
  {
    path: '/contact',
    name: routeNames.contact,
    component: () => import('@/views/ContactPage/ContactPage.vue'),
    meta: {
      layout: 'MemberLayout',
    },
  },
  {
    path: '/help',
    name: routeNames.help,
    component: () => import('@/views/HelpPage/HelpPage.vue'),
    meta: {
      layout: 'MemberLayout',
    },
  },
  {
    path: '/forgot-password',
    name: routeNames.auth.forgot,
    component: () => import('@/views/Password/ForgotPasswordPage.vue'),
    meta: {
      layout: 'MemberLayout',
    },
  },
  {
    path: '/reset-password',
    component: () => import('@/views/Password/ResetPasswordPage.vue'),
    props: (route) => ({ email: route.query.email, token: route.query.token }),
    meta: {
      layout: 'MemberLayout',
    },
    beforeEnter: (to, from, next) => {
      if (to.query.email && to.query.token) {
        next();
      } else {
        next({ name: routeNames.auth.login });
      }
    },
  },

  /**
   * Auth Routes
   */
  {
    path: '/dashboard',
    name: routeNames.dashboard,
    component: () => import('@/views/DashboardPage/DashboardPage.vue'),
    meta: {
      layout: 'MemberLayout',
      middleware: [auth, member],
    },
  },
  {
    path: '/view-spaces',
    name: routeNames.spaces.all,
    component: () => import('@/views/ViewSpacesPage/ViewSpacesPage.vue'),
    meta: {
      layout: 'MemberLayout',
    },
  },

  generateRoute('/bookings', routeNames.my.bookings, () => import('@/views/MyBookingsPage/MyBookingsPage.vue')),

  /**
   * Member Only Routes
   */
  {
    path: '/book-space',
    name: routeNames.spaces.book,
    component: () => import('@/views/BookSpace/BookSpacePage.vue'),
    meta: {
      layout: 'MemberLayout',
      middleware: [auth, member],
    },
  },

  {
    path: '/profile',
    component: () => import('@/views/ProfilePage/ProfilePage.vue'),
    children: [
      generateRoute('details', routeNames.profile.details, () => import('@/views/ProfilePage/ProfileDetailsPage.vue')),
      generateRoute('billing', routeNames.profile.billing, () => import('@/views/ProfilePage/ProfileBillingPage.vue')),
      generateRoute(
        'password',
        routeNames.profile.password,
        () => import('@/views/ProfilePage/ProfilePasswordPage.vue')
      ),
      generateRoute('subscribe', routeNames.profile.subscribe, () => import('@/views/ProfilePage/SubscribePage.vue')),
    ],
    meta: {
      layout: 'MemberLayout',
    },
  },

  generateRoute(
    '/create-booking/confirm',
    routeNames.bookings.confirm,
    () => import('@/views/BookSpace/ConfirmBooking/ConfirmBookingPage.vue')
  ),
  generateRoute('/checkout', routeNames.checkout, () => import('@/views/BookSpace/Checkout/CheckoutPage.vue')),

  {
    path: '/calendar',
    name: routeNames.bookingsCalendar,
    component: () => import('@/views/BookSpace/ScheduleCalendar/ScheduleCalendarPage.vue'),
    meta: {
      layout: 'MemberLayout',
      middleware: [auth],
    },
    props: (route: Route) => ({ scheduleId: route.query.id }),
    beforeEnter: (to: Route, fron: Route, next: NavigationGuardNext<Vue>): void => {
      if (!to.query.id) {
        return next({ name: routeNames.dashboard });
      }

      next();
    },
  },
];
