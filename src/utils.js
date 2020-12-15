import { AutoRouteConfigProperty, RouteConfig } from './RouteConfig';

export function ensureConfigProperty(target) {
    if (!target.hasOwnProperty(AutoRouteConfigProperty)) {
        Object.defineProperty(target, AutoRouteConfigProperty, {
            value: new RouteConfig(),
            writable: true,
        });
    }
}
