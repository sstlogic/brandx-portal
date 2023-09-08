import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import { routes } from './routes';
import { handleMiddleware } from './routerMiddleware';
import { RouteWithMiddleware } from './types';
import { useStatus } from '@/composables/useStatus';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to: Route | RouteWithMiddleware, from, next) => {
  const { clearMessage, isError } = useStatus();

  if (isError.value) {
    clearMessage();
  }
  if (isRouteWithMiddleware(to)) {
    return handleMiddleware({ to, from, next });
  }

  return next();
});

function isRouteWithMiddleware(route: Route): route is RouteWithMiddleware {
  return !!route.meta?.middleware;
}

export { router };
