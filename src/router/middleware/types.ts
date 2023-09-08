import Vue from 'vue';
import { NavigationGuardNext, Route } from 'vue-router';

export type MiddlewareContext<R = Route> = {
  to: R;
  from: Route;
  next: NavigationGuardNext<Vue>;
};

export type Middleware = (context: MiddlewareContext) => void;
