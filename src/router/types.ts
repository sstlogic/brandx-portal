import { Layouts } from '@/composables/useLayout/getLayouts';
import { Route as BaseRoute } from 'vue-router';
import { RouteConfig as BaseRouteConfig } from 'vue-router';
import { Middleware } from './middleware/types';
// import { Middleware } from './middleware/types';

export type RouteConfig = BaseRouteConfig & {
  name?: string;
  meta?: {
    middleware?: Middleware[];
    roles?: string[];
    showNav?: boolean;
    layout?: keyof Layouts;
  };
};

export type RouteNames = {
  [key: string]: string | RouteNames;
};

export type ModuleRouter = {
  routeNames: RouteNames;
  routes: Array<RouteConfig>;
};

export interface Route extends BaseRoute {
  meta?: {
    // middleware?: Middleware[];
    roles?: string[];
    showNav?: boolean;
    layout?: string;
  };
}

export interface RouteWithMiddleware extends Route {
  meta: {
    middleware: Middleware[];
    roles?: string[];
    showNav?: boolean;
  };
}
