import { Middleware, MiddlewareContext } from './middleware/types';
import { RouteWithMiddleware } from './types';

function middlewareStack(context: MiddlewareContext, middleware: Middleware[], index: number) {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return context.next;
  }

  return () => {
    const nextPipeline = middlewareStack(context, middleware, index + 1);

    nextMiddleware({ ...context, next: nextPipeline });
  };
}

export function handleMiddleware(context: MiddlewareContext<RouteWithMiddleware>): void {
  const middleware = context.to.meta.middleware;

  return middleware[0]({
    ...context,
    next: middlewareStack(context, middleware, 1),
  });
}
